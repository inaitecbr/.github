import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Section } from '@/components/Section'
import type { SobreConselho, SobreLideranca, SobrePessoa } from '@/sanity/queries/sobre'

// ── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(nome: string) {
  const partes = nome.trim().split(/\s+/).filter((p) => p.length > 1)
  if (partes.length === 0) return '·'
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase()
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
}

// ── Sub-componentes ───────────────────────────────────────────────────────────

function PessoaCard({
  pessoa,
  destaque = false,
  fotoEmBreveLabel,
}: {
  pessoa: SobrePessoa
  destaque?: boolean
  fotoEmBreveLabel: string
}) {
  return (
    <article
      className={[
        'group relative rounded-2xl bg-white border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-brand-navy/10 hover:-translate-y-1',
        destaque
          ? 'border-brand-orange/40 ring-1 ring-brand-orange/30'
          : 'border-border hover:border-brand-orange/30',
      ].join(' ')}
    >
      <div className="relative aspect-[4/5] bg-[#F5F4EF] overflow-hidden">
        {pessoa.fotoUrl ? (
          <Image
            src={pessoa.fotoUrl}
            alt={pessoa.nome ?? ''}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-navy/[0.04] via-brand-orange/[0.06] to-[#004E69]/[0.05]">
            <span className="text-5xl font-extrabold tracking-tight text-brand-navy/35">
              {pessoa.nome ? getInitials(pessoa.nome) : '?'}
            </span>
            <span className="mt-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-navy/30">
              {fotoEmBreveLabel}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <div
          className={[
            'text-[10px] font-bold uppercase tracking-[0.2em] mb-2',
            destaque ? 'text-brand-orange' : 'text-brand-navy/55',
          ].join(' ')}
        >
          {pessoa.cargo}
        </div>
        <h4 className="font-bold text-lg leading-tight">{pessoa.nome}</h4>
      </div>
      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </article>
  )
}

function ConselhoCompacto({
  conselho,
  accent,
  destaque = false,
}: {
  conselho: SobreConselho
  accent: string
  destaque?: boolean
}) {
  return (
    <div
      className={`rounded-2xl p-7 flex flex-col ${
        destaque ? 'bg-brand-navy text-white' : 'bg-white border border-border text-brand-navy'
      }`}
    >
      <div className="mb-5">
        <span className="block h-px w-8 mb-3" style={{ backgroundColor: accent }} />
        <h4 className="font-bold text-lg leading-tight mb-2">{conselho.titulo}</h4>
        <p
          className={`text-[13px] leading-relaxed ${
            destaque ? 'text-white/60' : 'text-brand-navy/60'
          }`}
        >
          {conselho.desc}
        </p>
      </div>
      <ul
        className={`flex-1 -mx-2 ${
          destaque ? 'divide-y divide-white/10' : 'divide-y divide-border/70'
        }`}
      >
        {conselho.membros?.map((m) => (
          <li key={m._key ?? m.nome} className="flex items-center gap-3 px-2 py-3">
            <span
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold tracking-tight"
              style={{ backgroundColor: `${accent}1a`, color: accent }}
            >
              {m.nome ? getInitials(m.nome) : '?'}
            </span>
            <div className="min-w-0">
              <div className="font-semibold text-sm leading-tight truncate">{m.nome}</div>
              <div
                className={`text-[11px] leading-tight mt-0.5 ${
                  destaque ? 'text-white/55' : 'text-brand-navy/55'
                }`}
              >
                {m.cargo}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Secção principal ──────────────────────────────────────────────────────────

type Props = {
  lideranca?: SobreLideranca
}

export default async function LiderancaSection({ lideranca }: Props) {
  if (!lideranca) return null

  const t = await getTranslations('Sobre')
  const fotoEmBreveLabel = t('fotoEmBreve')

  return (
    <Section id="lideranca" theme="light" padding="md" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          {lideranca.eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {lideranca.eyebrow}
              </span>
            </div>
          )}
          <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
            {lideranca.titleStart && <>{lideranca.titleStart}{' '}</>}
            {lideranca.titleHighlight && (
              <span className="italic font-medium text-brand-orange">{lideranca.titleHighlight}</span>
            )}
          </h2>
          {lideranca.desc && (
            <p className="mt-6 text-brand-navy/70 text-base leading-relaxed">{lideranca.desc}</p>
          )}
        </div>
      </div>

      {/* Diretoria Executiva e Gerências */}
      {lideranca.diretoria && lideranca.diretoria.length > 0 && (
        <div className="mb-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              {lideranca.diretoriaLabel && (
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-2">
                  {lideranca.diretoriaLabel}
                </div>
              )}
              {lideranca.diretoriaTitulo && (
                <h3 className="font-extrabold text-2xl md:text-3xl leading-tight">
                  {lideranca.diretoriaTitulo}
                </h3>
              )}
            </div>
            {lideranca.diretoriaDesc && (
              <p className="text-sm text-brand-navy/55 max-w-md leading-relaxed">
                {lideranca.diretoriaDesc}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lideranca.diretoria.map((p) => (
              <PessoaCard
                key={p._key ?? p.nome}
                pessoa={p}
                fotoEmBreveLabel={fotoEmBreveLabel}
              />
            ))}
          </div>
        </div>
      )}

      {/* Conselhos */}
      {(lideranca.conselhoDeliberativo ||
        lideranca.conselhoFiscal ||
        lideranca.conselhoTecnico ||
        lideranca.juridico) && (
        <div>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              {lideranca.conselhosLabel && (
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-2">
                  {lideranca.conselhosLabel}
                </div>
              )}
              {lideranca.conselhosTitulo && (
                <h3 className="font-extrabold text-2xl md:text-3xl leading-tight">
                  {lideranca.conselhosTitulo}
                </h3>
              )}
            </div>
            {lideranca.conselhosDesc && (
              <p className="text-sm text-brand-navy/55 max-w-md leading-relaxed">
                {lideranca.conselhosDesc}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lideranca.conselhoDeliberativo && (
              <ConselhoCompacto
                conselho={lideranca.conselhoDeliberativo}
                accent="var(--color-brand-orange)"
                destaque
              />
            )}
            {lideranca.conselhoFiscal && (
              <ConselhoCompacto
                conselho={lideranca.conselhoFiscal}
                accent="var(--color-brand-teal)"
              />
            )}
            {lideranca.conselhoTecnico && (
              <ConselhoCompacto
                conselho={lideranca.conselhoTecnico}
                accent="#FFB560"
              />
            )}
            {lideranca.juridico && (
              <ConselhoCompacto
                conselho={lideranca.juridico}
                accent="#4A9EE0"
              />
            )}
          </div>
        </div>
      )}
    </Section>
  )
}
