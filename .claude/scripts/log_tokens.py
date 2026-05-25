#!/usr/bin/env python3
"""
Hook: Stop

Registra o uso de tokens de API e custo estimado da sessão em docs/logs/tokens.md.

O Claude Code passa o evento Stop via stdin como JSON com a estrutura:
{
  "session_id": "...",
  "stop_hook_active": true,
  "usage": {
    "input_tokens": 12400,
    "output_tokens": 3200,
    "cache_read_input_tokens": 0,
    "cache_creation_input_tokens": 0
  }
}

Custo estimado baseado em claude-sonnet-4-6 (preços Anthropic 2025):
  Input:  $3.00 / 1M tokens
  Output: $15.00 / 1M tokens
"""

import json
import os
import sys
import getpass
from datetime import datetime

INPUT_COST_PER_1M  = 3.00
OUTPUT_COST_PER_1M = 15.00


def estimate_cost(input_tokens: int, output_tokens: int) -> float:
    return (input_tokens / 1_000_000 * INPUT_COST_PER_1M) + \
           (output_tokens / 1_000_000 * OUTPUT_COST_PER_1M)


def main() -> None:
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)

    # Usamos o evento SessionEnd (ou similar). 
    # Extraímos usage se disponível.
    usage = data.get("usage", {})
    input_tokens  = usage.get("input_tokens", 0)
    output_tokens = usage.get("output_tokens", 0)

    # Impede de logar linhas com 0 repetidamente se o evento disparar em falso
    if input_tokens == 0 and output_tokens == 0:
        sys.exit(0)

    cost = estimate_cost(input_tokens, output_tokens)
    now  = datetime.now()
    date = now.strftime("%Y-%m-%d")
    time = now.strftime("%H:%M")

    project_root = os.getcwd()
    tokens_path  = os.path.join(project_root, "docs/logs/tokens.md")

    if not os.path.exists(tokens_path):
        sys.exit(0)

    # Permite customizar a fase/sessão via variável de ambiente ou arquivo
    session_name = os.environ.get("CLAUDE_PHASE", "").strip()
    if not session_name:
        phase_file = os.path.join(project_root, ".claude_phase")
        if os.path.exists(phase_file):
            with open(phase_file, "r", encoding="utf-8") as pf:
                session_name = pf.read().strip()
    
    if not session_name:
        session_name = "—"

    user_name = getpass.getuser()
    line = f"| {date} | {time} | {user_name} | {session_name} | {input_tokens:,} | {output_tokens:,} | ${cost:.4f} |\n"

    with open(tokens_path, "a", encoding="utf-8") as f:
        f.write(line)


if __name__ == "__main__":
    main()
