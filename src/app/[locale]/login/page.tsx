import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import Dropdown from '@/components/Dropdown'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Login' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Login' })

  const perfilOptions = [
    { value: 'startup',      label: t('perfilStartup') },
    { value: 'empresa',      label: t('perfilEmpresa') },
    { value: 'investidor',   label: t('perfilInvestidor') },
    { value: 'universidade', label: t('perfilUniversidade') },
  ]

  return (
    <main className="relative min-h-dvh overflow-hidden bg-brand-navy flex items-center px-5 sm:px-10 lg:px-[108px] pt-[calc(108px+4vh)] pb-[4vh]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[12%] left-[-12%] w-[700px] h-[700px] rounded-full bg-brand-orange/15 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[-10%] w-[680px] h-[680px] rounded-full bg-brand-teal/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px] w-full">
        <section className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-6 shadow-2xl shadow-black/30 backdrop-blur-sm">
          <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-2xl border border-white/10 bg-brand-navy/90 p-6 sm:p-8 md:p-10">
              <div className="mb-8">
                <div className="mb-3 inline-flex items-center gap-2">
                  <span className="block h-px w-8 bg-brand-orange" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                    {t('eyebrow')}
                  </span>
                </div>
                <h2 className="text-white text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                  {t('heading')}
                </h2>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">
                  {t('subheading')}
                </p>
              </div>

              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="perfil" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    {t('labelPerfil')}
                  </label>
                  <Dropdown
                    id="perfil"
                    name="perfil"
                    placeholder={t('placeholderPerfil')}
                    options={perfilOptions}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    {t('labelEmail')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('placeholderEmail')}
                    className="h-12 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand-orange focus:bg-white/[0.06]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="senha" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    {t('labelSenha')}
                  </label>
                  <input
                    id="senha"
                    name="senha"
                    type="password"
                    placeholder={t('placeholderSenha')}
                    className="h-12 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand-orange focus:bg-white/[0.06]"
                  />
                </div>

                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title={t('btnEmBreve')}
                  className="mt-2 h-12 rounded-full bg-white/10 text-sm font-semibold text-white/40 cursor-not-allowed"
                >
                  {t('btnAcessar')}
                </button>
              </form>

              <div className="mt-5 flex items-center justify-between text-xs text-white/45">
                <span>{t('copyright', { year: new Date().getFullYear() })}</span>
                <Link href="/privacidade" className="hover:text-white/70 transition-colors">
                  {t('privacyLink')}
                </Link>
              </div>
            </div>

            <div className="relative hidden md:block min-h-[min(640px,68vh)] overflow-hidden rounded-2xl">
              <Image
                src="/form-image.jpg"
                alt={t('imageAlt')}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />
              <div className="absolute left-6 right-6 bottom-6 rounded-2xl border border-white/20 bg-white/[0.08] p-5 backdrop-blur-md">
                <div className="mb-3 text-[#F6C453]">★★★★★</div>
                <p className="text-white/85 text-sm leading-relaxed">
                  &ldquo;{t('testimonialText')}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-white/15">
                  <div className="text-white font-bold text-lg">{t('testimonialAuthor')}</div>
                  <div className="text-white/60 text-sm mt-0.5">{t('testimonialRole')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
