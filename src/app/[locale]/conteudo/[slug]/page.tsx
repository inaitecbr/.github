import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Section, Container } from '@/components/Section'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import CtaBannerSection from '@/components/CtaBannerSection'
import { getPost, getPostSlugs } from '@/sanity/queries/posts'
import { getCtaBanner } from '@/sanity/queries/ctaBanner'
import { urlFor } from '@/sanity/image'
import { formatPostDate } from '@/lib/formatPostDate'

type Props = { params: Promise<{ slug: string; locale: string }> }

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await getPost({ slug, locale })
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function ArtigoPage({ params }: Props) {
  const { slug, locale } = await params
  const [post, ctaBanner, t] = await Promise.all([
    getPost({ slug, locale }),
    getCtaBanner({ locale }),
    getTranslations('ConteudoArtigo'),
  ])
  if (!post) notFound()

  const relacionados = post.relacionados ?? []
  const shareUrl = `https://inaitec.com.br/conteudo/${post.slug}`

  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-brand-navy pt-[108px] pb-16">
        <Container>
          <div className="max-w-3xl pt-14 pb-16">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] text-white/40 mb-8">
              <Link href="/conteudo" className="hover:text-white/70 transition-colors">
                {t('breadcrumb')}
              </Link>
              {post.category && (
                <>
                  <span>/</span>
                  <span className="text-brand-orange">{post.category}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3 mb-6">
              {post.category && (
                <span className="inline-flex items-center rounded-full bg-brand-orange/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                  {post.category}
                </span>
              )}
              <span className="text-[12px] text-white/35">{formatPostDate(post.publishedAt)}</span>
            </div>

            <h1 className="font-extrabold text-white text-display-xl leading-[1.1] tracking-tight mb-8">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-white/60 text-lg leading-relaxed mb-10">{post.excerpt}</p>
            )}

            {post.author && (
              <div className="flex items-center gap-3 text-sm">
                <span className="text-white font-semibold">{post.author}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/45 text-[13px]">Inaitec</span>
              </div>
            )}
          </div>
        </Container>

        {post.mainImage && (
          <Container>
            <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[21/9] rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                src={urlFor(post.mainImage).width(1600).height(700).fit('crop').url()}
                alt={post.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent" />
            </div>
          </Container>
        )}
      </section>

      {/* ── Corpo do artigo ── */}
      <Section theme="light" padding="md">
        <div className="grid lg:grid-cols-[1fr_320px] gap-16 items-start">
          <article className="prose-custom max-w-none">
            {post.body && <PortableTextRenderer value={post.body} />}
          </article>

          <aside className="sticky top-28 space-y-8">
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/40 mb-4">
                {t('share.title')}
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[11px] font-semibold text-brand-navy/60 hover:border-[#0077B5] hover:text-[#0077B5] transition-all"
                >
                  {t('share.linkedin')}
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[11px] font-semibold text-brand-navy/60 hover:border-brand-navy hover:text-brand-navy transition-all"
                >
                  {t('share.twitter')}
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
              {t('related')}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relacionados.map((r) => (
                <Link
                  key={r.slug}
                  href={`/conteudo/${r.slug}`}
                  className="group rounded-2xl overflow-hidden border border-border bg-surface-soft hover:border-brand-orange/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/6 transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {r.mainImage && (
                      <Image
                        src={urlFor(r.mainImage).width(600).height(338).fit('crop').url()}
                        alt={r.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {r.category && (
                        <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                          {r.category}
                        </span>
                      )}
                      <span className="text-[11px] text-brand-navy/40">
                        {formatPostDate(r.publishedAt)}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-brand-navy text-[15px] leading-snug mb-2 group-hover:text-brand-orange transition-colors duration-200">
                      {r.title}
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

      {/* ── CTA — sempre do Sanity ── */}
      <CtaBannerSection data={ctaBanner} />
    </main>
  )
}
