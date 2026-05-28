'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { HeaderProgramsByPillar } from '@/sanity/queries/headerPrograms'

const HIDDEN_CHROME_PREFIXES = ['/design-system']

type Props = {
  children: React.ReactNode
  headerPrograms: HeaderProgramsByPillar
}

export default function LayoutShell({ children, headerPrograms }: Props) {
  const pathname = usePathname() || '/'
  const hideChrome = HIDDEN_CHROME_PREFIXES.some((p) => pathname.startsWith(p))

  return (
    <>
      {!hideChrome && <Header programs={headerPrograms} />}
      {children}
      {!hideChrome && <Footer programs={headerPrograms} />}
    </>
  )
}
