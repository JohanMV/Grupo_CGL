import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowLeft, ArrowRight, CaretLeft, CaretRight, Check, MapPin, X } from '@phosphor-icons/react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs, ButtonLink, FallbackImage } from '@/components/ui'
import { getProperty, properties } from '@/data/properties'
import type { Property, PropertyPhoto } from '@/types/content'
import { NotFoundPage } from './NotFoundPage'

type OpenPhoto = (index: number, trigger: HTMLButtonElement) => void

function PhotoTile({ photo, index, onOpen, className = '' }: { photo: PropertyPhoto; index: number; onOpen: OpenPhoto; className?: string }) {
  return <button className={`property-photo-tile ${className}`} type="button" onClick={(event) => onOpen(index, event.currentTarget)} aria-label={`Ampliar ${photo.label.toLowerCase()}${photo.isReference ? ', fotografía referencial' : ''}`}>
    <FallbackImage src={photo.src} alt={photo.alt} />
    <span className="property-photo-label">{photo.label}</span>
  </button>
}

function PropertyGallery({ photos, onOpen }: { photos: PropertyPhoto[]; onOpen: OpenPhoto }) {
  const [mobileIndex, setMobileIndex] = useState(0)
  const touchStart = useRef<number | null>(null)
  if (photos.length === 0) return null

  const move = (direction: number) => setMobileIndex((current) => (current + direction + photos.length) % photos.length)

  return <section className="container property-photo-gallery" aria-label="Galería de referencias visuales">
    <div className="property-gallery-topline">
      <p>{photos.some((photo) => photo.isReference) ? 'Fotografías referenciales independientes. No muestran un único inmueble.' : 'Explora las fotografías de esta propiedad.'}</p>
      <span>{photos.length} {photos.length === 1 ? 'fotografía' : 'fotografías'}</span>
    </div>
    <div className="property-photo-mosaic" data-count={Math.min(photos.length, 3)}>
      {photos.slice(0, 3).map((photo, index) => <PhotoTile key={photo.id} photo={photo} index={index} onOpen={onOpen} />)}
    </div>
    <div className="property-mobile-gallery" onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null }} onTouchEnd={(event) => {
      if (touchStart.current === null) return
      const distance = touchStart.current - (event.changedTouches[0]?.clientX ?? touchStart.current)
      if (Math.abs(distance) > 50) move(distance > 0 ? 1 : -1)
      touchStart.current = null
    }}>
      <PhotoTile photo={photos[mobileIndex]} index={mobileIndex} onOpen={onOpen} />
      {photos.length > 1 && <div className="property-mobile-gallery-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Fotografía anterior"><CaretLeft size={20} aria-hidden="true" /></button>
        <span aria-live="polite">{mobileIndex + 1} de {photos.length}</span>
        <button type="button" onClick={() => move(1)} aria-label="Fotografía siguiente"><CaretRight size={20} aria-hidden="true" /></button>
      </div>}
    </div>
    <button className="property-all-photos" type="button" onClick={(event) => onOpen(0, event.currentTarget)}>Ver todas las fotos <ArrowRight size={18} aria-hidden="true" /></button>
  </section>
}

function PropertyLightbox({ photos, index, onChange, onClose, returnFocus }: { photos: PropertyPhoto[]; index: number; onChange: (direction: number) => void; onClose: () => void; returnFocus: HTMLButtonElement | null }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      returnFocus?.focus()
    }
  }, [returnFocus])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') { event.preventDefault(); onClose() }
    if (event.key === 'ArrowRight') { event.preventDefault(); onChange(1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); onChange(-1) }
    if (event.key === 'Tab') {
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
  }

  const photo = photos[index]
  return <div className="property-lightbox" ref={dialogRef} role="dialog" aria-modal="true" aria-label="Galería ampliada de referencias visuales" onKeyDown={handleKeyDown}>
    <div className="property-lightbox-bar"><span>{index + 1} de {photos.length} · {photo.label}</span><button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar galería"><X size={24} aria-hidden="true" /></button></div>
    <div className="property-lightbox-stage">
      {photos.length > 1 && <button type="button" onClick={() => onChange(-1)} aria-label="Fotografía anterior"><ArrowLeft size={24} aria-hidden="true" /></button>}
      <FallbackImage src={photo.src} alt={photo.alt} loading="eager" />
      {photos.length > 1 && <button type="button" onClick={() => onChange(1)} aria-label="Fotografía siguiente"><ArrowRight size={24} aria-hidden="true" /></button>}
    </div>
    {photo.isReference && <p>Imagen referencial independiente. No corresponde necesariamente a esta propiedad.</p>}
  </div>
}

function EnvironmentExplorer({ photos, onOpen }: { photos: PropertyPhoto[]; onOpen: OpenPhoto }) {
  const [category, setCategory] = useState('Todos los ambientes')
  if (photos.length === 0) return null
  const categories = ['Todos los ambientes', ...new Set(photos.map((photo) => photo.category))]
  const visible = category === 'Todos los ambientes' ? photos : photos.filter((photo) => photo.category === category)

  return <section className="property-explorer" aria-labelledby="property-explorer-title">
    <div className="container">
      <div className="property-explorer-heading"><h2 id="property-explorer-title">Explora cada espacio</h2><p>{photos.some((photo) => photo.isReference) ? 'Recorre las referencias disponibles por tipo de ambiente. Estas imágenes no confirman los espacios de este inmueble.' : 'Conoce los ambientes, la distribución y los detalles de esta propiedad.'}</p></div>
      {categories.length > 2 && <div className="property-explorer-filters" role="group" aria-label="Filtrar ambientes">
        {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>}
      <div className="property-explorer-grid" aria-live="polite">
        {visible.map((photo) => <PhotoTile key={photo.id} photo={photo} index={photos.findIndex((item) => item.id === photo.id)} onOpen={onOpen} />)}
      </div>
    </div>
  </section>
}

function relatedProperties(property: Property) {
  return properties
    .filter((item) => item.slug !== property.slug)
    .map((item) => ({ item, score: Number(item.type === property.type) * 4 + Number(item.operation === property.operation) * 2 + Number(item.catalogZone === property.catalogZone) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item)
}

function PropertyDetailContent({ property }: { property: Property }) {
  const photos = [...(property.photos ?? [])].sort((a, b) => a.order - b.order)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [returnFocus, setReturnFocus] = useState<HTMLButtonElement | null>(null)
  const openPhoto: OpenPhoto = (index, trigger) => { setReturnFocus(trigger); setLightboxIndex(index) }
  const location = [property.district, property.catalogZone ?? property.zone].filter(Boolean).join(', ')
  const contactUrl = `/contacto?servicio=inmobiliaria&propiedad=${encodeURIComponent(property.slug)}`

  return <div className="property-detail-page">
    <section className="property-detail-hero">
      <FallbackImage src={property.image} alt="" className="property-detail-hero-image" loading="eager" />
      <div className="property-detail-hero-overlay" aria-hidden="true" />
      <div className="container property-detail-hero-content">
        <Breadcrumbs light items={[{ label: 'Inicio', to: '/' }, { label: 'Propiedades', to: '/propiedades' }, { label: property.title }]} />
        <h1>{property.title}</h1>
        <p>{property.operation} <span aria-hidden="true">·</span> {property.type} <span aria-hidden="true">·</span> {location}</p>
        {photos.some((photo) => photo.isReference) && <small>Imágenes referenciales · Propiedad conceptual</small>}
      </div>
    </section>

    <PropertyGallery photos={photos} onOpen={openPhoto} />

    <section className="property-facts" aria-label="Resumen de la propiedad">
      <dl className="container">
        <div><dt>Operación</dt><dd>{property.operation}</dd></div>
        <div><dt>Tipo</dt><dd>{property.type}</dd></div>
        {property.district && <div><dt>Distrito</dt><dd>{property.district}</dd></div>}
        <div><dt>Zona</dt><dd>{property.catalogZone ?? property.zone}</dd></div>
      </dl>
    </section>

    <EnvironmentExplorer photos={photos} onOpen={openPhoto} />

    <section className="container property-information" aria-label="Descripción y características">
      <div className="property-information-story">
        <h2>Sobre esta propiedad</h2>
        <p>{property.description}</p>
        {property.spaces && property.spaces.length > 0 && <div className="property-information-spaces"><h3>Ambientes y distribución</h3><ul>{property.spaces.map((space) => <li key={space}>{space}</li>)}</ul></div>}
      </div>
      <div className="property-information-features">
        <h2>Características</h2>
        <ul>{property.tags.map((tag) => <li key={tag}><Check size={18} aria-hidden="true" />{tag}</li>)}</ul>
      </div>
    </section>

    <section className="container property-location" aria-labelledby="property-location-title">
      <div><h2 id="property-location-title">Ubicación</h2><p><MapPin size={22} aria-hidden="true" />{location}</p></div>
      <span>Ubicación referencial. Consulta para obtener más información.</span>
    </section>

    <section className="property-contact-band" aria-labelledby="property-contact-title"><div className="container">
      <div><h2 id="property-contact-title">¿Te interesa esta propiedad?</h2><p>Solicita orientación sobre esta propuesta y nuestros servicios inmobiliarios.</p></div>
      <ButtonLink to={contactUrl} variant="light">Solicitar información</ButtonLink>
    </div></section>

    <section className="property-related" aria-labelledby="property-related-title"><div className="container">
      <div className="property-related-heading"><h2 id="property-related-title">Propiedades relacionadas</h2><Link to="/propiedades">Ver todas las propiedades <ArrowRight size={18} aria-hidden="true" /></Link></div>
      <div className="property-related-grid">{relatedProperties(property).map((item) => <Link key={item.slug} to={`/propiedades/${item.slug}`} className="property-related-card">
        <FallbackImage src={item.image} alt="" />
        <div><small>{item.operation} · {item.type} · {item.district ?? item.zone}</small><h3>{item.title}</h3><span>Ver propiedad <ArrowRight size={17} aria-hidden="true" /></span></div>
      </Link>)}</div>
    </div></section>

    {lightboxIndex !== null && <PropertyLightbox photos={photos} index={lightboxIndex} onChange={(direction) => setLightboxIndex((current) => current === null ? null : (current + direction + photos.length) % photos.length)} onClose={() => setLightboxIndex(null)} returnFocus={returnFocus} />}
  </div>
}

export function PropertyDetailPage() {
  const { slug } = useParams()
  const property = getProperty(slug)
  if (!property) return <NotFoundPage compact />
  return <PropertyDetailContent key={property.slug} property={property} />
}
