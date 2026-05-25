# Spec de Conceitos — Site Inaitec

> Documento vivo. Atualizar sempre que um conceito for validado ou evoluído.

---

## Como navegar entre conceitos

Os botões **1**, **2** e **3** ficam no rodapé (footer), abaixo das redes sociais.  
A seleção é salva em `localStorage` e persiste entre recarregamentos.

---

## Conceito 1 — Verde & Laranja ✅ Ativo

**Intenção:** Institucional sólido, confiança e calor. Remete ao parque tecnológico físico com identidade verde da marca.

| Token | Valor |
|---|---|
| Primário | `#004E69` — Verde Inaitec |
| Acento | `#FA8400` — Laranja PANTONE 1505 C |
| Fundo hero | `#F5F4EF` — Off-white quente |
| Fundo footer | `#004E69` |

**Estrutura da homepage:**
- Hero: 50/50 — vídeo à esquerda + texto + métricas animadas à direita
- Carrossel de mantenedores
- Seção Pedra Branca com cards de escala e timeline interativa
- Footer verde com faixa laranja + marca d'água

**Mood:** Ecossistema vivo, impacto regional, modernidade com raízes locais.

**Status:** ✅ Implementado e em revisão

---

## Conceito 2 — A definir 🔲 Em desenvolvimento

**Intenção:** A definir com o cliente.

**Direcionamentos possíveis:**
- Identidade mais tecnológica / dark mode
- Foco em startups com linguagem mais dinâmica
- Layout full-screen com grandes imagens aéreas do Pedra Branca

**Status:** 🔲 Placeholder — aguarda briefing do cliente

---

## Conceito 3 — A definir 🔲 Em desenvolvimento

**Intenção:** A definir com o cliente.

**Direcionamentos possíveis:**
- Identidade editorial / magazine
- Foco em conteúdo e cases de sucesso
- Tipografia expressiva, menos UI, mais storytelling

**Status:** 🔲 Placeholder — aguarda briefing do cliente

---

## Arquitetura técnica

- `src/context/ConceptContext.tsx` — Context + localStorage
- `src/components/ConceptSwitcher.tsx` — Botões 1/2/3 no footer
- `src/components/concepts/Concept1.tsx` — Design atual
- `src/components/concepts/Concept2.tsx` — Placeholder
- `src/components/concepts/Concept3.tsx` — Placeholder
- `src/app/page.tsx` — Switcher que renderiza o conceito ativo
