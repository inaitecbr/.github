import { getTranslations } from 'next-intl/server'
import AnimatedCounter from "@/components/AnimatedCounter";
import BrandPattern from "@/components/BrandPattern";
import CasesGrid from "@/components/CasesGrid";
import CountdownTimer from "@/components/CountdownTimer";
import FaqAccordion from "@/components/FaqAccordion";
import ProgramaStickyBar from "@/components/ProgramaStickyBar";
import { Container, Section } from "@/components/Section";
import TimelineEtapas from "@/components/TimelineEtapas";
import type {
  EmpresaVinculada,
  ProgramaCase,
  ProgramaFull,
  PublicoKey,
  StatusKey,
} from "@/sanity/queries/programa";
import { Check, Clock, DollarSign, Info, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ─── Helpers de mapeamento para CasesGrid ────────────────────────

function empresaToCase(e: EmpresaVinculada) {
  return {
    nome:   e.nome    ?? '',
    setor:  e.setor   ?? '',
    logo:   e.logoUrl,
    foto:   e.fotoUrl,
    quote:  e.desc    ?? '',
    pessoa: e.fundador?.nome  ?? '',
    cargo:  e.fundador?.titulo,
  }
}

function programaCaseToItem(c: ProgramaCase) {
  return {
    nome:     c.nome    ?? '',
    setor:    c.setor   ?? '',
    logo:     c.logoUrl,
    foto:     c.fotoUrl,
    quote:    c.quote   ?? '',
    pessoa:   c.pessoa  ?? '',
    cargo:    c.cargo,
    metricas: c.metricas?.map((m) => ({ label: m.label ?? '', value: m.value ?? '' })),
  }
}

// ─── Mapeamentos de chave → exibição ─────────────────────────────

const STATUS_COLOR: Record<StatusKey, string> = {
  aberta: "var(--color-brand-teal)",
  "em-breve": "var(--color-brand-orange)",
  fechada: "#94A3B8",
  "fluxo-continuo": "var(--color-brand-orange)",
};

// ─── Ícone para Quick Facts ───────────────────────────────────────

function QuickFactIcon({ label }: { label: string }) {
  const l = label.toLowerCase();
  const cls = "w-5 h-5";
  if (l.includes("dura") || l.includes("tempo") || l.includes("prazo"))
    return <Clock strokeWidth={1.8} className={cls} />;
  if (l.includes("vaga") || l.includes("startup") || l.includes("empresa"))
    return <Users strokeWidth={1.8} className={cls} />;
  if (l.includes("modal") || l.includes("local") || l.includes("onde"))
    return <MapPin strokeWidth={1.8} className={cls} />;
  if (l.includes("aporte") || l.includes("capital") || l.includes("valor") || l.includes("r$"))
    return <DollarSign strokeWidth={1.8} className={cls} />;
  return <Info strokeWidth={1.8} className={cls} />;
}

// ─── Component ────────────────────────────────────────────────────

type Props = { programa: ProgramaFull };

export default async function ProgramaClientComponent({ programa }: Props) {
  const t = await getTranslations('ProgramaDetalhe')

  const accent = "var(--color-brand-orange)";

  const statusColor = programa.statusKey ? STATUS_COLOR[programa.statusKey] : accent;
  const isAberta = programa.statusKey === "aberta";
  const hasDeadline = isAberta && !!programa.deadline;

  // CTA label por status — via i18n
  const ctaPrimario =
    programa.statusKey === "aberta"
      ? t('ctaAberta')
      : programa.statusKey === "em-breve"
        ? t('ctaEmBreve')
        : programa.statusKey === "fechada"
          ? t('ctaFechada')
          : t('ctaFluxo');

  // Conteúdo — somente do Sanity, sem fallbacks hardcoded
  const oQueE = programa.oQueE ?? []
  const paraQuem = programa.paraQuem ?? []
  const beneficios = (programa.beneficios ?? []).map((b) => ({
    titulo: b.titulo ?? "",
    desc: b.desc ?? "",
  }))
  const stats = (programa.stats ?? []).map((s) => ({
    value: s.value ?? "",
    label: s.label ?? "",
  }))
  const etapas = (programa.etapas ?? []).map((e) => ({
    titulo: e.titulo ?? "",
    desc: e.desc ?? "",
    duracao: e.duracao,
  }))

  // Cases: prioridade → empresasVinculadas (Sanity) > cases embutidos > nenhum
  const cases = programa.empresasVinculadas?.length
    ? programa.empresasVinculadas.map(empresaToCase)
    : programa.cases?.length
      ? programa.cases.map(programaCaseToItem)
      : []

  // FAQ: somente dados do Sanity, sem fallback hardcoded
  const faq = (programa.faq ?? [])
    .filter((f): f is { q: string; a: string } & typeof f => !!f.q && !!f.a)
    .map((f) => ({ q: f.q, a: f.a }))

  // Flags de visibilidade de seções
  const showOQueE = oQueE.length > 0 || !!programa.highlight
  const showNumeros = stats.length > 0 || !!(programa.quickFacts?.length)
  const showParaQuem = paraQuem.length > 0
  const showBeneficios = beneficios.length > 0
  const showEtapas = etapas.length > 0

  // Labels de status via i18n
  const statusLabel = programa.statusKey
    ? ({
        aberta: t('statusAberta'),
        'em-breve': t('statusEmBreve'),
        fechada: t('statusFechada'),
        'fluxo-continuo': t('statusFluxo'),
      } as Record<StatusKey, string>)[programa.statusKey]
    : null

  // Publicokey label — reutiliza o namespace Programa já existente
  const publicoKey = programa.publicoKey as PublicoKey | undefined

  return (
    <main className="relative bg-brand-navy overflow-x-clip">
      {/* Sticky bar — só quando inscrições abertas com prazo */}
      {hasDeadline && (
        <ProgramaStickyBar
          nome={programa.name ?? ""}
          deadline={programa.deadline!}
          ctaHref="#inscricao"
        />
      )}

      {/* ── Fundo orgânico ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[40vh] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />
        <div className="absolute top-[180vh] right-[-15%] w-[1100px] h-[1100px] rounded-full bg-brand-teal/[0.06] blur-[160px]" />
        <div className="absolute top-[320vh] left-[15%] w-[900px] h-[900px] rounded-full bg-brand-orange/[0.08] blur-[160px]" />
        <div
          className="absolute top-[700px] left-0 right-0 bottom-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        />
      </div>

      {/* ══ 1. HERO ══════════════════════════════════════════════════ */}
      <section className="relative z-10 pt-[108px] pb-16 overflow-hidden">
        <BrandPattern
          variant="dots"
          color="var(--color-brand-orange)"
          className="absolute top-32 right-8 w-72 h-72 opacity-25 pointer-events-none"
        />

        <Container className="relative grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-[12px] text-white/45"
            >
              <Link href="/programas" className="hover:text-white transition-colors">
                {t('breadcrumb')}
              </Link>
              <span>/</span>
              <span className="text-white/65">
                {publicoKey && t(`publico.${publicoKey}` as Parameters<typeof t>[0])}
              </span>
            </nav>

            {publicoKey && (
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8" style={{ backgroundColor: accent }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  {t(`publico.${publicoKey}` as Parameters<typeof t>[0])}
                </span>
              </div>
            )}

            <h1 className="font-extrabold text-white text-display-2xl leading-[1.1] tracking-tight">
              {programa.name}
            </h1>

            <p className="mt-6 max-w-xl text-white/75 text-[17px] leading-relaxed">
              {programa.longDesc ?? programa.desc}
            </p>

            <div className="mt-10 w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="#inscricao"
                className="inline-flex items-center justify-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
              >
                {ctaPrimario}
              </Link>
              {showEtapas && (
                <Link
                  href="#como-funciona"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  {t('comoFuncionaBtn')}
                </Link>
              )}
            </div>

            {/* Countdown — só quando inscrições abertas com prazo */}
            {hasDeadline && (
              <div className="mt-10 pt-8 border-t border-white/10 max-w-md">
                <div className="flex items-center gap-2 mb-4">
                  <span className="block w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-teal">
                    {t('inscricoesAbertasPrazo')}
                  </span>
                </div>
                <CountdownTimer
                  target={new Date(programa.deadline!)}
                  theme="dark"
                  variant="segments"
                />
              </div>
            )}
          </div>

          <div className="relative aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[520px] rounded-3xl overflow-hidden">
            {programa.imageUrl ? (
              <Image
                src={programa.imageUrl}
                alt={programa.name ?? ""}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/80 to-brand-navy" />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/60 via-transparent to-transparent" />
          </div>
        </Container>
      </section>

      {/* ══ 2. O QUE É — só renderiza quando há conteúdo ══════════════ */}
      {showOQueE && (
        <section
          id="o-que-e"
          data-theme="light"
          className="relative z-10 scroll-mt-24 bg-[#F5F4EF] text-brand-navy overflow-hidden"
        >
          <BrandPattern
            variant="dots"
            color="var(--color-brand-navy)"
            className="absolute -top-10 right-[5%] w-72 h-72 opacity-[0.06] pointer-events-none"
          />

          <Container className="relative py-16">
            <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-20">
              <div>
                <div className="mb-5 inline-flex items-center gap-2">
                  <span className="block h-px w-8" style={{ backgroundColor: accent }} />
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: accent }}
                  >
                    {t('sobreEyebrow')}
                  </span>
                </div>
                <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
                  {t('oQueETitulo', { nome: programa.name ?? '' })}
                </h2>
              </div>

              <div className="flex flex-col gap-6 text-brand-navy/75 text-[17px] leading-relaxed">
                {oQueE.filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {programa.highlight && (
                  <blockquote
                    className="mt-2 border-l-4 pl-6 py-3 rounded-r-lg text-brand-navy font-semibold text-xl leading-snug"
                    style={{ borderColor: accent, backgroundColor: `${accent}0F` }}
                  >
                    {programa.highlight}
                  </blockquote>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ══ 3. NÚMEROS — só renderiza quando há stats ou quickFacts ═══ */}
      {showNumeros && (
        <Section padding="md" className="overflow-hidden" containerClassName="relative">
          <div className="max-w-2xl mb-14">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8" style={{ backgroundColor: accent }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                {t('numerosEyebrow')}
              </span>
            </div>
            <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              {t('numerosTituloStart')}{" "}
              <span className="italic font-medium" style={{ color: accent }}>
                {t('numerosTituloHighlight')}
              </span>{" "}
              {t('numerosTituloEnd')}
            </h2>
            <p className="mt-5 text-white/65 text-base leading-relaxed">
              {t('numerosDesc')}
            </p>
          </div>

          {/* Quick Facts */}
          {programa.quickFacts && programa.quickFacts.length > 0 && (
            <>
              <div className="mb-6 flex items-center gap-3">
                <span className="block h-px w-8 bg-white/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/55">
                  {t('detalhesLabel')}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                {programa.quickFacts.map((f) => (
                  <article
                    key={f.label}
                    className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <span
                      className="pointer-events-none absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ backgroundColor: accent }}
                    />
                    <div
                      className="relative inline-flex items-center justify-center w-11 h-11 rounded-xl mb-6"
                      style={{ backgroundColor: `${accent}1A`, color: accent }}
                    >
                      <QuickFactIcon label={f.label ?? ""} />
                    </div>
                    <div className="relative flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/45">
                        {f.label}
                      </span>
                      <span className="text-2xl md:text-[1.75rem] font-extrabold text-white tracking-tight leading-tight">
                        {f.value}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {/* Track Record */}
          {stats.length > 0 && (
            <>
              <div className="mb-6 flex items-center gap-3">
                <span className="block h-px w-8 bg-white/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/55">
                  {t('trackRecord')}
                </span>
              </div>
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden">
                <div className="pointer-events-none absolute -top-32 -left-20 w-[400px] h-[400px] rounded-full bg-brand-orange/[0.08] blur-[120px]" />
                <div className="pointer-events-none absolute -bottom-32 -right-20 w-[400px] h-[400px] rounded-full bg-brand-teal/[0.06] blur-[120px]" />
                <div className="relative grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                  {stats.map((m) => (
                    <div key={m.label} className="flex flex-col gap-2 px-4 py-8 sm:px-6 sm:py-10">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight whitespace-nowrap">
                        <AnimatedCounter value={m.value} />
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </Section>
      )}

      {/* ══ 4. PARA QUEM — só renderiza quando há critérios ══════════ */}
      {showParaQuem && (
        <Section id="para-quem" theme="light" padding="md" className="scroll-mt-24">
          <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8" style={{ backgroundColor: accent }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  {t('paraQuemEyebrow')}
                </span>
              </div>
              <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
                {t('paraQuemTituloStart')}{" "}
                <span className="italic font-medium" style={{ color: accent }}>
                  {t('paraQuemTituloHighlight')}
                </span>{" "}
                {t('paraQuemTituloEnd')}
              </h2>
              <p className="mt-6 text-brand-navy/65 text-base leading-relaxed">
                {t('paraQuemDesc')}
              </p>
            </div>

            <ul className="grid sm:grid-cols-2 gap-4">
              {paraQuem.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-2xl bg-white border border-border p-5"
                >
                  <span
                    className="mt-0.5 shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full"
                    style={{ backgroundColor: `${accent}1A` }}
                  >
                    <Check strokeWidth={3} className="w-3.5 h-3.5" style={{ color: accent }} />
                  </span>
                  <p className="text-brand-navy/85 text-[15px] leading-relaxed">{c}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* ══ 5. BENEFÍCIOS — só renderiza quando há benefícios ════════ */}
      {showBeneficios && (
        <Section padding="md" className="overflow-hidden" containerClassName="relative">
          <div className="max-w-2xl mb-16">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8" style={{ backgroundColor: accent }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                {t('beneficiosEyebrow')}
              </span>
            </div>
            <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              {t('beneficiosTituloStart')}{" "}
              <span className="italic font-medium" style={{ color: accent }}>
                {t('beneficiosTituloHighlight')}
              </span>
              {t('beneficiosTituloEnd')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {beneficios.map((b, i) => (
              <article
                key={b.titulo}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5 font-bold text-sm"
                  style={{ backgroundColor: `${accent}26`, color: accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-white text-lg font-extrabold leading-tight mb-3">{b.titulo}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{b.desc}</p>
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* ══ 6. COMO FUNCIONA — só renderiza quando há etapas ════════ */}
      {showEtapas && (
        <section
          id="como-funciona"
          data-theme="light"
          className="relative z-10 scroll-mt-24 bg-[#F5F4EF] text-brand-navy overflow-hidden"
        >
          <BrandPattern
            variant="dots"
            color="var(--color-brand-navy)"
            className="absolute top-20 right-[5%] w-80 h-80 opacity-[0.06] pointer-events-none"
          />

          <Container className="relative py-16">
            <div className="max-w-2xl mb-16">
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8" style={{ backgroundColor: accent }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  {t('comoFuncionaEyebrow')}
                </span>
              </div>
              <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
                {t('comoFuncionaTituloStart')}{" "}
                <span className="italic font-medium" style={{ color: accent }}>
                  {t('comoFuncionaTituloHighlight')}
                </span>
                {t('comoFuncionaTituloEnd')}
              </h2>
              <p className="mt-6 text-brand-navy/70 text-base leading-relaxed">
                {t('comoFuncionaDesc')}
              </p>
            </div>

            <TimelineEtapas etapas={etapas} accent={accent} />
          </Container>
        </section>
      )}

      {/* ══ 7. CASES — só renderiza quando há empresas vinculadas ou cases ══ */}
      {cases.length > 0 && (
        <Section id="cases" padding="md" className="overflow-hidden" containerClassName="relative">
          <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8" style={{ backgroundColor: accent }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  {t('casesEyebrow')}
                </span>
              </div>
              <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                {t('casesTituloStart')}
                <br />
                <span className="italic font-medium" style={{ color: accent }}>
                  {t('casesTituloHighlight')}
                </span>
                {t('casesTituloEnd')}
              </h2>
            </div>
          </div>

          <CasesGrid cases={cases} accent={accent} />
        </Section>
      )}

      {/* ══ 8. FAQ — só renderiza quando há perguntas no Sanity ══════ */}
      {faq.length > 0 && (
        <section className="relative z-10 py-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-[#004E69]/30 blur-[140px]" />
          </div>

          <Container className="relative">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
              <div className="lg:sticky lg:top-24">
                <div className="mb-5 inline-flex items-center gap-2">
                  <span className="block h-px w-8" style={{ backgroundColor: accent }} />
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: accent }}
                  >
                    {t('faqEyebrow')}
                  </span>
                </div>
                <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                  {t('faqTituloStart')}{" "}
                  <span className="italic font-medium" style={{ color: accent }}>
                    {t('faqTituloHighlight')}
                  </span>
                  {t('faqTituloEnd')}
                </h2>
                <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">
                  {t('faqDesc')}
                </p>
                <Link
                  href="/fale-conosco"
                  className="mt-6 inline-flex items-center text-sm font-semibold transition-all hover:opacity-80"
                  style={{ color: accent }}
                >
                  {t('faqCta')}
                </Link>
              </div>

              <FaqAccordion items={faq} />
            </div>
          </Container>
        </section>
      )}

      {/* ══ 9. CTA DE INSCRIÇÃO ══════════════════════════════════════ */}
      <Section id="inscricao" padding="md" className="scroll-mt-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-navy via-[#004E69] to-brand-navy p-8 sm:p-12 md:p-20">
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-brand-orange/20 blur-[140px]" />
          <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-brand-teal/10 blur-[120px]" />

          <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-brand-orange" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                  {programa.statusKey === "aberta"
                    ? t('ctaEyebrowAberta')
                    : programa.statusKey === "em-breve"
                      ? t('ctaEyebrowEmBreve')
                      : programa.statusKey === "fechada"
                        ? t('ctaEyebrowFechada')
                        : t('ctaEyebrowFluxo')}
                </span>
              </div>
              <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight max-w-2xl">
                {programa.statusKey === "aberta" && `${t('ctaTituloAberta')} `}
                {programa.statusKey === "em-breve" && `${t('ctaTituloEmBreve')} `}
                {programa.statusKey === "fechada" && `${t('ctaTituloFechada')} `}
                {programa.statusKey === "fluxo-continuo" && `${t('ctaTituloFluxo')} `}
                <span className="italic font-medium text-brand-orange">
                  {programa.statusKey === "fechada"
                    ? t('ctaDestaqueAlternativo')
                    : t('ctaDestaque')}
                </span>
              </h2>
              <p className="mt-5 text-white/70 text-base leading-relaxed max-w-xl">
                {programa.statusKey === "aberta" && t('ctaDescAberta')}
                {programa.statusKey === "em-breve" && t('ctaDescEmBreve')}
                {programa.statusKey === "fechada" && t('ctaDescFechada')}
                {programa.statusKey === "fluxo-continuo" && t('ctaDescFluxo')}
              </p>

              {/* Status badge */}
              {statusLabel && (
                <div className="mt-6 inline-flex items-center gap-2">
                  <span
                    className={`block w-2 h-2 rounded-full ${isAberta ? "animate-pulse" : ""}`}
                    style={{ backgroundColor: statusColor }}
                  />
                  <span className="text-[11px] font-semibold" style={{ color: statusColor }}>
                    {statusLabel}
                  </span>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/fale-conosco"
                className="inline-flex items-center justify-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
              >
                {ctaPrimario}
              </Link>
              <Link
                href="/programas"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {t('verOutros')}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
