import { useState } from 'react'

interface FallbackImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
}

export function FallbackImage({ src, alt, className, loading = 'lazy' }: FallbackImageProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className={`image-fallback ${className ?? ''}`} role="img" aria-label={alt} />
  return <img src={src} alt={alt} className={className} loading={loading} onError={() => setFailed(true)} />
}
