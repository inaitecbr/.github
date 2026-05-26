import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { POSTS } from '@/data/conteudo'
import { Section, Container } from '@/components/Section'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: post.titulo, description: post.excerpt }
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const relacionados = POSTS.filter(
    (p) => p.slug !== slug && p.categoria === post.categoria
  ).slice(0, 3)

  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-brand-navy pt-[108px] pb-16">
        <Container>
          <div className="max-w-3xl pt-14 pb-16">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] text-white/40 mb-8">
              <Link href="/conteudo" className="hover:text-white/70 transition-colors">
                Portal de Conteúdo
              </Link>
              <span>/</span>
              <span className="text-brand-orange">{post.categoria}</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center rounded-full bg-brand-orange/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {post.categoria}
              </span>
              <span className="text-[12px] text-white/35">{post.data}</span>
            </div>

            <h1 className="font-extrabold text-white text-display-xl leading-[1.1] tracking-tight mb-8">
              {post.titulo}
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-10">
              {post.excerpt}
            </p>

            {/* Autor */}
            <Link
              href={`/conteudo/autor/${post.autor.slug}`}
              className="group/autor flex items-center gap-4 pb-1"
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/10 shrink-0">
                <Image
                  src={post.autor.foto}
                  alt={post.autor.nome}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div>
                <div className="text-white text-sm font-semibold leading-tight group-hover/autor:text-brand-orange transition-colors">
                  {post.autor.nome}
                </div>
                <div className="text-white/45 text-[11px] mt-0.5">{post.autor.cargo} · Inaitec</div>
              </div>
            </Link>
          </div>
        </Container>

        {/* Imagem hero — full width, colada no fim da seção escura */}
        <Container>
          <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[21/9] rounded-2xl lg:rounded-3xl overflow-hidden">
            <Image
              src={post.imagem}
              alt={post.titulo}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent" />
          </div>
        </Container>
      </section>

      {/* ── Corpo do artigo ── */}
      <Section theme="light" padding="md">
          <div className="grid lg:grid-cols-[1fr_320px] gap-16 items-start">

            {/* Texto */}
            <article className="prose-custom max-w-none">
              {post.corpo.map((paragrafo, i) => (
                <p
                  key={i}
                  className="text-brand-navy/80 text-[1.0625rem] leading-[1.85] mb-6 last:mb-0"
                >
                  {paragrafo}
                </p>
              ))}
            </article>

            {/* Sidebar */}
            <aside className="sticky top-28 space-y-8">
              {/* Card do autor */}
              <div className="rounded-2xl border border-border bg-white p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/40 mb-4">
                  Sobre o autor
                </div>
                <Link
                  href={`/conteudo/autor/${post.autor.slug}`}
                  className="group/autor flex items-center gap-3 mb-4"
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={post.autor.foto}
                      alt={post.autor.nome}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-brand-navy text-sm leading-tight group-hover/autor:text-brand-orange transition-colors">
                      {post.autor.nome}
                    </div>
                    <div className="text-brand-navy/50 text-[11px] mt-0.5">{post.autor.cargo}</div>
                  </div>
                </Link>
                <p className="text-brand-navy/55 text-[13px] leading-relaxed mb-4">
                  {post.autor.bio}
                </p>
                <Link
                  href={`/conteudo/autor/${post.autor.slug}`}
                  className="text-[12px] font-semibold text-brand-orange hover:underline"
                >
                  Ver todas as publicações
                </Link>
              </div>

              {/* Compartilhar */}
              <div className="rounded-2xl border border-border bg-white p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/40 mb-4">
                  Compartilhar
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://inaitec.com.br/conteudo/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[11px] font-semibold text-brand-navy/60 hover:border-[#0077B5] hover:text-[#0077B5] transition-all"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://inaitec.com.br/conteudo/${post.slug}`)}&text=${encodeURIComponent(post.titulo)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[11px] font-semibold text-brand-navy/60 hover:border-brand-navy hover:text-brand-navy transition-all"
                  >
                    X / Twitter
                  </a>
                </div>
              </div>
            </aside>
          </div>
      </Section>

      {/* ── Leia também ── */}
      {relacionados.length > 0 && (
        <section data-theme="light" className="bg-white py-16">
          <Container>
            <h2 className="font-extrabold text-brand-navy text-[1.5rem] md:text-[1.75rem] tracking-tight mb-8">
              Leia também
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relacionados.map((r) => (
                <Link
                  key={r.id}
                  href={`/conteudo/${r.slug}`}
                  className="group rounded-2xl overflow-hidden border border-border bg-[#F5F4EF] hover:border-brand-orange/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.06] transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={r.imagem}
                      alt={r.titulo}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                        {r.categoria}
                      </span>
                      <span className="text-[11px] text-brand-navy/40">{r.data}</span>
                    </div>
                    <h3 className="font-extrabold text-brand-navy text-[15px] leading-snug mb-2 group-hover:text-brand-orange transition-colors duration-200">
                      {r.titulo}
                    </h3>
                    <p className="text-brand-navy/55 text-sm leading-relaxed line-clamp-2">
                      {r.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── CTA ── */}
      <Section padding="md" className="bg-brand-navy">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-navy via-[#004E69] to-brand-navy p-8 sm:p-12 md:p-20">
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-brand-orange/20 blur-[140px]" />
            <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-brand-teal/10 blur-[120px]" />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                  Quer fazer parte das{' '}
                  <span className="italic font-medium text-brand-orange">próximas histórias</span>?
                </h2>
                <p className="mt-6 text-white/65 text-base leading-relaxed">
                  Conheça os programas de aceleração e descubra como o Inaitec pode impulsionar
                  o crescimento da sua startup ou empresa.
                </p>
              </div>
              <div className="w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:shrink-0">
                <Link
                  href="/programas"
                  className="inline-flex items-center justify-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
                >
                  Ver programas
                </Link>
                <Link
                  href="/fale-conosco"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Fale conosco
                </Link>
              </div>
            </div>
          </div>
      </Section>
    </main>
  )
}
