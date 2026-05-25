---
name: ux-personas
description: Gera o documento Personas.md para projetos de UX/design de qualquer tipo — sites institucionais, aplicativos, plataformas, SaaS, e-commerce ou serviços. Cria personas completas com perfil demográfico, comportamento digital, dores, jornada esperada no produto e cenário crítico de falha. Use esta skill sempre que o projeto estiver na fase de UX e precisar definir os públicos-alvo antes do Sitemap. Deve ser usada após Foundation e Benchmarking, e antes de Sitemap e Moodboard. Também deve ser usada quando alguém pedir "personas", "perfis de usuário", "públicos do projeto" ou "quem são os usuários".
---

# UX Personas

Skill para geração do `Personas.md` em projetos de UX/design. Cria personas fundamentadas no contexto do projeto, com perfil completo, dados comportamentais e jornada específica para o produto sendo desenhado.

---

## Quando usar esta skill

- Fase UX do projeto, após Foundation e Benchmarking, antes de Sitemap
- Sempre que o projeto precisar definir ou revisar os públicos-alvo
- Quando o designer ou estrategista precisar de base para tomar decisões de arquitetura de informação

---

## Configuração por Projeto

Antes de iniciar, confirmar com o responsável:

| Parâmetro | Padrão | Configurável |
|---|---|---|
| Número de personas | 1 por público identificado no Foundation | Sim |
| Profundidade | Perfil + comportamento + jornada + cenário crítico | Sim |
| Imagem de persona | Prompt para geração externa | Sim (aceita imagens fornecidas) |
| Públicos | Extraídos do Foundation.md | Sim (responsável pode adicionar/remover) |

---

## Fluxo de Trabalho

### Passo 1 — Leitura dos documentos anteriores

Ler obrigatoriamente antes de escrever qualquer persona:

- `docs/Foundation.md` — extrai: públicos identificados, dores relatadas, restrições, citações do cliente
- `docs/ux/Benchmarking.md` — extrai: perfil do cliente-alvo mapeado, gaps identificados, dores confirmadas pela análise competitiva

Se os documentos não existirem, solicitar ao responsável as informações mínimas antes de avançar.

---

### Passo 2 — Definição dos públicos

Listar os públicos identificados no Foundation e apresentar ao responsável para confirmação:

- Verificar se algum público deve ser desmembrado (ex: governo municipal vs. estadual)
- Verificar se existe público relevante não mapeado (ex: imprensa, pesquisadores, parceiros)
- Confirmar quantas personas serão criadas e qual a prioridade entre elas

Aguardar confirmação antes de escrever.

---

### Passo 3 — Construção de cada persona

Para cada público confirmado, construir:

#### 3a. Perfil Demográfico
- Nome fictício representativo
- Idade e cargo
- Empresa/contexto profissional
- Localização
- Formação

#### 3b. Perfil Narrativo
- Quem é essa pessoa no contexto do projeto
- Como chegou até o produto (canal de descoberta)
- O que ela já sabe ou já tentou antes

#### 3c. Comportamento Digital
- Dispositivo principal
- Canais de busca
- Consumo de conteúdo (podcasts, newsletters, eventos, portais)
- Comportamento no site/produto (como escaneia, como decide, quanto tempo tem)
- Padrão de decisão (individual, coletiva, rápida, lenta)
- Redes sociais utilizadas
- Nível de confiança digital

#### 3d. Dores Atuais
- Dores específicas relacionadas ao produto sendo desenhado
- O que ela não consegue fazer hoje que o produto deveria resolver
- Frustração com alternativas que tentou antes

#### 3e. Objetivo no Produto
- O que ela quer conseguir em uma visita ao site/produto
- Critério de sucesso da jornada

#### 3f. Jornada Esperada
- Sequência de passos desde o ponto de entrada até a conversão
- Formato: `Canal de chegada → Passo 1 → Passo 2 → … → Ação final`

#### 3g. Cenário Crítico
- O que acontece quando a jornada falha
- Onde exatamente ela sai ou abandona
- O que o produto precisa oferecer para evitar essa perda

#### 3h. Citação Representativa
- Uma frase que capture a perspectiva dessa persona
- Preferencialmente extraída de transcrições, Foundation.md ou Benchmarking.md

---

### Passo 4 — Contexto Visual

Para cada persona, gerar um prompt de imagem para uso em geradores externos (Midjourney, Flux, Ideogram, Leonardo, Gemini):

**Regras do prompt:**
- Cada persona deve ter ambiente, estilo e paleta de cores distintos
- Nunca repetir o mesmo contexto visual entre personas
- Incluir: gênero/idade aproximada, contexto ambiental, estilo de roupa, expressão, lighting, estilo fotográfico
- Formato sugerido para Midjourney: adicionar `--ar 3:4` para card de persona

**Se o responsável fornecer imagens prontas:**
- Aceitar as imagens e referenciar no documento como `persona-[nome].png`
- Orientar que as imagens devem estar na mesma pasta que o `Personas.md` para renderizar corretamente

---

### Passo 5 — Geração do Documento

Gerar o `Personas.md` com a estrutura abaixo.

**Nomenclatura do arquivo:** `docs/ux/Personas.md`
**Imagens:** `docs/ux/persona-[nome].png` (mesma pasta)

---

## Estrutura do Personas.md

```markdown
# Personas — [Nome do Projeto]
**Projeto:** [Nome do projeto]
**Fase:** UX / Personas
**Data:** [Data de geração]
**Responsável:** _(preencher)_
**Status:** Gerado por AI — validação humana necessária antes de avançar para Sitemap

---

## Sobre este documento
[Breve descrição dos públicos cobertos e documentos base utilizados]

---

## Persona [N] — [Nome]
### [Cargo / Papel]

![Nome](persona-nome.png)

| | |
|---|---|
| **Idade** | |
| **Cargo** | |
| **Empresa** | |
| **Localização** | |
| **Formação** | |

---

### Perfil
[Narrativa de quem é essa pessoa, contexto, como chegou ao produto]

---

### Comportamento Digital

| Dimensão | Detalhe |
|---|---|
| **Dispositivo principal** | |
| **Canais de busca** | |
| **Consumo de conteúdo** | |
| **Comportamento no site** | |
| **Decisão** | |
| **Redes sociais** | |
| **Confiança digital** | |

---

### Dores Atuais
[Lista de dores específicas ao produto]

---

### Objetivo no Produto
[O que essa persona quer conseguir]

---

### Jornada Esperada
[Sequência de passos em formato de fluxo]

---

### Cenário Crítico
[O que acontece quando a jornada falha + o que o produto precisa oferecer]

---

### Citação representativa
[Frase que captura a perspectiva da persona]

---

## Validação Humana
- [ ] Os perfis representam com precisão os públicos reais do projeto?
- [ ] Existe algum público relevante não mapeado?
- [ ] As dores identificadas estão alinhadas com o que a equipe percebe no dia a dia?
- [ ] Os cenários críticos descrevem falhas reais que acontecem hoje?
- [ ] As jornadas esperadas refletem o fluxo que o produto deve suportar?

**Validado por:** _____________________ **Data:** ___________
```

---

## Regras Obrigatórias

- **Nunca criar personas sem ler o `Foundation.md` primeiro.** As dores e públicos devem estar ancorados no projeto real, não em assunções genéricas.
- **Confirmar a lista de públicos com o responsável** antes de escrever — não assumir quais personas criar.
- **Cada persona deve ter contexto visual distinto** — ambiente, paleta e estilo fotográfico diferentes entre si.
- **Cenário crítico é obrigatório** em todas as personas — é o elemento mais útil para o designer e para o PRD.
- **Citações devem ser reais quando possível** — extraídas do Foundation.md, transcrições ou Benchmarking.
- **Não avançar para Sitemap sem validação humana registrada no documento.**

---

## Registro no decisions.md

Ao finalizar o documento, registrar em `docs/logs/decisions.md`:

```
## Personas — [Data]
**Decisão:** [N] personas criadas: [lista de nomes e públicos]
**Quem decidiu:** [Responsável]
**Públicos cobertos:** [lista]
**Principais dores identificadas:** [2-3 bullets]
**Status:** Validado por [Nome] em [Data]
```

---

## Prompts de Imagem — Guia Rápido

Ao gerar prompts, variar os seguintes elementos entre personas:

| Elemento | Opções |
|---|---|
| **Ambiente** | Coworking / Sala de reunião corporativa / Escritório institucional / Espaço urbano / Rooftop / Home office |
| **Lighting** | Luz natural quente / Luz artificial fria / Golden hour / Overcast daylight |
| **Estilo fotográfico** | Editorial / Corporate portrait / Lifestyle / Candid / Cinematic |
| **Paleta** | Tons quentes (bege, terracota) / Tons frios (azul, cinza) / Tons neutros / Dourado/cinematográfico |
| **Postura** | Trabalhando no laptop / Em pé olhando para câmera / Segurando objeto / Sentado em reunião |

Formato base do prompt:
```
[Nationality] [gender], [age range], [role context], [environment], [clothing style], [expression], [background details] — [photography style], [lighting], [color palette]
```
