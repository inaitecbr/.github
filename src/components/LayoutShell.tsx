'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const HIDDEN_CHROME_PREFIXES = ['/design-system']

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/'
  const hideChrome = HIDDEN_CHROME_PREFIXES.some((p) => pathname.startsWith(p))

  return (
    <>
      {!hideChrome && <Header />}
      {children}
      {!hideChrome && <Footer />}
    </>
  )
}
