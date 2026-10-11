import type { ReactNode } from 'react'
import { Breadcrumbs, FallbackImage } from '@/components/ui'

interface InteriorHeroProps {
  title: string
  text: string
  image?: string
  eyebrow?: string
  breadcrumbs?: Array<{ label: string; to?: string }>
  children?: ReactNode
}

export function InteriorHero({ title, text, image, eyebrow, breadcrumbs, children }: InteriorHeroProps) {
  return (
    <section className={`interior-hero ${image ? 'interior-hero-image' : ''}`}>
      {image && <><FallbackImage src={image} alt="Arquitectura contemporánea" loading="eager" /><div className="interior-scrim" /></>}
      <div className="container interior-hero-content">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} light={Boolean(image)} />}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1><p>{text}</p>{children}
      </div>
    </section>
  )
}
