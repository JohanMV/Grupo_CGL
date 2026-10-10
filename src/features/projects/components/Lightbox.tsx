import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react'
import { FallbackImage } from '@/components/ui'

interface LightboxProps { images: string[]; title: string }

export function Lightbox({ images, title }: LightboxProps) {
  const [index, setIndex] = useState<number | null>(null)
  const move = (direction: number) => setIndex((current) => current === null ? null : (current + direction + images.length) % images.length)
  useEffect(() => {
    if (index === null) return
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIndex(null)
      if (event.key === 'ArrowRight') setIndex((current) => current === null ? null : (current + 1) % images.length)
      if (event.key === 'ArrowLeft') setIndex((current) => current === null ? null : (current - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', keydown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', keydown); document.body.style.overflow = '' }
  }, [index, images.length])
  return <><div className="gallery-grid">{images.map((image, imageIndex) => <button type="button" onClick={() => setIndex(imageIndex)} key={image} aria-label={`Ampliar imagen ${imageIndex + 1}`}><FallbackImage src={image} alt={`${title}, vista referencial ${imageIndex + 1}`} /></button>)}</div>
    {index !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Galería de ${title}`}><button className="lightbox-close" type="button" onClick={() => setIndex(null)} aria-label="Cerrar galería"><X /></button><button type="button" onClick={() => move(-1)} aria-label="Imagen anterior"><ArrowLeft /></button><FallbackImage src={images[index]} alt={`${title}, vista ampliada`} /><button type="button" onClick={() => move(1)} aria-label="Imagen siguiente"><ArrowRight /></button></div>}
  </>
}
