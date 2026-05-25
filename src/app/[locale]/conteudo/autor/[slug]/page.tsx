import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FileText } from 'lucide-react'
import { AUTORES, POSTS } from '@/data/conteudo'
import { Section } from '@/components/Section'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(AUTORES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const autor = AUTORES[slug]
  if (!autor) return {}
  return {
    title: autor.nome,
    description: `Artigos escritos por ${autor.nome}, ${autor.cargo} no Inaitec.`,
  }
}

export default async function AutorPage({ params }: Props) {
  const { slug } = await params
  const autor = AUTORES[slug]
  if (!autor) notFound()

  const artigos = POSTS.filter((p) => p.autor.slug === slug)

  return (
    <main>
      {/* ── Hero do autor ── */}
      <Section padding="none" className="bg-[#0D2E38] pt-[108px] pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] text-white/40 pt-14 mb-12">
            <Link href="/conteudo" className="hover:text-white/70 transition-colors">
              Portal de Conteúdo
            </Link>
            <span>/</span>
            <span className="text-white/60">Autor</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-10">
            {/* Foto */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden ring-4 ring-white/10 shrink-0">
              <Image
                src={autor.foto}
                alt={autor.nome}
                fill
                className="object-cover"
                sizes="160px"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <span className="inline-flex items-center rounded-full bg-[#FA8400]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400] mb-4">
                {autor.cargo}
              </span>
              <h1 className="font-extrabold text-white text-display-xl leading-[1.1] tracking-tight mb-5">
                {autor.nome}
              </h1>
              <p className="text-white/60 text-base leading-relaxed max-w-2xl">
                {autor.bio}
              </p>
              <div className="mt-6 flex items-center gap-2 text-[13px] text-white/40">
                <FileText strokeWidth={2} className="w-4 h-4" />
                {artigos.length} {artigos.length === 1 ? 'publicação' : 'publicações'}
              </div>
            </div>
          </div>
      </Section>

      {/* ── Artigos do autor ── */}
      <Section theme="light" padding="md">
          <h2 className="font-extrabold text-[#0D2E38] text-[1.5rem] md:text-[1.75rem] tracking-tight mb-8">
            Publicações
          </h2>

          {artigos.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {artigos.map((post) => (
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
                      <span className="text-[11px] text-[#0D2E38]/40">{post.data}</span>
                    </div>
                    <h3 className="font-extrabold text-[#0D2E38] text-[15px] leading-snug mb-2 group-hover:text-[#FA8400] transition-colors duration-200">
                      {post.titulo}
                    </h3>
                    <p className="text-[#0D2E38]/55 text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-[#0D2E38]/40 text-sm py-16 text-center">
              Nenhuma publicação encontrada.
            </p>
          )}
      </Section>

      {/* ── CTA ── */}
      <Section padding="md" className="bg-[#0D2E38]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0D2E38] via-[#004E69] to-[#0D2E38] p-8 sm:p-12 md:p-20">
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#FA8400]/20 blur-[140px]" />
            <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-[#00C08B]/10 blur-[120px]" />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                  Quer fazer parte das{' '}
                  <span className="italic font-medium text-[#FA8400]">próximas histórias</span>?
                </h2>
                <p className="mt-6 text-white/65 text-base leading-relaxed">
                  Conheça os programas de aceleração e descubra como o Inaitec pode impulsionar
                  o crescimento da sua startup ou empresa.
                </p>
              </div>
              <div className="w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:shrink-0">
                <Link
                  href="/programas"
                  className="inline-flex items-center justify-center rounded-full bg-[#FA8400] text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
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
