import BrandPattern from '@/components/BrandPattern'
import { Container } from '@/components/Section'
import type { SobreHistoria } from '@/sanity/queries/sobre'

type Props = {
  historia?: SobreHistoria
}

export default function HistoriaSection({ historia }: Props) {
  if (!historia) return null

  const totalEventos = historia.eventos?.length ?? 0

  return (
    <section id="nossa-historia" className="relative z-10 scroll-mt-24 py-16 overflow-hidden">
      <BrandPattern
        variant="dots"
        color="var(--color-brand-orange)"
        className="absolute top-20 right-0 w-96 h-96 opacity-20 pointer-events-none"
      />

      <Container className="relative">
        <div className="max-w-2xl mb-16">
          {historia.eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {historia.eyebrow}
              </span>
            </div>
          )}
          <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
            {historia.titleStart && <>{historia.titleStart}{' '}</>}
            {historia.titleHighlight && (
              <span className="italic font-medium text-brand-orange">{historia.titleHighlight}</span>
            )}
            {historia.titleEnd && <>{' '}{historia.titleEnd}</>}
          </h2>
          {historia.desc && (
            <p className="mt-6 text-white/65 text-base leading-relaxed">{historia.desc}</p>
          )}
        </div>

        {/* Timeline horizontal */}
        {historia.eventos && historia.eventos.length > 0 && (
          <div className="relative">
            <div className="absolute left-0 right-0 top-8 h-px bg-white/15 hidden md:block" />
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
              {historia.eventos.map((item, i) => (
                <li key={item._key ?? item.ano} className="relative group">
                  <div
                    className={`relative z-10 mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full font-extrabold text-sm tracking-tight transition-all duration-300 ${
                      i === totalEventos - 1
                        ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30 group-hover:scale-105'
                        : 'bg-brand-navy border border-white/15 text-white group-hover:border-brand-orange/60 group-hover:bg-brand-orange/10'
                    }`}
                  >
                    {item.ano}
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2 group-hover:text-brand-orange transition-colors">
                    {item.titulo}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </Container>
    </section>
  )
}
