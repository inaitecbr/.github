import type { Metadata } from 'next'

// Rota interna de documentação — não deve ser indexada.
export const metadata: Metadata = {
  title: 'Design System',
  robots: { index: false, follow: false },
}

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
