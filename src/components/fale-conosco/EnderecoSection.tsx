import { MapPin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Section } from '@/components/Section'
import type { FaleConoscoEndereco } from '@/sanity/queries/faleConosco'

type Props = {
  endereco?: FaleConoscoEndereco
}

export default async function EnderecoSection({ endereco }: Props) {
  if (!endereco) return null
  const t = await getTranslations('FaleConosco')

  return (
    <Section
      theme="light"
      padding="none"
      className="pt-16 pb-28"
      containerClassName="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"
    >
      <div>
        {endereco.eyebrow && (
          <div className="mb-5 inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-brand-orange" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
              {endereco.eyebrow}
            </span>
          </div>
        )}

        <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
          {endereco.titleStart && <>{endereco.titleStart}{' '}</>}
          {endereco.titleHighlight && (
            <span className="italic font-medium text-brand-orange">{endereco.titleHighlight}</span>
          )}
        </h2>

        {endereco.desc && (
          <p className="mt-5 text-brand-navy/65 text-base leading-relaxed max-w-lg">
            {endereco.desc}
          </p>
        )}

        {(endereco.logradouro || endereco.complemento) && (
          <div className="mt-10 space-y-8">
            <div className="flex gap-5">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange shrink-0">
                <MapPin strokeWidth={1.8} className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/45 mb-1">
                  {t('enderecoLabel')}
                </div>
                {endereco.logradouro && (
                  <div className="font-bold text-lg leading-tight">{endereco.logradouro}</div>
                )}
                {endereco.complemento && (
                  <div className="text-brand-navy/60 text-sm mt-1 leading-relaxed">
                    {endereco.complemento}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {endereco.mapaEmbedUrl && (
        <div className="relative rounded-3xl overflow-hidden border border-border bg-white aspect-[5/4] lg:aspect-[6/5] shadow-xl shadow-brand-navy/10">
          <iframe
            title={endereco.mapaTitle ?? 'Mapa'}
            src={endereco.mapaEmbedUrl}
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      )}
    </Section>
  )
}
