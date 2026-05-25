#!/usr/bin/env python3
"""
Hook: PostToolUse (Write | Edit)

Escaneia o arquivo recém-criado/editado em busca de design tokens (CSS custom
properties) e anexa entradas novas em docs/logs/design-tokens.md.

Extensões suportadas: .css, .scss, .sass, .less, .js, .ts, .jsx, .tsx
"""

import json
import os
import re
import sys
from datetime import datetime

SUPPORTED_EXT = {".css", ".scss", ".sass", ".less", ".js", ".ts", ".jsx", ".tsx"}

TOKEN_PATTERNS: dict[str, list[str]] = {
    "Cores": [
        r"--(?:color|primary|secondary|accent|background|foreground|surface|text|border|brand|muted)[^:]*:\s*[^;}\n]+",
        r"--[a-z][a-z0-9-]*:\s*(?:#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))",
    ],
    "Tipografia": [
        r"--font[^:]*:\s*[^;}\n]+",
        r"--(?:heading|body|label|caption)[^:]*:\s*[^;}\n]+",
    ],
    "Espaçamento": [
        r"--(?:spacing|gap|padding|margin|size)[^:]*:\s*[^;}\n]+",
    ],
    "Border Radius": [
        r"--(?:radius|rounded)[^:]*:\s*[^;}\n]+",
    ],
    "Sombras": [
        r"--shadow[^:]*:\s*[^;}\n]+",
    ],
    "Z-Index": [
        r"--z-?(?:index)?[^:]*:\s*[^;}\n]+",
    ],
}


def extract_tokens(filepath: str) -> dict[str, set[str]]:
    ext = os.path.splitext(filepath)[1].lower()
    if ext not in SUPPORTED_EXT:
        return {}
    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
    except Exception:
        return {}

    result: dict[str, set[str]] = {}
    for section, patterns in TOKEN_PATTERNS.items():
        matches: set[str] = set()
        for pattern in patterns:
            for m in re.finditer(pattern, content):
                token = m.group(0).strip().rstrip(";").strip()
                if token:
                    matches.add(token)
        if matches:
            result[section] = matches
    return result


def existing_lines(path: str) -> set[str]:
    if not os.path.exists(path):
        return set()
    with open(path, "r", encoding="utf-8") as f:
        return {line.strip() for line in f if line.strip()}


def main() -> None:
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)

    file_path: str = data.get("tool_input", {}).get("file_path", "")
    if not file_path or not os.path.exists(file_path):
        sys.exit(0)

    found = extract_tokens(file_path)
    if not found:
        sys.exit(0)

    project_root = os.getcwd()
    design_tokens_path = os.path.join(project_root, "docs/logs/design-tokens.md")
    known = existing_lines(design_tokens_path)
    date_str = datetime.now().strftime("%Y-%m-%d")

    new_lines: list[str] = []
    for section, values in found.items():
        novos = sorted(v for v in values if v not in known)
        if novos:
            new_lines.append(f"\n### {section} — detectados em {date_str}\n\n")
            for v in novos:
                new_lines.append(f"- `{v}`\n")

    if new_lines and os.path.exists(design_tokens_path):
        with open(design_tokens_path, "a", encoding="utf-8") as f:
            f.writelines(new_lines)


if __name__ == "__main__":
    main()
