export type CaseItem = {
  nome: string
  setor: string
  logo?: string
  foto?: string
  quote: string
  pessoa: string
  cargo?: string
  metricas?: { label: string; value: string }[]
}

export default function CasesGrid({
  cases,
  accent,
}: {
  cases: CaseItem[]
  accent: string
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {cases.map((c) => (
        <article
          key={c.nome}
          className="group relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-0.5"
        >
          <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-[0.18em] text-white/30 transition-colors duration-300 group-hover:text-white/50">
            {c.setor}
          </span>

          <div className="flex items-center justify-center h-[200px] px-5 pt-8 pb-5">
            {c.logo ? (
              <img
                src={c.logo}
                alt={c.nome}
                className="h-10 w-auto object-contain brightness-0 invert opacity-45 transition-opacity duration-300 group-hover:opacity-75"
              />
            ) : (
              <span className="text-base font-extrabold tracking-tight text-center leading-snug text-white/50 transition-colors duration-300 group-hover:text-white/80">
                {c.nome}
              </span>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
