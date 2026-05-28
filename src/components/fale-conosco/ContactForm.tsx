'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Dropdown from '@/components/Dropdown'

export default function ContactForm() {
  const t = useTranslations('FaleConosco.form')
  const [enviado, setEnviado] = useState(false)

  const PERFIS = [
    { value: 'startup',      label: t('perfilStartup') },
    { value: 'empresa',      label: t('perfilEmpresa') },
    { value: 'investidor',   label: t('perfilInvestidor') },
    { value: 'governo',      label: t('perfilGoverno') },
    { value: 'universidade', label: t('perfilUniversidade') },
    { value: 'imprensa',     label: t('perfilImprensa') },
    { value: 'outro',        label: t('perfilOutro') },
  ]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEnviado(true)
  }

  const inputClass =
    'w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-orange/60 focus:bg-white/[0.08] transition-all'

  const labelClass =
    'block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5'

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 sm:p-7">
      {enviado ? (
        <div className="py-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-teal/20 text-brand-teal mx-auto mb-6">
            <Check strokeWidth={2} className="w-8 h-8" />
          </div>
          <h3 className="text-white font-bold text-2xl mb-3">{t('successTitle')}</h3>
          <p className="text-white/65 leading-relaxed">{t('successDesc')}</p>
          <button
            onClick={() => setEnviado(false)}
            className="mt-8 text-sm font-semibold text-brand-orange hover:text-[#FF9B26] transition-colors"
          >
            {t('successBack')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="contato-nome" className={labelClass}>{t('labelNome')}</label>
              <input
                id="contato-nome"
                name="nome"
                type="text"
                required
                placeholder={t('placeholderNome')}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contato-sobrenome" className={labelClass}>{t('labelSobrenome')}</label>
              <input
                id="contato-sobrenome"
                name="sobrenome"
                type="text"
                required
                placeholder={t('placeholderSobrenome')}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="contato-email" className={labelClass}>{t('labelEmail')}</label>
              <input
                id="contato-email"
                name="email"
                type="email"
                required
                placeholder={t('placeholderEmail')}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contato-telefone" className={labelClass}>{t('labelTelefone')}</label>
              <input
                id="contato-telefone"
                name="telefone"
                type="tel"
                placeholder={t('placeholderTelefone')}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="perfil" className={labelClass}>{t('labelPerfil')}</label>
            <Dropdown
              id="perfil"
              name="perfil"
              placeholder={t('placeholderPerfil')}
              options={PERFIS}
            />
          </div>

          <div>
            <label htmlFor="contato-mensagem" className={labelClass}>{t('labelMensagem')}</label>
            <textarea
              id="contato-mensagem"
              name="mensagem"
              required
              rows={3}
              placeholder={t('placeholderMensagem')}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-full bg-brand-orange text-white text-sm font-semibold px-8 py-3.5 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
          >
            {t('submitLabel')}
          </button>

          <p className="text-[11px] text-white/45 leading-relaxed">
            {t('privacyText')}{' '}
            <Link href="/politica-de-privacidade" className="text-white/70 underline underline-offset-2 hover:text-brand-orange transition-colors">
              {t('privacyLinkLabel')}
            </Link>{' '}
            {t('privacyAnd')}
          </p>
        </form>
      )}
    </div>
  )
}
