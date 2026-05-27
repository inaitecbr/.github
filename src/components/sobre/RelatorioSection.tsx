import AnimatedCounter from '@/components/AnimatedCounter'
import { Section } from '@/components/Section'
import type { SobreRelatorio } from '@/sanity/queries/sobre'

type Props = {
  relatorio?: SobreRelatorio
}

export default function RelatorioSection({ relatorio }: Props) {
  if (!relatorio) return null

  return (
    <Section id="relatorio" padding="md" className="scroll-mt-24">
      <div className="max-w-2xl mb-16">
        {relatorio.eyebrow && (
          <div className="mb-5 inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-brand-orange" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
              {relatorio.eyebrow}
            </span>
          </div>
        )}
        <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
          {relatorio.titleStart && (
            <>
              {relatorio.titleStart}
              <br />
            </>
          )}
          {relatorio.titleHighlight && (
            <span className="italic font-medium text-brand-orange">{relatorio.titleHighlight}</span>
          )}
        </h2>
        {relatorio.desc && (
          <p className="mt-6 text-white/65 text-base leading-relaxed">{relatorio.desc}</p>
        )}
      </div>

      {/* Big numbers — destaque agregado em card glass */}
      {relatorio.bigNumbers && relatorio.bigNumbers.length > 0 && (
        <div className="relative mb-16 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden">
          <div className="pointer-events-none absolute -top-32 -left-20 w-[400px] h-[400px] rounded-full bg-brand-orange/[0.08] blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-32 -right-20 w-[400px] h-[400px] rounded-full bg-brand-teal/[0.06] blur-[120px]" />

          <div className="relative grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {relatorio.bigNumbers.map((m) => (
              <div key={m._key ?? m.label} className="flex flex-col gap-2 px-4 py-8 sm:px-6 sm:py-10">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight whitespace-nowrap">
                  <AnimatedCounter value={m.value ?? ''} />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista anual */}
      {relatorio.relatorios && relatorio.relatorios.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatorio.relatorios.map((r) => (
            <a
              key={r._key ?? r.ano}
              href={r.pdfUrl ?? '#'}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.06] hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="pointer-events-none absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full bg-brand-orange/0 group-hover:bg-brand-orange/15 blur-[60px] transition-all duration-500" />

              <div className="relative flex items-baseline justify-between mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange">
                  Relatório
                </span>
                <span className="text-3xl font-extrabold text-white tracking-tight">{r.ano}</span>
              </div>
              <div className="relative text-2xl font-bold text-white mb-2 leading-tight">
                {r.destaque}
              </div>
              <p className="relative text-sm text-white/55 leading-relaxed mb-6">{r.resumo}</p>
              <span className="relative inline-flex items-center text-xs font-semibold text-brand-orange group-hover:text-[#FF9B26] transition-all">
                Baixar PDF
              </span>
            </a>
          ))}
        </div>
      )}
    </Section>
  )
}
