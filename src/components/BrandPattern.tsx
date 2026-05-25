type Props = {
  className?: string
  color?: string
  variant?: 'dots' | 'arc' | 'grid'
}

export default function BrandPattern({
  className = '',
  color = '#FA8400',
  variant = 'dots',
}: Props) {
  if (variant === 'arc') {
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        aria-hidden
      >
        <circle cx="100" cy="100" r="98" stroke={color} strokeWidth="2" strokeDasharray="2 6" opacity="0.3" />
        <circle cx="100" cy="100" r="60" stroke={color} strokeWidth="2" opacity="0.5" />
        <circle cx="140" cy="100" r="36" fill={color} opacity="0.9" />
      </svg>
    )
  }
  if (variant === 'grid') {
    return (
      <svg className={className} aria-hidden>
        <defs>
          <pattern id="brand-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0 L0 0 0 32" fill="none" stroke={color} strokeWidth="0.5" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#brand-grid)" />
      </svg>
    )
  }
  // dots (default)
  return (
    <svg className={className} aria-hidden>
      <defs>
        <pattern id="brand-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill={color} opacity="0.35" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#brand-dots)" />
    </svg>
  )
}
