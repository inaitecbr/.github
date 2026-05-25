import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Soluções',
  description: 'Benefícios, missões internacionais e muito mais para startups e empresas.',
}

export default function SolucoesPage() {
  return (
    <main className="max-w-[1126px] mx-auto min-h-svh flex flex-col border-x border-[#e5e4e7] px-6">
      <section className="py-16">
        <h1 className="text-4xl font-medium tracking-tight text-[#08060d] dark:text-[#f3f4f6]">
          Soluções
        </h1>
        <p className="mt-4 text-[#6b6375] dark:text-[#9ca3af]">
          Em construção.
        </p>
      </section>
    </main>
  )
}
