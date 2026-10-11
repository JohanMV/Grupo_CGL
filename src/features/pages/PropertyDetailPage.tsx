import { useState, type KeyboardEvent } from 'react'
import { ArrowRight, CaretLeft, CaretRight, Check, MapPin } from '@phosphor-icons/react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs, ButtonLink, FallbackImage } from '@/components/ui'
import { getProperty, properties } from '@/data/properties'
import type { Property } from '@/types/content'
import { NotFoundPage } from './NotFoundPage'

function ReferenceGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  if (images.length === 0) return null

  const changeImage = (direction: number) => {
    setActive((current) => (current + direction + images.length) % images.length)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      changeImage(event.key === 'ArrowRight' ? 1 : -1)
    }
  }

  return (
    <section className="property-reference-gallery" aria-labelledby="property-reference-title" onKeyDown={handleKeyDown}>
      <div className="property-reference-heading">
        <div>
          <h3 id="property-reference-title">Referencias visuales de ambientes</h3>
          <p>Estas imágenes no corresponden al mismo inmueble.</p>
        </div>
        <span className="property-gallery-count" aria-live="polite">{active + 1} de {images.length}</span>
      </div>
      <div className="property-reference-stage" onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)} onTouchEnd={(event) => {
        if (touchStart === null) return
        const distance = touchStart - (event.changedTouches[0]?.clientX ?? touchStart)
        if (Math.abs(distance) > 50) changeImage(distance > 0 ? 1 : -1)
        setTouchStart(null)
      }}>
        <FallbackImage src={images[active]} alt={`Referencia visual de ambientes ${active + 1}; no corresponde a esta propiedad`} />
        {images.length > 1 && <div className="property-reference-controls">
          <button type="button" onClick={() => changeImage(-1)} aria-label="Imagen anterior"><CaretLeft size={21} aria-hidden="true" /></button>
          <button type="button" onClick={() => changeImage(1)} aria-label="Imagen siguiente"><CaretRight size={21} aria-hidden="true" /></button>
        </div>}
      </div>
      {images.length > 1 && <div className="property-reference-thumbnails" aria-label="Seleccionar referencia visual">
        {images.map((image, index) => <button type="button" key={`${image}-${index}`} onClick={() => setActive(index)} aria-label={`Ver referencia ${index + 1} de ${images.length}`} aria-pressed={active === index}>
          <FallbackImage src={image} alt="" />
        </button>)}
      </div>}
    </section>
  )
}

function relatedProperties(property: Property) {
  return properties
    .filter((item) => item.slug !== property.slug)
    .map((item) => ({
      item,
      score: Number(item.type === property.type) * 4 + Number(item.operation === property.operation) * 2 + Number(item.catalogZone === property.catalogZone),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item)
}

export function PropertyDetailPage() {
  const { slug } = useParams()
  const property = getProperty(slug)
  if (!property) return <NotFoundPage compact />

  const location = [property.district, property.catalogZone ?? property.zone].filter(Boolean).join(' · ')
  const references = property.gallery.filter((image) => image !== property.image)
  const related = relatedProperties(property)
  const contactUrl = `/contacto?servicio=inmobiliaria&propiedad=${encodeURIComponent(property.slug)}`

  return <div className="property-detail-page">
    <section className="property-detail-hero">
      <FallbackImage src={property.image} alt="" className="property-detail-hero-image" loading="eager" />
      <div className="property-detail-hero-overlay" aria-hidden="true" />
      <div className="container property-detail-hero-content">
        <Breadcrumbs light items={[{ label: 'Inicio', to: '/' }, { label: 'Propiedades', to: '/propiedades' }, { label: property.title }]} />
        <div>
          <h1>{property.title}</h1>
          <p>{property.operation} <span aria-hidden="true">·</span> {property.type} <span aria-hidden="true">·</span> {property.district ?? property.zone}</p>
        </div>
        <span className="property-detail-image-note">Imagen referencial · Propiedad conceptual</span>
      </div>
    </section>

    <section className="property-facts" aria-label="Resumen de la propiedad">
      <dl className="container">
        <div><dt>Operación</dt><dd>{property.operation}</dd></div>
        <div><dt>Tipo</dt><dd>{property.type}</dd></div>
        <div><dt>Distrito</dt><dd>{property.district ?? 'No especificado'}</dd></div>
        <div><dt>Zona</dt><dd>{property.catalogZone ?? property.zone}</dd></div>
      </dl>
    </section>

    <div className="container property-detail-body">
      <div className="property-detail-main">
        <section className="property-primary-photo" aria-label="Imagen principal de la propiedad">
          <FallbackImage src={property.image} alt={`Vista conceptual principal: ${property.title}`} />
          <span>Imagen referencial</span>
        </section>
        <ReferenceGallery key={property.slug} images={references} />

        <section className="property-detail-section" aria-labelledby="property-about-title">
          <h2 id="property-about-title">Sobre esta propiedad</h2>
          <p>{property.description}</p>
        </section>

        {property.spaces && property.spaces.length > 0 && <section className="property-detail-section" aria-labelledby="property-spaces-title">
          <h2 id="property-spaces-title">Ambientes y distribución</h2>
          <ul className="property-space-list">{property.spaces.map((space) => <li key={space}>{space}</li>)}</ul>
        </section>}

        <section className="property-detail-section" aria-labelledby="property-features-title">
          <h2 id="property-features-title">Características</h2>
          <ul className="property-feature-list">{property.tags.map((tag) => <li key={tag}><Check size={18} aria-hidden="true" />{tag}</li>)}</ul>
        </section>

        <section className="property-detail-section property-location" aria-labelledby="property-location-title">
          <h2 id="property-location-title">Ubicación</h2>
          <p><MapPin size={22} aria-hidden="true" /> <span>{location}</span></p>
          <small>Ubicación referencial. La dirección exacta no está publicada.</small>
        </section>
      </div>

      <aside className="property-inquiry" aria-labelledby="property-inquiry-title">
        <h2 id="property-inquiry-title">Consulta por esta propiedad</h2>
        <p>Cuéntanos qué necesitas saber sobre esta ficha y nuestro equipo te orientará sobre los siguientes pasos.</p>
        <ButtonLink to={contactUrl} variant="primary">Solicitar información</ButtonLink>
        <span>La consulta se completa en la página de contacto.</span>
      </aside>
    </div>

    <section className="property-related" aria-labelledby="property-related-title">
      <div className="container">
        <div className="property-related-heading"><h2 id="property-related-title">Propiedades relacionadas</h2><Link to="/propiedades">Ver todas las propiedades <ArrowRight size={18} aria-hidden="true" /></Link></div>
        <div className="property-related-grid">{related.map((item) => <Link key={item.slug} to={`/propiedades/${item.slug}`} className="property-related-card">
          <FallbackImage src={item.image} alt="" />
          <div><small>{item.operation} · {item.type} · {item.district ?? item.zone}</small><h3>{item.title}</h3><span>Ver propiedad <ArrowRight size={17} aria-hidden="true" /></span></div>
        </Link>)}</div>
      </div>
    </section>
  </div>
}
