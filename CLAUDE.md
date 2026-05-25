# Inaitec — Redesign de Site

## Visão Geral do Projeto

- **Nome:** Inaitec — Redesign de Site
- **Tipo:** Site institucional
- **Idioma padrão:** Português
- **Pasta de inputs:** [docs/inputs/](docs/inputs/)

O Inaitec é um hub brasileiro de inovação e tecnologia focado em aceleração de startups e desenvolvimento de ecossistema. Este projeto cobre o **redesign completo do site institucional**, com base em um Statement of Work (SoW) formal para produção.

## Objetivo

Redesenhar e reconstruir o site do Inaitec para comunicar melhor a proposta de valor do hub, os programas de aceleração (ex.: Acelera Pedra Branca) e os serviços oferecidos a startups, parceiros e investidores.

## Documentos de Referência

Todos os inputs estão em [docs/inputs/](docs/inputs/):

- `Apresentação INaitec revDIEGO 2026.pdf` — apresentação de marca e pitch
- `Atomsix_Inaitec_Imersão.pdf` — relatório de imersão e descoberta da agência
- `Inaitec - Revisão site.docx.pdf` — revisão do site atual e notas de conteúdo
- `Onboarding Participantes Acelera Pedra Branca.pdf` — detalhes do programa de aceleração
- `Roadmap Acelera Pedra Branca.pdf` — roadmap do programa de aceleração
- `[Inaitec] Website Redesign - SoW (Produção).pdf` — escopo, entregáveis e cronograma

## Logs do Projeto

- [docs/logs/changelog.md](docs/logs/changelog.md) — arquivos criados/editados (automático via hook)
- [docs/logs/decisions.md](docs/logs/decisions.md) — decisões validadas por fase
- [docs/logs/tokens.md](docs/logs/tokens.md) — uso de tokens de API e custo estimado por sessão (automático via hook)
- [docs/logs/design-tokens.md](docs/logs/design-tokens.md) — design tokens CSS detectados nos arquivos (automático via hook)
- [docs/logs/prompts.md](docs/logs/prompts.md) — prompts usados em gerações AI e número de iterações

## Framework de Skills

Este projeto segue um sistema de skills por fase — da Discovery ao Deploy. O arquivo de referência base do framework é:

- [.claude/ProjectGuidelines.md](.claude/ProjectGuidelines.md) — guidelines completas de cada fase, personas, critérios de bloqueio, inputs/outputs e estrutura de arquivos

**Consulte o ProjectGuidelines.md antes de criar qualquer skill ou iniciar uma nova fase.**

## Convenções de Trabalho

- Projeto VibeCoding — desenvolvimento assistido por IA, iteração rápida, revisão humana.
- Consultar os PDFs em `docs/inputs/` antes de fazer suposições sobre marca, conteúdo ou escopo.
- **Ao finalizar qualquer tarefa relevante, registrar a decisão tomada em [docs/logs/decisions.md](docs/logs/decisions.md).**
- [docs/logs/design-tokens.md](docs/logs/design-tokens.md) é atualizado automaticamente quando arquivos CSS/JS com custom properties são editados.
