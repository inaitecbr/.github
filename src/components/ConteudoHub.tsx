'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/Section'
import { urlFor } from '@/sanity/image'
import { formatPostDate } from '@/lib/formatPostDate'
import type { PostListItem } from '@/sanity/queries/posts'
import type { PortalConteudoHero } from '@/sanity/queries/portalConteudo'

const PAGE_SIZE = 9

export default function ConteudoHub({ posts, hero }: { posts: PostListItem[]; hero?: PortalConteudoHero }) {
  const t = useTranslations('Conteudo')

  const CATEGORIAS = [
    { key: 'Todos', label: t('filters.all') },
    { key: 'Notícias', label: t('filters.news') },
    { key: 'Cases', label: t('filters.cases') },
    { key: 'Conquistas', label: t('filters.achievements') },
    { key: 'Eventos', label: t('filters.events') },
  ]

  const [activeFilter, setActiveFilter] = useState('Todos')
  const [query, setQuery] = useState('') // texto no input
  const [searchTerm, setSearchTerm] = useState('') // busca confirmada (ao clicar/Enter)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Reseta a paginação ao trocar de filtro ou refazer a busca.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [activeFilter, searchTerm])

  const handleSearch = () => setSearchTerm(query.trim())

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase()
    return posts.filter(
      (p) =>
        (activeFilter === 'Todos' || p.category === activeFilter) &&
        (q === '' ||
          p.title.toLowerCase().includes(q) ||
          (p.excerpt || '').toLowerCase().includes(q))
    )
  }, [posts, activeFilter, searchTerm])

  const isSearching = searchTerm.trim() !== ''
  const destaque = posts.find((p) => p.featured) ?? posts[0]
  // Durante a busca, o destaque some e entra nos resultados (se casar com a query)
  const grid = isSearching ? filtered : filtered.filter((p) => p.slug !== destaque?.slug)
  const visible = grid.slice(0, visibleCount)

  return (
    <>
      {/* ── Hero ── */}
      <Section padding="none" className="bg-brand-navy pt-[108px] pb-16">
          <div className="mx-auto max-w-2xl text-center pt-14 pb-4">
            {hero?.eyebrow && (
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {hero.eyebrow}
              </span>
            )}
            <h1 className="mt-4 font-extrabold text-white text-display-xl leading-[1.15] tracking-tight">
              {hero?.titleStart && <>{hero.titleStart}<br /></>}
              {hero?.titleHighlight && (
                <span className="italic font-medium text-brand-orange">{hero.titleHighlight}</span>
              )}
            </h1>
            {hero?.desc && (
              <p className="mt-4 text-white/50 text-[15px]">{hero.desc}</p>
            )}

            {/* Search */}
            <div className="mt-8 flex gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search
                  strokeWidth={2}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
                />
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch()
                  }}
                  className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-orange/50 focus:bg-white/[0.12] transition-all"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-3.5 rounded-full bg-brand-orange text-white text-sm font-semibold hover:bg-[#FF9B26] transition-colors shrink-0"
              >
                {t('search.button')}
              </button>
            </div>
          </div>
      </Section>

      {/* ── Conteúdo ── */}
      <Section theme="light" padding="md">

          {/* Post destaque — escondido durante a busca */}
          {!isSearching && destaque && (
          <article className="group mb-10 rounded-3xl overflow-hidden border border-border bg-white hover:border-brand-orange/25 hover:shadow-2xl hover:shadow-black/[0.08] transition-all duration-300">
            <div className="grid lg:grid-cols-[1.6fr_1fr] items-stretch">
              <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[480px]">
                {destaque.mainImage && (
                  <Image
                    src={urlFor(destaque.mainImage).width(1200).height(800).fit('crop').url()}
                    alt={destaque.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
              </div>
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  {destaque.category && (
                    <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                      {destaque.category}
                    </span>
                  )}
                </div>
                <h2 className="font-extrabold text-brand-navy text-display-lg leading-snug mb-5">
                  {destaque.title}
                </h2>
                <p className="text-brand-navy/60 text-base leading-relaxed mb-10">
                  {destaque.excerpt}
                </p>
                {/* Autor + data */}
                <div className="flex items-center gap-2 mb-8 text-[13px]">
                  {destaque.author && (
                    <span className="font-semibold text-brand-navy">{destaque.author}</span>
                  )}
                  {destaque.author && <span className="text-brand-navy/30">·</span>}
                  <span className="text-brand-navy/45">{formatPostDate(destaque.publishedAt)}</span>
                </div>

                <Link
                  href={`/conteudo/${destaque.slug}`}
                  className="inline-flex items-center text-sm font-bold text-brand-orange hover:text-[#FF9B26] transition-all duration-200"
                >
                  Ler artigo completo
                </Link>
              </div>
            </div>
          </article>
          )}

          {!isSearching && <hr className="border-border mb-10" />}

          {/* Últimas publicações / Resultados da busca */}
          <h2 className="font-extrabold text-brand-navy text-[1.5rem] md:text-[1.75rem] tracking-tight mb-5">
            {isSearching ? t('grid.searchResults') : t('grid.latestPosts')}
          </h2>
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIAS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeFilter === key
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'bg-white text-brand-navy/55 hover:text-brand-navy'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Grid de posts */}
          {grid.length > 0 ? (
            <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((post) => (
                <Link
                  key={post.slug}
                  href={`/conteudo/${post.slug}`}
                  className="group rounded-2xl overflow-hidden border border-border bg-white hover:border-brand-orange/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.06] transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {post.mainImage && (
                      <Image
                        src={urlFor(post.mainImage).width(800).height(450).fit('crop').url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && (
                        <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-brand-navy text-[15px] leading-snug mb-2 group-hover:text-brand-orange transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-brand-navy/55 text-sm leading-relaxed line-clamp-2 mb-5">
                      {post.excerpt}
                    </p>
                    <div className="pt-4 border-t border-border flex items-center gap-2 text-[12px]">
                      {post.author && (
                        <span className="font-medium text-brand-navy/65 truncate leading-tight">
                          {post.author}
                        </span>
                      )}
                      {post.author && <span className="text-brand-navy/25">·</span>}
                      <span className="text-brand-navy/40 leading-tight">
                        {formatPostDate(post.publishedAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Carregar mais */}
            {grid.length > visibleCount && (
              <div className="mt-12 flex flex-col items-center gap-3">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="rounded-full bg-brand-navy text-white text-sm font-semibold px-8 py-3.5 hover:bg-brand-navy/90 transition-colors"
                >
                  {t('grid.loadMore')}
                </button>
                <span className="text-[12px] text-brand-navy/40">
                  {t('grid.showing', { visible: visible.length, total: grid.length })}
                </span>
              </div>
            )}
            </>
          ) : (
            <div className="py-20 text-center text-brand-navy/40 text-sm">
              {t('grid.noResults')}
            </div>
          )}
      </Section>
    </>
  )
}
