'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { POSTS } from '@/data/conteudo'
import { Section } from '@/components/Section'

const CATEGORIAS = ['Todos', 'Notícias', 'Cases', 'Conquistas', 'Eventos']

export default function ConteudoHub() {
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return POSTS.filter(
      (p) =>
        (activeFilter === 'Todos' || p.categoria === activeFilter) &&
        (q === '' ||
          p.titulo.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q))
    )
  }, [activeFilter, query])

  const isSearching = query.trim() !== ''
  const destaque = POSTS.find((p) => p.destaque)!
  // Durante a busca, o destaque some e entra nos resultados (se casar com a query)
  const grid = isSearching ? filtered : filtered.filter((p) => !p.destaque)

  return (
    <>
      {/* ── Hero ── */}
      <Section padding="none" className="bg-[#0D2E38] pt-[108px] pb-16">
          <div className="mx-auto max-w-2xl text-center pt-14 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
              Portal de Conteúdo
            </span>
            <h1 className="mt-4 font-extrabold text-white text-display-xl leading-[1.15] tracking-tight">
              Notícias, cases e histórias<br />do ecossistema.
            </h1>
            <p className="mt-4 text-white/50 text-[15px]">
              Acompanhe tudo que acontece no hub de inovação do Parque Pedra Branca.
            </p>

            {/* Search */}
            <div className="mt-8 flex gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search
                  strokeWidth={2}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
                />
                <input
                  type="text"
                  placeholder="Buscar conteúdo..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#FA8400]/50 focus:bg-white/[0.12] transition-all"
                />
              </div>
              <button
                className="px-6 py-3.5 rounded-full bg-[#FA8400] text-white text-sm font-semibold hover:bg-[#FF9B26] transition-colors shrink-0"
              >
                Buscar
              </button>
            </div>
          </div>
      </Section>

      {/* ── Conteúdo ── */}
      <Section theme="light" padding="md">

          {/* Post destaque — escondido durante a busca */}
          {!isSearching && (
          <article className="group mb-10 rounded-3xl overflow-hidden border border-[#E8E6E1] bg-white hover:border-[#FA8400]/25 hover:shadow-2xl hover:shadow-black/[0.08] transition-all duration-300">
            <div className="grid lg:grid-cols-[1.6fr_1fr] items-stretch">
              <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[480px]">
                <Image
                  src={destaque.imagem}
                  alt={destaque.titulo}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
              </div>
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center rounded-full bg-[#FA8400]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                    {destaque.categoria}
                  </span>
                </div>
                <h2 className="font-extrabold text-[#0D2E38] text-display-lg leading-snug mb-5">
                  {destaque.titulo}
                </h2>
                <p className="text-[#0D2E38]/60 text-base leading-relaxed mb-10">
                  {destaque.excerpt}
                </p>
                {/* Autor */}
                <Link
                  href={`/conteudo/autor/${destaque.autor.slug}`}
                  className="group/autor flex items-center gap-3 mb-8"
                >
                  <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#E8E6E1] shrink-0">
                    <Image src={destaque.autor.foto} alt={destaque.autor.nome} fill className="object-cover" sizes="36px" />
                  </div>
                  <div>
                    <div className="text-[#0D2E38] text-[13px] font-semibold leading-tight group-hover/autor:text-[#FA8400] transition-colors">
                      {destaque.autor.nome}
                    </div>
                    <div className="text-[#0D2E38]/45 text-[11px]">{destaque.data}</div>
                  </div>
                </Link>

                <Link
                  href={`/conteudo/${destaque.slug}`}
                  className="inline-flex items-center text-sm font-bold text-[#FA8400] hover:text-[#FF9B26] transition-all duration-200"
                >
                  Ler artigo completo
                </Link>
              </div>
            </div>
          </article>
          )}

          {!isSearching && <hr className="border-[#E8E6E1] mb-10" />}

          {/* Últimas publicações / Resultados da busca */}
          <h2 className="font-extrabold text-[#0D2E38] text-[1.5rem] md:text-[1.75rem] tracking-tight mb-5">
            {isSearching ? 'Resultados da busca' : 'Últimas publicações'}
          </h2>
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-[#0D2E38] text-white shadow-md'
                    : 'bg-white text-[#0D2E38]/55 hover:text-[#0D2E38]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid de posts */}
          {grid.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {grid.map((post) => (
                <Link
                  key={post.id}
                  href={`/conteudo/${post.slug}`}
                  className="group rounded-2xl overflow-hidden border border-[#E8E6E1] bg-white hover:border-[#FA8400]/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.06] transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.imagem}
                      alt={post.titulo}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center rounded-full bg-[#FA8400]/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                        {post.categoria}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-[#0D2E38] text-[15px] leading-snug mb-2 group-hover:text-[#FA8400] transition-colors duration-200">
                      {post.titulo}
                    </h3>
                    <p className="text-[#0D2E38]/55 text-sm leading-relaxed line-clamp-2 mb-5">
                      {post.excerpt}
                    </p>
                    <div className="pt-4 border-t border-[#E8E6E1] flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0">
                        <Image src={post.autor.foto} alt={post.autor.nome} fill className="object-cover" sizes="28px" />
                      </div>
                      <div>
                        <div className="text-[12px] font-medium text-[#0D2E38]/65 truncate leading-tight">
                          {post.autor.nome}
                        </div>
                        <div className="text-[11px] text-[#0D2E38]/40 leading-tight mt-0.5">
                          {post.data}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-[#0D2E38]/40 text-sm">
              Nenhum resultado encontrado.
            </div>
          )}
      </Section>
    </>
  )
}
