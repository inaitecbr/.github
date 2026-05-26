import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const CONTAINER_PX = 'px-[clamp(1.25rem,4vw+0.5rem,6.75rem)]'

type ContainerSize = 'default' | 'narrow' | 'wide' | 'full'

const SIZE_MAP: Record<ContainerSize, string> = {
  default: 'max-w-[1440px]',
  narrow: 'max-w-3xl',
  wide: 'max-w-[1600px]',
  full: '',
}

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  size?: ContainerSize
}

export function Container({
  children,
  className,
  as: As = 'div',
  size = 'default',
}: ContainerProps) {
  return (
    <As className={cn('mx-auto w-full', SIZE_MAP[size], CONTAINER_PX, className)}>
      {children}
    </As>
  )
}

type SectionPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'hero'

const PADDING_MAP: Record<SectionPadding, string> = {
  none: '',
  sm: 'py-10 lg:py-12',
  md: 'py-12 lg:py-16',
  lg: 'py-16 lg:py-20',
  xl: 'py-20 lg:py-24',
  hero: 'pt-[108px] pb-12 lg:pb-16',
}

type SectionProps = {
  children: ReactNode
  className?: string
  theme?: 'light' | 'dark'
  padding?: SectionPadding
  id?: string
  containerClassName?: string
  containerSize?: ContainerSize
  bare?: boolean
}

export function Section({
  children,
  className,
  theme,
  padding = 'md',
  id,
  containerClassName,
  containerSize = 'default',
  bare = false,
}: SectionProps) {
  return (
    <section
      id={id}
      data-theme={theme}
      className={cn(
        'relative z-10',
        theme === 'light' && 'bg-[#F5F4EF] text-brand-navy',
        PADDING_MAP[padding],
        className,
      )}
    >
      {bare ? (
        children
      ) : (
        <Container size={containerSize} className={containerClassName}>
          {children}
        </Container>
      )}
    </section>
  )
}
