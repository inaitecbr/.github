'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname as useLocalizedPathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { Building2, Megaphone, Users, ChevronDown, ArrowRight, Menu, X } from 'lucide-react'

const programsMenu = {
  startups: {
    accent: 'var(--color-brand-orange)',
    items: [
      { name: 'Acelera Pedra Branca', href: '/programas/acelera-pedra-branca' },
      { name: 'Impulse Inaitec', href: '/programas/impulse-inaitec' },
      { name: 'Hub de Ideias', href: '/programas/hub-de-ideias' },
      { name: 'Globaliza Inaitec', href: '/programas/globaliza-inaitec' },
      { name: 'Missões Internacionais', href: '/programas/missoes-internacionais' },
    ],
  },
  empresas: {
    accent: 'var(--color-brand-teal)',
    items: [
      { name: 'Inovação Aberta', href: '/programas/inovacao-aberta' },
      { name: 'Laboratório Cidade', href: '/programas/laboratorio-cidade' },
      { name: 'Desafios Corporativos', href: '/programas/desafios-corporativos' },
      { name: 'Emprega Palhoça', href: '/programas/emprega-palhoca' },
    ],
  },
  universidades: {
    accent: '#4A9EE0',
    items: [
      { name: 'Políticas Públicas', href: '/programas/politicas-publicas' },
      { name: 'Pesquisa Aplicada', href: '/programas/pesquisa-aplicada' },
      { name: 'Transferência Tecnológica', href: '/programas/transferencia-tecnologica' },
      { name: 'Editais Colaborativos', href: '/programas/editais-colaborativos' },
    ],
  },
  investidores: {
    accent: '#E9A84A',
    items: [
      { name: 'Catalisa Inaitec', href: '/programas/catalisa-inaitec' },
      { name: 'Deal Flow Qualificado', href: '/programas/deal-flow' },
      { name: 'Fundo Anjo Pedra Branca', href: '/programas/fundo-anjo' },
      { name: 'Co-investimento', href: '/programas/co-investimento' },
    ],
  },
} as const

type PillarKey = keyof typeof programsMenu

const solucoesMenu = [
  {
    key: 'empresas-instaladas',
    name: 'Empresas Instaladas',
    href: '/solucoes/empresas-instaladas',
    metric: '+200',
    accent: 'var(--color-brand-orange)',
    icon: <Building2 strokeWidth={1.5} className="w-6 h-6" />,
  },
  {
    key: 'chamadas',
    name: 'Chamadas Abertas',
    href: '/chamadas',
    metric: '8',
    accent: 'var(--color-brand-teal)',
    icon: <Megaphone strokeWidth={1.5} className="w-6 h-6" />,
  },
  {
    key: 'banco-de-talentos',
    name: 'Banco de Talentos',
    href: '/banco-de-talentos',
    metric: '2k+',
    accent: '#4A9EE0',
    icon: <Users strokeWidth={1.5} className="w-6 h-6" />,
  },
] as const

const LANG_META = {
  pt: { flag: '🇧🇷' },
  en: { flag: '🇺🇸' },
  es: { flag: '🇪🇸' },
} as const

export default function Header() {
  const pathname = usePathname()
  const t = useTranslations('Header')
  const tLangs = useTranslations('Languages')
  const locale = useLocale()
  const router = useRouter()
  const localizedPathname = useLocalizedPathname()

  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [isGlass, setIsGlass] = useState(true)
  const [langOpen, setLangOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastScrollY = useRef(0)

  const navItems = [
    { label: t('nav.sobre'), href: '/sobre' },
    { label: t('nav.programas'), href: '/programas', key: 'programas', hasMenu: true },
    { label: t('nav.tragaEmpresa'), href: '/traga-sua-empresa' },
    { label: t('nav.solucoes'), href: '/solucoes', key: 'solucoes', hasMenu: true },
    { label: t('nav.conteudo'), href: '/conteudo' },
  ]

  const openMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(key)
  }

  const scheduleCloseMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150)
  }

  const switchLocale = (next: (typeof routing.locales)[number]) => {
    router.replace(localizedPathname, { locale: next })
    setLangOpen(false)
    setMobileOpen(false)
  }

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  // Esconde o header ao rolar para baixo, revela ao rolar para cima
  useEffect(() => {
    lastScrollY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      if (Math.abs(delta) < 6) return
      if (y < 80) setHidden(false)
      else if (delta > 0) setHidden(true)
      else setHidden(false)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const currentFlag = LANG_META[locale as keyof typeof LANG_META]?.flag ?? LANG_META.pt.flag

  const isActive = (href?: string, key?: string) => {
    if (href) return pathname === href || pathname.startsWith(href + '/')
    if (key === 'programas') return pathname.startsWith('/programas')
    if (key === 'solucoes')
      return (
        pathname.startsWith('/solucoes') ||
        pathname.startsWith('/chamadas') ||
        pathname.startsWith('/banco-de-talentos')
      )
    return false
  }

  useEffect(() => {
    const HEADER_H = 68

    const computeTheme = () => {
      const lightSections = document.querySelectorAll<HTMLElement>('[data-theme="light"]')
      if (lightSections.length === 0) {
        setIsGlass(true)
        return
      }
      let overLight = false
      lightSections.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top <= HEADER_H && r.bottom > HEADER_H) overLight = true
      })
      setIsGlass(!overLight)
    }

    computeTheme()
    window.addEventListener('scroll', computeTheme, { passive: true })
    window.addEventListener('resize', computeTheme)
    return () => {
      window.removeEventListener('scroll', computeTheme)
      window.removeEventListener('resize', computeTheme)
    }
  }, [pathname])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        hidden && !activeMenu && !mobileOpen ? '-translate-y-full' : 'translate-y-0',
        isGlass
          ? 'bg-white/10 backdrop-blur-xl border-transparent'
          : 'bg-white border-border',
      ].join(' ')}
    >
      {activeMenu && (
        <div className="fixed inset-0 top-[68px] -z-10 bg-brand-navy/40 backdrop-blur-xl pointer-events-none animate-[fade-in_200ms_ease-out]" />
      )}

      <div className="flex h-[68px] items-center justify-between px-[clamp(1.25rem,4vw+0.5rem,6.75rem)]">

        <Link href="/" className="shrink-0">
          <Image
            src="/logo-inaitec-h.png"
            alt="Inaitec"
            width={130}
            height={30}
            className={`h-7 w-auto object-contain ${isGlass ? 'brightness-0 invert' : ''}`}
            priority
          />
        </Link>

        <nav className="hidden items-center md:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasMenu ? openMenu(item.key!) : undefined}
              onMouseLeave={() => item.hasMenu ? scheduleCloseMenu() : undefined}
            >
              <Link
                href={item.href ?? '#'}
                className={`relative flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:text-brand-orange ${isGlass ? 'text-white' : 'text-[#004E69]'} ${isActive(item.href, item.key) ? 'text-brand-orange' : ''}`}
              >
                {item.label}
                {item.hasMenu && (
                  <ChevronDown
                    strokeWidth={2.5}
                    className={[
                      'h-3 w-3 transition-transform duration-200',
                      activeMenu === item.key ? 'rotate-180 text-brand-orange' : 'opacity-50',
                    ].join(' ')}
                  />
                )}
                {isActive(item.href, item.key) && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-2.5 right-2.5 -bottom-[2px] h-[2px] rounded-full bg-brand-orange"
                  />
                )}
              </Link>

              {item.key === 'programas' && activeMenu === 'programas' && (
                <div
                  className="fixed left-1/2 top-[68px] -translate-x-1/2 pt-3"
                  onMouseEnter={() => openMenu('programas')}
                  onMouseLeave={scheduleCloseMenu}
                >
                  <div className={`w-[min(1080px,calc(100vw-32px))] rounded-2xl shadow-2xl overflow-hidden ${isGlass ? 'bg-brand-navy border border-white/15' : 'border border-border bg-white'}`}>

                    <div className="relative h-32 bg-brand-navy overflow-hidden">
                      <video
                        src="/hero-inaitec.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/70 to-transparent" />
                      <div className="relative h-full flex items-center justify-between px-6 gap-6">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-brand-orange mb-1">
                            {t('programsMenu.eyebrow')}
                          </div>
                          <h3 className="text-white font-extrabold text-xl leading-tight">
                            {t('programsMenu.title')}
                          </h3>
                        </div>
                        <Link
                          href="/programas"
                          className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 hover:bg-brand-orange hover:border-brand-orange transition-all shrink-0"
                        >
                          {t('programsMenu.viewAll')}
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4">
                      {(Object.keys(programsMenu) as PillarKey[]).map((key, idx) => {
                        const col = programsMenu[key]
                        return (
                          <div
                            key={key}
                            className={[
                              'p-5',
                              idx > 0 ? 'lg:border-l' : '',
                              idx % 2 === 1 ? 'border-l' : '',
                              idx >= 2 ? 'border-t lg:border-t-0' : '',
                              isGlass ? 'border-white/10' : 'border-border',
                            ].join(' ')}
                          >
                            <div className="mb-2 flex items-center gap-2">
                              <span className="block h-px w-6" style={{ backgroundColor: col.accent }} />
                              <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: col.accent }}>
                                {t('programsMenu.pillarLabel', { n: idx + 1 })}
                              </span>
                            </div>
                            <div className={`mb-1 text-[13px] font-extrabold tracking-tight leading-tight ${isGlass ? 'text-white' : 'text-brand-navy'}`}>
                              {t(`programsMenu.pillars.${key}.label`)}
                            </div>
                            <p className={`text-[11px] leading-snug mb-3 ${isGlass ? 'text-white/50' : 'text-text-muted'}`}>
                              {t(`programsMenu.pillars.${key}.desc`)}
                            </p>
                            <ul className="space-y-0.5">
                              {col.items.map((it) => (
                                <li key={it.href}>
                                  <Link
                                    href={it.href}
                                    className={`group/item block rounded-lg px-2.5 py-1.5 transition-colors ${isGlass ? 'hover:bg-white/10' : 'hover:bg-[#F5F4EF]'}`}
                                  >
                                    <div
                                      className={`text-[13px] font-semibold transition-colors ${isGlass ? 'text-white group-hover/item:text-brand-orange' : 'text-[#004E69] group-hover/item:text-brand-orange'}`}
                                    >
                                      {it.name}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>

                    <div className={`border-t px-5 py-3 flex items-center justify-between ${isGlass ? 'border-white/10 bg-white/5' : 'border-border bg-[#F5F4EF]'}`}>
                      <span className={`text-xs ${isGlass ? 'text-white/60' : 'text-text-muted'}`}>
                        {t('programsMenu.footerText')}
                      </span>
                      <Link
                        href="/fale-conosco"
                        className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange transition-all"
                      >
                        {t('programsMenu.footerCta')}
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {item.key === 'solucoes' && activeMenu === 'solucoes' && (
                <div
                  className="fixed left-1/2 top-[68px] -translate-x-1/2 pt-3"
                  onMouseEnter={() => openMenu('solucoes')}
                  onMouseLeave={scheduleCloseMenu}
                >
                  <div className={`w-[min(660px,calc(100vw-32px))] rounded-2xl shadow-2xl overflow-hidden ${isGlass ? 'border border-white/10 bg-brand-navy' : 'border border-border bg-white'}`}>

                    <div className={`grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x ${isGlass ? 'divide-white/10' : 'divide-border'}`}>
                      {solucoesMenu.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          className={`group relative flex flex-col gap-4 p-6 overflow-hidden transition-all duration-200 ${
                            isGlass ? 'hover:bg-white/[0.06]' : 'hover:bg-[#F5F4EF]'
                          }`}
                        >
                          <div
                            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: `radial-gradient(ellipse at top left, ${it.accent}18 0%, transparent 70%)` }}
                          />
                          <span
                            className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                            style={{ backgroundColor: it.accent }}
                          />
                          <div
                            className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                            style={{ backgroundColor: `${it.accent}18`, color: it.accent }}
                          >
                            {it.icon}
                          </div>
                          <div className="relative flex-1">
                            <div className={`text-[13px] font-bold leading-tight mb-1.5 transition-colors ${isGlass ? 'text-white' : 'text-brand-navy'}`}>
                              {it.name}
                            </div>
                            <p className={`text-[11px] leading-relaxed ${isGlass ? 'text-white/45' : 'text-brand-navy/50'}`}>
                              {t(`solucoesMenu.items.${it.key}.desc`)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className={`border-t px-5 py-3 flex items-center justify-between ${isGlass ? 'border-white/10 bg-white/[0.03]' : 'border-border bg-[#F5F4EF]'}`}>
                      <span className={`text-[11px] ${isGlass ? 'text-white/40' : 'text-brand-navy/45'}`}>
                        {t('solucoesMenu.footerText')}
                      </span>
                      <Link
                        href="/fale-conosco"
                        className="inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-orange hover:gap-2.5 transition-all duration-200"
                      >
                        {t('solucoesMenu.footerCta')}
                        <ArrowRight strokeWidth={2.5} className="w-3 h-3" />
                      </Link>
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className={[
              'inline-flex items-center text-sm font-semibold transition-all',
              isGlass ? 'text-white hover:text-brand-orange' : 'text-brand-navy hover:text-brand-orange',
            ].join(' ')}
          >
            {t('cta.login')}
          </Link>
          <Link
            href="/fale-conosco"
            className={[
              'group inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all',
              isGlass
                ? 'bg-white/15 border border-white/30 text-white backdrop-blur-sm hover:bg-brand-orange hover:border-brand-orange'
                : 'bg-brand-navy text-white hover:bg-brand-orange hover:shadow-lg hover:shadow-brand-orange/20',
            ].join(' ')}
          >
            {t('cta.contato')}
          </Link>

          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={t('cta.selectLanguage')}
              className={[
                'inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-all',
                isGlass
                  ? 'border border-white/30 text-white hover:bg-white/10'
                  : 'border border-brand-navy/20 text-brand-navy hover:border-brand-orange hover:text-brand-orange',
              ].join(' ')}
            >
              <span className="text-base leading-none" aria-hidden="true">
                {currentFlag}
              </span>
              <span>{locale.toUpperCase()}</span>
              <ChevronDown
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${langOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {langOpen && (
              <div
                role="listbox"
                className="absolute right-0 z-30 mt-2 min-w-[220px] rounded-xl border border-white/10 bg-brand-navy shadow-2xl shadow-black/50 overflow-hidden"
              >
                {routing.locales.map((code) => (
                  <button
                    key={code}
                    type="button"
                    role="option"
                    aria-selected={code === locale}
                    onClick={() => switchLocale(code)}
                    className={`w-full text-left px-4 py-3 text-sm transition flex items-center gap-3 ${
                      code === locale
                        ? 'bg-brand-orange/15 text-brand-orange'
                        : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-base leading-none" aria-hidden="true">
                      {LANG_META[code].flag}
                    </span>
                    <span>{tLangs(code)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          className={`rounded-lg p-2 md:hidden ${isGlass ? 'text-white' : 'text-[#004E69]'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t('cta.menu')}
        >
          {mobileOpen ? (
            <X strokeWidth={2} className="h-5 w-5" />
          ) : (
            <Menu strokeWidth={2} className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-white px-[clamp(1.25rem,4vw+0.5rem,6.75rem)] py-6 md:hidden">
          <nav className="flex flex-col">
            {/* Nav items */}
            {navItems.map((it) => {
              const active = isActive(it.href, it.key)
              const isSolucoes = it.key === 'solucoes'
              const expanded = mobileExpanded === it.key

              // Soluções com submenu expansível
              if (isSolucoes) {
                return (
                  <div key={it.label} className="border-b border-border/60 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(expanded ? null : it.key!)}
                      aria-expanded={expanded}
                      className={`flex w-full items-center justify-between py-4 text-base font-medium transition-colors ${
                        active ? 'text-brand-orange' : 'text-brand-navy hover:text-brand-orange'
                      }`}
                    >
                      {it.label}
                      <ChevronDown
                        strokeWidth={2}
                        className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expanded && (
                      <div className="pb-3 flex flex-col">
                        {solucoesMenu.map((sub) => (
                          <Link
                            key={sub.key}
                            href={sub.href}
                            className="py-2.5 text-sm text-brand-navy hover:text-brand-orange transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={it.label}
                  href={it.href ?? '#'}
                  className={`flex items-center justify-between border-b border-border/60 py-4 text-base font-medium transition-colors last:border-b-0 ${
                    active
                      ? 'text-brand-orange'
                      : 'text-brand-navy hover:text-brand-orange'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {it.label}
                </Link>
              )
            })}

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center rounded-full border border-brand-navy/15 px-5 py-3 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange"
                onClick={() => setMobileOpen(false)}
              >
                {t('cta.login')}
              </Link>
              <Link
                href="/fale-conosco"
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-orange hover:shadow-lg hover:shadow-brand-orange/20"
                onClick={() => setMobileOpen(false)}
              >
                {t('cta.contato')}
              </Link>
            </div>

            {/* Language switcher */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/45 text-center">
                {t('cta.selectLanguage')}
              </div>
              <div className="flex items-center justify-center gap-2">
                {routing.locales.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => switchLocale(code)}
                    aria-pressed={code === locale}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                      code === locale
                        ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
                        : 'border-brand-navy/15 text-[#4B6472] hover:border-brand-navy/30 hover:text-brand-navy'
                    }`}
                  >
                    <span className="text-sm leading-none" aria-hidden="true">
                      {LANG_META[code].flag}
                    </span>
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
