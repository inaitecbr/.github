import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { HeaderProgramsByPillar } from '@/sanity/queries/headerPrograms'

const PILLAR_ORDER = ['startups', 'empresas', 'universidades', 'investidores'] as const

type FooterProps = {
  programs: HeaderProgramsByPillar
}

export default function Footer({ programs }: FooterProps) {
  const t = useTranslations('Footer')

  // Pega 1 programa de cada pilar (intercala) — limite total: 5
  const programasFooter = (() => {
    const out: { name: string; href: string }[] = []
    let cursor = 0
    while (out.length < 5) {
      let added = false
      for (const key of PILLAR_ORDER) {
        const item = programs[key]?.[cursor]
        if (item?.slug && item.name) {
          out.push({ name: item.name, href: `/programas/${item.slug}` })
          added = true
          if (out.length >= 5) break
        }
      }
      if (!added) break
      cursor++
    }
    out.push({ name: t('links.verTodos'), href: '/programas' })
    return out
  })()

  const links = {
    programas: programasFooter,
    institucional: [
      { name: t('links.quemSomos'), href: '/sobre#quem-somos' },
      { name: t('links.nossaHistoria'), href: '/sobre#nossa-historia' },
      { name: t('links.relatorio'), href: '/sobre#relatorio' },
      { name: t('links.estrutura'), href: '/sobre#estrutura' },
    ],
    ecossistema: [
      { name: t('links.empresasInstaladas'), href: '/solucoes/empresas-instaladas' },
      { name: t('links.tragaEmpresa'), href: '/traga-sua-empresa' },
      { name: t('links.bancoTalentos'), href: '/banco-de-talentos' },
      { name: t('links.chamadas'), href: '/chamadas' },
      { name: t('links.conteudo'), href: '/conteudo' },
    ],
  }

  const social = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/inaitec',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/inaitec',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@inaitec',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-brand-navy">
      <div className="px-[clamp(1.25rem,4vw+0.5rem,6.75rem)] pt-14 pb-10">
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-brand-orange">
                {t('newsletter.eyebrow')}
              </div>
              <h3 className="text-white text-xl font-extrabold leading-tight">
                {t('newsletter.title')}
              </h3>
              <p className="mt-2 text-sm text-white/55 leading-relaxed max-w-2xl">
                {t('newsletter.desc')}
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto"
            >
              <input
                type="email"
                placeholder={t('newsletter.emailPlaceholder')}
                className="h-11 w-full min-w-0 sm:w-auto sm:min-w-[260px] rounded-full border border-white/15 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-brand-orange/60"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-full bg-brand-orange px-6 text-sm font-semibold text-white transition-all hover:bg-[#FF9B26] hover:shadow-lg hover:shadow-brand-orange/25"
              >
                {t('newsletter.submit')}
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <Link href="/">
              <Image
                src="/logo-inaitec-h.png"
                alt="Inaitec"
                width={140}
                height={32}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              {t('brand.line1')}<br />
              {t('brand.line2')}
            </p>
            <div className="flex items-center gap-3">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-brand-orange hover:text-white transition-all"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 text-[10px] font-bold uppercase tracking-widest text-brand-orange">
              {t('sections.programas')}
            </div>
            <ul className="space-y-2.5">
              {links.programas.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/45 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[10px] font-bold uppercase tracking-widest text-brand-orange">
              {t('sections.institucional')}
            </div>
            <ul className="space-y-2.5">
              {links.institucional.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/45 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[10px] font-bold uppercase tracking-widest text-brand-orange">
              {t('sections.ecossistema')}
            </div>
            <ul className="space-y-2.5">
              {links.ecossistema.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/45 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.08] pt-6 flex flex-col gap-6 text-xs text-white/30 md:flex-row md:items-center md:justify-between md:gap-4">
          <span>{t('bottom.copyright', { year: new Date().getFullYear() })}</span>
          <div className="flex items-center gap-2">
            <span>{t('bottom.criadoPor')}</span>
            <Image
              src="/atomsix-signature.svg"
              alt="Atom6 Studio"
              width={30}
              height={8}
              className="opacity-40 hover:opacity-70 transition-opacity"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
