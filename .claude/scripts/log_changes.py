#!/usr/bin/env python3
"""
Hook: PostToolUse (Write | Edit)

Registra a ação (Criado / Editado) com timestamp em docs/logs/changelog.md.
"""

import json
import os
import sys
from datetime import datetime

# Pastas ignoradas — evita loops e ruído nos logs
SKIP_PREFIXES = ("docs/logs/", ".claude/")


def main() -> None:
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)

    tool_name: str = data.get("tool_name", "")
    file_path: str = data.get("tool_input", {}).get("file_path", "")

    if not file_path:
        sys.exit(0)

    project_root = os.getcwd()

    try:
        rel = os.path.relpath(file_path, project_root)
    except ValueError:
        rel = file_path

    if any(rel.startswith(prefix) for prefix in SKIP_PREFIXES):
        sys.exit(0)

    action = "Criado" if tool_name == "Write" else "Editado"
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")

    changelog = os.path.join(project_root, "docs/logs/changelog.md")
    if os.path.exists(changelog):
        with open(changelog, "a", encoding="utf-8") as f:
            f.write(f"- `{timestamp}` — **{action}**: `{rel}`\n")


if __name__ == "__main__":
    main()
