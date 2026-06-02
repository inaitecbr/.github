import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-brand-navy/80 text-[1.0625rem] leading-[1.85] mb-6">{children}</p>
    ),
    h1: ({ children }) => (
      <h2 className="font-extrabold text-brand-navy text-[1.75rem] leading-tight tracking-tight mt-12 mb-5">
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h2 className="font-extrabold text-brand-navy text-[1.5rem] leading-tight tracking-tight mt-12 mb-5">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-bold text-brand-navy text-[1.25rem] leading-snug tracking-tight mt-10 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-bold text-brand-navy text-[1.0625rem] leading-snug mt-8 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-orange pl-5 my-8 italic text-brand-navy/70 text-[1.125rem] leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-brand-navy/80 text-[1.0625rem] leading-[1.7]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-brand-navy/80 text-[1.0625rem] leading-[1.7]">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-brand-navy">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href || '#'
      const external = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          className="text-brand-orange font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const img = value as { alt?: string }
      const src = urlFor(value).width(1200).fit('max').auto('format').url()
      return (
        <figure className="my-10">
          <div className="relative w-full overflow-hidden rounded-2xl">
            <Image
              src={src}
              alt={img.alt || ''}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              sizes="(min-width: 1024px) 760px, 100vw"
            />
          </div>
          {img.alt ? (
            <figcaption className="mt-3 text-center text-[13px] text-brand-navy/45">
              {img.alt}
            </figcaption>
          ) : null}
        </figure>
      )
    },
  },
}

export default function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />
}
