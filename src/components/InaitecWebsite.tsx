'use client'

import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ArrowRight, Check, ChevronLeft, ChevronRight, Plus, Star } from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter'
import BrandPattern from '@/components/BrandPattern'
import ChamadasAbertasDestaque from '@/components/ChamadasAbertasDestaque'
import EcosystemAccordion from '@/components/EcosystemAccordion'
import TimelineCinematic from '@/components/TimelineCinematic'
import { Section, Container } from '@/components/Section'

const PARCEIRO_GROUPS = [
  {
    key: 'mantenedores',
    logos: [
      { slug: 'hurbana', alt: 'Hurbana' },
      { slug: 'eurotec', alt: 'Eurotec' },
    ],
  },
  {
    key: 'apoiadores',
    logos: [
      { slug: 'fapesc', alt: 'Fapesc' },
      { slug: 'finep', alt: 'Finep' },
    ],
  },
] as const

export default function InaitecWebsite() {
  const t = useTranslations('Home')
  return (
    <main className="relative bg-[#0D2E38] overflow-x-clip">

      {/* ── Fundo orgânico unificado — orbs flutuantes através de todas as seções ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Luzes-âncora laranjas — pontos de destaque ao longo do scroll */}
        <div className="absolute top-[110vh] left-[-10%] w-[1100px] h-[1100px] rounded-full bg-[#FA8400]/[0.10] blur-[160px]" />
        <div className="absolute top-[310vh] right-[-10%] w-[1100px] h-[1100px] rounded-full bg-[#FA8400]/[0.10] blur-[160px]" />
        <div className="absolute top-[520vh] left-[20%] w-[1100px] h-[1100px] rounded-full bg-[#FA8400]/[0.10] blur-[160px]" />

        {/* Orbs secundários — textura ambiente */}
        <div className="absolute top-[160vh] right-[-20%] w-[900px] h-[900px] rounded-full bg-[#004E69]/30 blur-[140px]" />
        <div className="absolute top-[420vh] left-[-10%] w-[800px] h-[800px] rounded-full bg-[#00C08B]/[0.05] blur-[140px]" />

        {/* Grid sutil global — só aparece após a hero */}
        <div
          className="absolute top-[100vh] left-0 right-0 bottom-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        />

        {/* Véu escuro para manter legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D2E38]/20 to-[#0D2E38]/40" />
      </div>

      {/* ── Hero full-screen com vídeo ──────────────────────────────────── */}
      <section className="relative h-dvh w-full overflow-hidden z-10">

        <video
          src="/hero-inaitec.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0D2E38]/70 via-[#0D2E38]/50 to-[#0D2E38]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5))] pointer-events-none" />
        {/* Scrim central para legibilidade do texto */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_52%,rgba(13,46,56,0.55)_0%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-[68px] pb-32">

          <h1 className="font-extrabold text-white text-display-3xl leading-[0.95] tracking-tight max-w-5xl drop-shadow-xl">
            {t('hero.titleStart')}{' '}
            <span className="italic font-medium text-[#FA8400] tracking-tight">{t('hero.titleHighlight')}</span>
          </h1>

          <p className="mt-8 max-w-2xl text-white/80 text-[15px] md:text-base leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="mt-10 w-full flex flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Link
              href="/programas"
              className="group inline-flex items-center justify-center rounded-full bg-[#FA8400] text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
            >
              {t('hero.ctaPrimary')}
            </Link>
            <Link
              href="/programas"
              className="group inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white hover:text-[#0D2E38] hover:border-white transition-all duration-300"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>

        </div>

        {/* Barra de métricas fixa no fundo da hero */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-[#0D2E38]/50 backdrop-blur-md">
          <Container className="py-6 grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-white/10">
            {[
              { value: '+300', label: t('hero.metrics.startups') },
              { value: '+200', label: t('hero.metrics.empresas') },
              { value: '1334', label: t('hero.metrics.area') },
              { value: '15', label: t('hero.metrics.anos') },
            ].map((m) => (
              <div
                key={m.label}
                className="flex flex-col items-center gap-1 md:py-0 md:px-6"
              >
                <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  <AnimatedCounter value={m.value} />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 text-center">
                  {m.label}
                </span>
              </div>
            ))}
          </Container>
        </div>
      </section>

      {/* ── Parceiros — Mantenedores + Apoiadores ───────────────────────── */}
      <Section
        padding="md"
        containerClassName="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center"
      >
        <h2 className="font-extrabold text-white text-display-lg tracking-tight text-center lg:text-left">
          {t('parceiros.title')}
          <br />
          <span className="italic font-medium text-[#FA8400]">
            {t('parceiros.titleHighlight')}
          </span>
          .
        </h2>

        <ul className="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:justify-center sm:gap-12 lg:justify-end lg:gap-16">
          {PARCEIRO_GROUPS.map((group, i) => (
            <Fragment key={group.key}>
              {i > 0 && (
                <li aria-hidden className="hidden sm:block w-px h-10 bg-white/15 shrink-0" />
              )}
              <li className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/45 shrink-0">
                  {t(`parceiros.${group.key}`)}
                </span>
                <div className="flex items-center gap-8 sm:gap-10">
                  {group.logos.map((logo) => (
                    <Image
                      key={logo.slug}
                      src={`/apoiadores-mantenedores/${logo.slug}.png`}
                      alt={logo.alt}
                      width={180}
                      height={48}
                      className="h-16 sm:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  ))}
                </div>
              </li>
            </Fragment>
          ))}
        </ul>
      </Section>

      {/* ── Ecossistema — uma dobra: contexto + linha do tempo ───────────── */}
      <section className="relative z-10 min-h-dvh flex flex-col justify-center py-20 overflow-hidden">
        <BrandPattern
          variant="dots"
          color="#FA8400"
          className="absolute top-20 right-0 w-96 h-96 opacity-20 pointer-events-none"
        />

        <Container className="relative">

          {/* Cabeçalho — contexto do ecossistema */}
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-[#FA8400]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
              {t('ecossistema.eyebrow')}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <h2 className="font-extrabold text-display-lg leading-[1.15] text-white tracking-tight">
              {t('ecossistema.titleStart')}{' '}
              <span className="text-[#FA8400] italic font-medium">{t('ecossistema.titleHighlight')}</span>
            </h2>
            <div className="flex flex-col gap-3.5 justify-center">
              <p className="text-[14px] text-white/70 leading-relaxed">
                {t('ecossistema.p1')}
              </p>
              <p className="text-[14px] text-white/70 leading-relaxed">
                {t('ecossistema.p2')}
              </p>
              <Link
                href="/sobre"
                className="inline-flex items-center text-sm font-semibold text-[#FA8400] hover:text-[#FF9B26] transition-all self-start"
              >
                {t('ecossistema.cta')}
              </Link>
            </div>
          </div>

          {/* Linha do tempo cinematográfica */}
          <div className="mt-10">
            <TimelineCinematic theme="dark" showHeader={false} />
          </div>

        </Container>
      </section>

      {/* ── Ecossistema — 4 pilares ─────────────────────────────────────── */}
      <EcosystemAccordion />

      {/* ══════════════ LIGHT MODE — sessões de conteúdo ══════════════ */}
      <div id="light-section" data-theme="light" className="relative z-10 bg-[#F5F4EF] overflow-hidden">

        {/* ── Camada decorativa global do light mode ─────────────────── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* Washes de cor — orbs muito suaves nas cores da marca */}
          <div className="absolute top-[4%] -left-[12%] w-[800px] h-[800px] rounded-full bg-[#FA8400]/[0.07] blur-[160px]" />
          <div className="absolute top-[26%] -right-[15%] w-[900px] h-[900px] rounded-full bg-[#00C08B]/[0.05] blur-[180px]" />
          <div className="absolute top-[52%] -left-[15%] w-[800px] h-[800px] rounded-full bg-[#004E69]/[0.05] blur-[160px]" />
          <div className="absolute top-[74%] -right-[10%] w-[700px] h-[700px] rounded-full bg-[#FA8400]/[0.06] blur-[150px]" />
          <div className="absolute top-[92%] left-[15%] w-[700px] h-[700px] rounded-full bg-[#00C08B]/[0.04] blur-[160px]" />

          {/* Padrão de pontos sutil */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #0D2E38 1px, transparent 1px)',
              backgroundSize: '36px 36px',
              opacity: 0.06,
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)',
            }}
          />


        </div>

      {/* ── 1. Conheça os programas ───────────────────────────────────── */}
      <Section padding="md" className="overflow-hidden" containerClassName="relative">
          <div className="flex flex-wrap items-end justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-[#FA8400]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                  {t('programas.eyebrow')}
                </span>
              </div>
              <h2 className="font-extrabold text-[#0D2E38] text-display-2xl leading-[1.2] tracking-tight">
                {t('programas.titleStart')} <span className="text-[#FA8400] italic font-medium">{t('programas.titleHighlight')}</span>
              </h2>
              <p className="mt-5 text-[#0D2E38]/65 text-[15px] leading-relaxed max-w-xl">
                {t('programas.desc')}
              </p>
            </div>
            <Link
              href="/programas"
              className="text-sm font-semibold text-[#0D2E38]/70 hover:text-[#FA8400] transition-colors"
            >
              {t('programas.verTodos')}
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: t('programas.items.acelera.name'), pillar: t('programas.pilares.startups'), desc: t('programas.items.acelera.desc'), href: '/programas/acelera-pedra-branca', image: '/acelera-pedrabranca.jpg' },
              { name: t('programas.items.inovacao.name'), pillar: t('programas.pilares.empresas'), desc: t('programas.items.inovacao.desc'), href: '/programas/inovacao-aberta', image: '/imagens-destaques/inaitec2.jpeg' },
              { name: t('programas.items.pesquisa.name'), pillar: t('programas.pilares.universidades'), desc: t('programas.items.pesquisa.desc'), href: '/programas/pesquisa-aplicada', image: '/imagens-destaques/inaitec3.jpg' },
              { name: t('programas.items.catalisa.name'), pillar: t('programas.pilares.investidores'), desc: t('programas.items.catalisa.desc'), href: '/programas/catalisa-inaitec', image: '/imagens-destaques/inaitec4.jpg' },
            ].map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="group rounded-2xl bg-white overflow-hidden flex flex-col hover:shadow-lg hover:shadow-black/[0.06] transition-all"
              >
                <div className="relative h-48 overflow-hidden bg-[#E8E6E1]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FA8400]">
                    {p.pillar}
                  </div>
                  <h3 className="text-[#0D2E38] text-xl font-extrabold leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-[#0D2E38]/60 text-sm leading-relaxed flex-1">
                    {p.desc}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#E8E6E1]">
                    <span className="text-[11px] font-semibold text-[#FA8400] uppercase tracking-widest">
                      {t('programas.saibaMais')}
                    </span>
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F5F4EF] group-hover:bg-[#FA8400] transition-all">
                      <ArrowRight strokeWidth={2.5} className="w-3 h-3 text-[#0D2E38] group-hover:text-white transition-colors" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
      </Section>

      {/* ── 2. Chamadas abertas em destaque ───────────────────────────── */}
      <Section padding="md" className="overflow-hidden" containerClassName="relative">

          {/* Header */}
          <div className="mb-14">
            <h2 className="font-extrabold text-[#0D2E38] text-display-2xl leading-[1.2] tracking-tight">
              {t('chamadas.titleStart')} <span className="text-[#FA8400] italic font-medium">{t('chamadas.titleHighlight')}</span>
            </h2>
            <p className="mt-4 text-[#0D2E38]/65 text-[15px] leading-relaxed max-w-xl">
              {t('chamadas.desc')}
            </p>
          </div>

          <ChamadasAbertasDestaque />

      </Section>

      {/* ── 4. Notícias recentes ──────────────────────────────────────── */}
      <Section padding="md" className="overflow-hidden" containerClassName="relative">
          <div className="flex flex-wrap items-end justify-between gap-8 mb-14">
            <div>
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-[#FA8400]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                  {t('noticias.eyebrow')}
                </span>
              </div>
              <h2 className="font-extrabold text-[#0D2E38] text-display-2xl leading-[1.2] tracking-tight">
                {t('noticias.titleStart')} <span className="text-[#FA8400] italic font-medium">{t('noticias.titleHighlight')}</span>
              </h2>
            </div>
            <Link href="/conteudo" className="text-sm font-semibold text-[#0D2E38]/70 hover:text-[#FA8400] transition-colors">
              {t('noticias.verTodas')}
            </Link>
          </div>

          {(() => {
            const noticiasItems = t.raw('noticias.items') as Array<{ date: string; category: string; title: string; readTime: string }>
            const noticiasImages = ['/acelera-pedrabranca.jpg', '/noticias-2.jpg', '/noticias-3.png', '/noticias-4.jpg', '/noticias-5.jpg']
            const noticias = noticiasItems.map((n, i) => ({ ...n, image: noticiasImages[i] }))
            const [featured, ...rest] = noticias
            return (
              <div className="grid lg:grid-cols-2 gap-4 items-stretch">

                {/* Card destaque — grande, imagem de fundo */}
                <Link
                  href="/conteudo"
                  className="group relative rounded-2xl overflow-hidden min-h-[520px] flex flex-col justify-end"
                >
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative p-8 flex flex-col gap-4">
                    <div className="inline-flex self-start items-center rounded-full bg-[#FA8400] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      {featured.category}
                    </div>
                    <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-tight max-w-md group-hover:text-[#FA8400] transition-colors">
                      {featured.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                      <span>{featured.date}</span>
                      <span className="block w-1 h-1 rounded-full bg-white/30" />
                      <span>{featured.readTime}</span>
                    </div>
                  </div>
                </Link>

                {/* Grid 2×2 (lg) / scroll horizontal (mobile) — igual ao padrão de chamadas */}
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-2 lg:overflow-visible lg:snap-none lg:pb-0">
                  {rest.map((n) => (
                    <Link
                      key={n.title}
                      href="/conteudo"
                      className="group relative snap-start flex-none w-[260px] sm:w-[300px] lg:w-auto rounded-2xl bg-white overflow-hidden hover:shadow-lg hover:shadow-black/[0.04] transition-all flex flex-col"
                    >
                      <div className="relative h-36 overflow-hidden shrink-0">
                        <img
                          src={n.image}
                          alt={n.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 inline-flex items-center rounded-full bg-[#FA8400] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                          {n.category}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col gap-2 flex-1">
                        <h3 className="text-[#0D2E38] text-sm font-extrabold leading-snug group-hover:text-[#FA8400] transition-colors flex-1">
                          {n.title}
                        </h3>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0D2E38]/50">
                          {n.date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            )
          })()}
      </Section>

      {/* ── 5. Traga sua empresa ──────────────────────────────────────── */}
      <TragaSection />

      </div>{/* fecha wrapper light mode */}

      {/* ══════════════ DARK MODE FINAL — form, FAQ, CTA, footer ══════════════ */}

      {/* ── 6. Fale conosco ───────────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden">

        {/* Fundo da seção */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 80% at 60% 50%, #0F3441 0%, transparent 70%)' }} />
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#00C08B]/[0.06] blur-[140px]" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#FA8400]/[0.07] blur-[140px]" />
        </div>

        <Container className="relative">
          <div className="grid lg:grid-cols-[42%_58%] gap-8 min-h-[700px]">

            {/* Esquerda — foto + quote (um card único no mobile) */}
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 lg:bg-transparent lg:border-0 lg:min-h-0">
              {/* Imagem — aspect ratio no mobile, fills column no desktop */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-0">
                <img
                  src="/form-image.jpg"
                  alt={t('contato.imageAlt')}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2E38] via-[#0D2E38]/30 to-transparent" />
              </div>

              {/* Quote — parte do mesmo card no mobile, overlay no desktop */}
              <div className="p-6 flex flex-col gap-4 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:m-8 lg:p-6 lg:rounded-2xl lg:bg-white/10 lg:backdrop-blur-md lg:border lg:border-white/15">
                <p className="text-white text-[13px] leading-relaxed">
                  &ldquo;{t('contato.quote.text')}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold text-sm">{t('contato.quote.author')}</div>
                    <div className="text-white/55 text-[11px] mt-0.5">{t('contato.quote.role')}</div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array(5).fill(null).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#FA8400]" fill="currentColor" stroke="none" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Direita — formulário */}
            <div className="px-0 py-6 sm:p-8 lg:p-14 flex flex-col">
              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2">
                  <span className="block h-px w-8 bg-[#FA8400]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                    {t('contato.eyebrow')}
                  </span>
                </div>
                <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                  {t('contato.titleStart')} <span className="text-[#FA8400] italic font-medium">{t('contato.titleHighlight')}</span>?
                </h2>
                <p className="mt-3 text-white/55 text-sm leading-relaxed">
                  {t('contato.descPrefix')}{' '}
                  <a href="mailto:contato@inaitec.com.br" className="text-[#FA8400] hover:underline">
                    contato@inaitec.com.br
                  </a>
                </p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">{t('contato.labels.nome')}</label>
                    <input
                      type="text"
                      placeholder={t('contato.placeholders.nome')}
                      className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#FA8400]/60 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">{t('contato.labels.sobrenome')}</label>
                    <input
                      type="text"
                      placeholder={t('contato.placeholders.sobrenome')}
                      className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#FA8400]/60 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">{t('contato.labels.email')}</label>
                    <input
                      type="email"
                      placeholder={t('contato.placeholders.email')}
                      className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#FA8400]/60 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">{t('contato.labels.telefone')}</label>
                    <input
                      type="tel"
                      placeholder={t('contato.placeholders.telefone')}
                      className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#FA8400]/60 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">{t('contato.labels.mensagem')}</label>
                  <textarea
                    rows={3}
                    placeholder={t('contato.placeholders.mensagem')}
                    className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#FA8400]/60 transition-all resize-none"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">{t('contato.labels.perfil')}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['startup', 'grande', 'universidade', 'investidor', 'aceleracao', 'outro'] as const).map((key) => (
                      <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
                        <div className="relative shrink-0 w-[18px] h-[18px]">
                          <input
                            type="checkbox"
                            className="peer appearance-none w-full h-full rounded-[4px] bg-white/[0.06] border border-white/10 checked:bg-[#FA8400] checked:border-[#FA8400] cursor-pointer transition-all"
                          />
                          <Check
                            strokeWidth={2.5}
                            className="pointer-events-none absolute inset-0 w-full h-full text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                          />
                        </div>
                        <span className="text-[12px] text-white/55 group-hover:text-white/80 transition-colors">
                          {t(`contato.perfis.${key}`)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-[#FA8400] text-white text-sm font-bold py-4 hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
                >
                  {t('contato.submit')}
                </button>
              </form>
            </div>

          </div>
        </Container>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────────────────────── */}
      <FaqSection />

      {/* ── 8. CTA Banner ────────────────────────────────────────────── */}
      <Section padding="md">
        <div
          className="relative rounded-2xl overflow-hidden px-8 py-10 sm:px-12 sm:py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 ring-1 ring-white/15 shadow-2xl shadow-black/30"
          style={{
            background: 'linear-gradient(135deg, #144556 0%, #0F3441 45%, #0D2E38 100%)',
          }}
        >

          {/* Glow laranja principal (bottom-left) */}
          <div className="pointer-events-none absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-[#FA8400]/25 blur-[120px]" />

          {/* Glow secundário teal (top-right) */}
          <div className="pointer-events-none absolute -top-40 -right-32 w-[450px] h-[450px] rounded-full bg-[#00C08B]/15 blur-[120px]" />

          {/* Highlight superior — dá profundidade ao card */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          {/* Texto */}
          <div className="relative max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FA8400]">
                {t('ctaBanner.eyebrow')}
              </span>
            </div>
            <h2 className="font-extrabold text-white text-[1.85rem] md:text-[2.4rem] leading-[1.2] tracking-tight">
              {t('ctaBanner.titleStart')}{' '}
              <span className="text-[#FA8400] italic font-medium">{t('ctaBanner.titleHighlight')}</span>{' '}
              {t('ctaBanner.titleEnd')}
            </h2>
            <p className="mt-4 text-white/65 text-sm leading-relaxed">
              {t('ctaBanner.desc')}
            </p>
          </div>

          {/* Botões */}
          <div className="relative w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:shrink-0">
            <Link
              href="/fale-conosco"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FA8400] text-white text-sm font-bold px-7 py-4 hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
            >
              {t('ctaBanner.ctaPrimary')}
            </Link>
            <Link
              href="/programas"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/15 hover:border-white/40 transition-all"
            >
              {t('ctaBanner.ctaSecondary')}
            </Link>
          </div>

        </div>
      </Section>

    </main>
  )
}

function FaqSection() {
  const t = useTranslations('Home')
  const [open, setOpen] = useState<number | null>(0)
  const faqs = t.raw('faq.items') as Array<{ q: string; a: string }>
  return (
    <section className="relative py-16 overflow-hidden">

      {/* Ambiente de fundo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-[#004E69]/30 blur-[140px]" />
      </div>

      <Container className="relative">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          <div className="lg:sticky lg:top-24">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">{t('faq.eyebrow')}</span>
            </div>
            <h2 className="font-extrabold text-white text-[2.5rem] leading-[1.2] tracking-tight">
              {t('faq.titleStart')} <span className="text-[#FA8400] italic font-medium">{t('faq.titleHighlight')}</span>
            </h2>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">
              {t('faq.desc')}
            </p>
            <Link
              href="/fale-conosco"
              className="mt-6 inline-flex items-center text-sm font-semibold text-[#FA8400] hover:text-[#FF9B26] transition-all"
            >
              {t('faq.cta')}
            </Link>
          </div>

          <div>
            {faqs.map((item, i) => {
              const isOpen = open === i
              const isFirst = i === 0
              const isLast = i === faqs.length - 1
              return (
                <div
                  key={i}
                  className={[
                    'border-b border-white/[0.06] last:border-b-0 transition-all duration-300',
                    isOpen ? 'bg-white/[0.02]' : 'hover:bg-white/[0.015]',
                    isOpen && isFirst ? 'rounded-t-2xl' : '',
                    isOpen && isLast ? 'rounded-b-2xl' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-4 py-5 sm:px-7 sm:py-6 text-left group"
                  >
                    <span className={`text-[16px] font-semibold transition-colors ${isOpen ? 'text-white' : 'text-white/85 group-hover:text-white'}`}>
                      {item.q}
                    </span>
                    <span className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#FA8400] text-white rotate-45 shadow-lg shadow-[#FA8400]/30' : 'bg-white/[0.08] text-white/70 group-hover:bg-white/15 group-hover:text-white border border-white/10'}`}>
                      <Plus strokeWidth={2.5} className="w-3.5 h-3.5" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-7 sm:pb-6 -mt-2">
                      <p className="text-sm text-white/65 leading-relaxed max-w-2xl">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </Container>
    </section>
  )
}

type CaseMetric = { label: string; value: string }
type CaseTranslated = {
  company: string
  sector: string
  quote: string
  person: string
  role: string
  metrics: CaseMetric[]
}
type CaseFull = CaseTranslated & { logo: string; photo: string; accent: string }

const CASE_ASSETS = [
  {
    logo: '/logo1.png',
    photo: '/imagens-pessoas/close-up-labor-union-member%201.png',
    accent: '#FA8400',
  },
  {
    logo: '/logo2.png',
    photo: '/imagens-pessoas/low-angle-businessman%201.png',
    accent: '#00C08B',
  },
  {
    logo: '/logo3.png',
    photo: '/imagens-pessoas/portrait-smiling-man-sitting-cafe-bar-with-his-laptop-computer%201.png',
    accent: '#FFB560',
  },
  {
    logo: '/logo1.png',
    photo: '/imagens-pessoas/portrait-smiling-businesswoman-with-arms-crossed-smiling-looking-away-office%201.png',
    accent: '#004E69',
  },
] as const

const partnerLogos = [
  { src: '/logos/logo-hubspot.png', alt: 'HubSpot' },
  { src: '/logos/logo-ibm.png', alt: 'IBM' },
  { src: '/logos/logo-influx%201.png', alt: 'InfluxDB' },
  { src: '/logos/logo-miro%201.png', alt: 'Miro' },
  { src: '/logos/logo-notion%201.png', alt: 'Notion' },
  { src: '/logos/logo-pipedrive%201.png', alt: 'Pipedrive' },
  { src: '/logos/logo-tally%201.png', alt: 'Tally' },
  { src: '/logos/logo-zendesk%201.png', alt: 'Zendesk' },
]

function TragaSection() {
  const t = useTranslations('Home')
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(true)

  const translatedCases = t.raw('resultados.items') as CaseTranslated[]
  const cases: CaseFull[] = translatedCases.map((c, i) => ({
    ...c,
    logo: CASE_ASSETS[i]?.logo ?? '/logo1.png',
    photo: CASE_ASSETS[i]?.photo ?? '',
    accent: CASE_ASSETS[i]?.accent ?? '#FA8400',
  }))

  const goTo = (resolver: (current: number) => number) => {
    setVisible(false)
    setTimeout(() => {
      setActive((i) => resolver(i))
      setVisible(true)
    }, 400)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((i) => (i + 1) % cases.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [cases.length])

  const c = cases[active]

  return (
    <Section padding="md" className="overflow-hidden" containerClassName="relative">

        {/* Header */}
        <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                {t('resultados.eyebrow')}
              </span>
            </div>
            <h2 className="font-extrabold text-[#0D2E38] text-display-2xl leading-[1.2] tracking-tight">
              {t('resultados.titleStart')}{' '}
              <span className="text-[#FA8400] italic font-medium">{t('resultados.titleHighlight')}</span>
            </h2>
          </div>
          <Link
            href="/traga-sua-empresa"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FA8400] text-white text-sm font-semibold px-7 py-4 hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25 shrink-0"
          >
            {t('resultados.ctaInstalar')}
          </Link>
        </div>

        {/* Mobile: 1 card consolidado por empresa em scroll horizontal */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {cases.map((caseItem) => (
            <article
              key={caseItem.company}
              className="snap-start shrink-0 w-[88%] sm:w-[420px] rounded-2xl bg-[#0D2E38] p-7 flex flex-col gap-6"
            >
              {/* Pessoa */}
              <div className="flex items-center gap-4">
                <img
                  src={caseItem.photo}
                  alt={caseItem.person}
                  className="w-14 h-14 rounded-full object-cover object-top shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-white font-bold text-base leading-tight truncate">
                    {caseItem.person}
                  </div>
                  <div className="text-white/55 text-sm mt-0.5 truncate">
                    {caseItem.role}
                  </div>
                </div>
              </div>

              {/* Logo */}
              <img
                src={caseItem.logo}
                alt={caseItem.company}
                className="h-7 w-auto object-contain object-left brightness-0 invert opacity-90"
              />

              {/* Quote */}
              <p className="text-white/80 text-[14px] leading-relaxed">
                "{caseItem.quote}"
              </p>

              {/* Métricas — divididas por linha */}
              <div className="divide-y divide-white/10 border-t border-white/10 -mx-1">
                {caseItem.metrics.map((m) => (
                  <div key={m.label} className="px-1 py-4">
                    <div className="text-white font-bold text-[14px] leading-snug">
                      {m.label}
                    </div>
                    <div className="text-white/50 text-[12px] mt-0.5">
                      {t('resultados.yearRange')}
                    </div>
                    <div className="text-white text-[1.75rem] font-extrabold leading-none tracking-tight mt-3 whitespace-nowrap">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Desktop (md+): grid 2x2 ou 1x4 — mostra apenas o caso ativo */}
        <div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch transition-opacity duration-400"
          style={{ opacity: visible ? 1 : 0 }}
        >

          {/* Card foto */}
          <div className="relative rounded-2xl overflow-hidden bg-white min-h-[380px]">
            <img
              src={c.photo}
              alt={c.person}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>

          {/* Card quote escuro */}
          <div className="rounded-2xl bg-[#0D2E38] p-7 flex flex-col gap-5 min-h-[380px]">
            <img
              src={c.logo}
              alt={c.company}
              className="h-7 w-auto object-contain object-left brightness-0 invert opacity-90"
            />
            <p className="text-white/80 text-[14px] leading-relaxed flex-1">
              "{c.quote}"
            </p>
            <div className="pt-5 border-t border-white/10">
              <div className="text-white font-bold text-sm">{c.person}</div>
              <div className="text-white/50 text-[12px] mt-0.5">{c.role}</div>
            </div>
          </div>

          {/* Métricas */}
          {c.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl bg-white p-7 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="text-[#0D2E38] font-bold text-[15px] leading-snug">
                  {m.label}
                </div>
                <div className="text-[#0D2E38]/50 text-[13px] mt-1">
                  {t('resultados.yearRange')}
                </div>
              </div>
              <div className="text-[#FA8400] text-[3.5rem] font-extrabold leading-none tracking-tight">
                {m.value}
              </div>
            </div>
          ))}

        </div>

        {/* Indicadores + navegação (só desktop — mobile usa scroll) */}
        <div className="hidden md:flex items-center justify-between mt-5">
          <div className="flex gap-2">
            {cases.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(() => i)}
                className={`h-1 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-[#FA8400]' : 'w-4 bg-[#0D2E38]/20 hover:bg-[#0D2E38]/40'}`}
                aria-label={cases[i].company}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => goTo((i) => (i - 1 + cases.length) % cases.length)}
              aria-label={t('resultados.prevAria')}
              className="w-10 h-10 rounded-full border border-[#E8E6E1] flex items-center justify-center text-[#004E69] hover:border-[#FA8400] hover:text-[#FA8400] hover:bg-[#FA8400]/5 transition-all"
            >
              <ChevronLeft strokeWidth={2.5} className="w-4 h-4" />
            </button>
            <button
              onClick={() => goTo((i) => (i + 1) % cases.length)}
              aria-label={t('resultados.nextAria')}
              className="w-10 h-10 rounded-full border border-[#E8E6E1] flex items-center justify-center text-[#004E69] hover:border-[#FA8400] hover:text-[#FA8400] hover:bg-[#FA8400]/5 transition-all"
            >
              <ChevronRight strokeWidth={2.5} className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Logos parceiros */}
        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:gap-0 md:overflow-hidden">

          {/* Título */}
          <div className="md:shrink-0 md:w-[38%] md:pr-8">
            <p className="text-[#0D2E38] font-extrabold text-[1.4rem] md:text-[1.6rem] leading-tight tracking-tight">
              {t('resultados.ctaPartnersStart')}{' '}
              <span className="text-[#FA8400] italic font-medium">{t('resultados.ctaPartnersHighlight')}</span>
            </p>
          </div>

          {/* Marquee com fade */}
          <div
            className="overflow-hidden md:flex-1"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
          >
            <div className="flex animate-marquee gap-10 items-center w-max">
              {[...partnerLogos, ...partnerLogos].map((l, i) => (
                <img
                  key={i}
                  src={l.src}
                  alt={l.alt}
                  className="h-6 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all shrink-0"
                />
              ))}
            </div>
          </div>

        </div>

      </Section>
  )
}

