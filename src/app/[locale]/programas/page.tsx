import type { Metadata } from 'next'
import ProgramasCatalogo from '@/components/ProgramasCatalogo'

export const metadata: Metadata = {
  title: 'Programas',
  description:
    'Conheça todos os 17 programas do Inaitec — aceleração, inovação aberta, pesquisa aplicada e investimento. Filtre por público, estágio e modelo de entrada.',
}

export default function ProgramasPage() {
  return <ProgramasCatalogo />
}
