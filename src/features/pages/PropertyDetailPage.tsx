import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowLeft, ArrowRight, CaretLeft, CaretRight, MapPin, X } from '@phosphor-icons/react'
import { Armchair, Bath, BedDouble, CarFront, CircleCheck, ClipboardList, ExternalLink, House, LayoutGrid, Maximize2, Sprout, Sun } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs, ButtonLink, FallbackImage } from '@/components/ui'
import { getProperty, properties } from '@/data/properties'
import type { Property, PropertyPhoto } from '@/types/content'
import { formatMoney, formatPrice, propertyContactUrl, propertyGoogleEmbedUrl, propertyGoogleMapsUrl, propertyHighlights } from '@/features/properties/propertyPresentation'
import { NotFoundPage } from './NotFoundPage'

type OpenPhoto = (index: number, trigger: HTMLButtonElement) => void

function PhotoTile({ photo, index, onOpen, className = '' }: { photo: PropertyPhoto; index: number; onOpen: OpenPhoto; className?: string }) {
  return <button className={`property-photo-tile ${className}`} type="button" onClick={(event) => onOpen(index, event.currentTarget)} aria-label={`Ampliar ${photo.label.toLowerCase()}`}>
    <FallbackImage src={photo.src} alt={photo.alt} />
    <span className="property-photo-label">{photo.label}</span>
  </button>
}

function PropertyGallery({ photos, onOpen }: { photos: PropertyPhoto[]; onOpen: OpenPhoto }) {
  const [mobileIndex, setMobileIndex] = useState(0)
  const touchStart = useRef<number | null>(null)
  if (photos.length === 0) return null

  const move = (direction: number) => setMobileIndex((current) => (current + direction + photos.length) % photos.length)

  return <section className="container property-photo-gallery" aria-label="Galería de imágenes">
    <div className="property-gallery-topline">
      <p>Explora las imágenes y los espacios destacados.</p>
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
  return <div className="property-lightbox" ref={dialogRef} role="dialog" aria-modal="true" aria-label="Galería de imágenes ampliada" onKeyDown={handleKeyDown}>
    <div className="property-lightbox-bar"><span>{index + 1} de {photos.length} · {photo.label}</span><button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar galería"><X size={24} aria-hidden="true" /></button></div>
    <div className="property-lightbox-stage">
      {photos.length > 1 && <button type="button" onClick={() => onChange(-1)} aria-label="Fotografía anterior"><ArrowLeft size={24} aria-hidden="true" /></button>}
      <FallbackImage src={photo.src} alt={photo.alt} loading="eager" />
      {photos.length > 1 && <button type="button" onClick={() => onChange(1)} aria-label="Fotografía siguiente"><ArrowRight size={24} aria-hidden="true" /></button>}
    </div>
  </div>
}

function EnvironmentExplorer({ photos, onOpen }: { photos: PropertyPhoto[]; onOpen: OpenPhoto }) {
  const [category, setCategory] = useState('Todos los ambientes')
  if (photos.length === 0) return null
  const categories = ['Todos los ambientes', ...new Set(photos.map((photo) => photo.category))]
  const visible = category === 'Todos los ambientes' ? photos : photos.filter((photo) => photo.category === category)

  return <section className="property-explorer" aria-labelledby="property-explorer-title">
    <div className="container">
      <div className="property-explorer-toolbar">
        <div className="property-explorer-heading"><h2 id="property-explorer-title">Explora cada espacio</h2><p>Recorre los ambientes y sus detalles.</p></div>
        {categories.length > 2 && <div className="property-explorer-filters" role="group" aria-label="Filtrar ambientes">
          {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>}
      </div>
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

function PropertyTechnicalDetails({ property }: { property: Property }) {
  const { features, amenities } = property
  const details = [
    features.totalArea !== undefined && `${features.totalArea} m² de área total`,
    features.landArea !== undefined && `${features.landArea} m² de terreno`,
    features.builtArea !== undefined && `${features.builtArea} m² techados`,
    features.floor !== undefined && `Piso ${features.floor}`,
    features.levels !== undefined && `${features.levels} nivel${features.levels === 1 ? '' : 'es'}`,
    features.ageYears !== undefined && `${features.ageYears} años de antigüedad`,
    features.condition && `Conservación: ${features.condition}`,
    features.frontage !== undefined && `${features.frontage} m de frente`,
    features.depth !== undefined && `${features.depth} m de fondo`,
    features.zoning && `Zonificación ${features.zoning}`,
  ].filter((item): item is string => Boolean(item))
  const rooms = [
    ...(amenities?.distribution ?? []),
    features.bedrooms !== undefined && `${features.bedrooms} dormitorio${features.bedrooms === 1 ? '' : 's'}`,
    features.terrace && 'Terraza', features.balcony && 'Balcón',
    features.patio && 'Patio', features.garden && 'Jardín',
  ].filter((item): item is string => Boolean(item))
  const equipment = [
    ...(amenities?.equipment ?? []),
    features.furnished !== undefined && (features.furnished ? 'Amoblado' : 'Sin amoblar'),
    features.elevator && !amenities?.equipment?.some((item) => /ascensor/i.test(item)) && 'Ascensor',
    features.storage && 'Depósito',
    features.parking !== undefined && !amenities?.equipment?.some((item) => /estacionamiento/i.test(item)) && `${features.parking} estacionamiento${features.parking === 1 ? '' : 's'}`,
  ].filter((item): item is string => Boolean(item))
  const equipmentAndShared = [
    ...equipment,
    ...(amenities?.shared ?? []),
  ]
  const tagIcon = (tag: string) => {
    if (/luz|ilumin/i.test(tag)) return Sun
    if (/terraza|jardín|paisajismo|patio|balcón/i.test(tag)) return Sprout
    if (/distribución|espacios|áreas|colaboración|salas/i.test(tag)) return LayoutGrid
    return CircleCheck
  }
  return <section className="property-details" aria-labelledby="property-details-title"><div className="container">
    <div className="property-details-panel">
      <div className="property-details-intro">
        <div><h2 id="property-details-title">Sobre esta propiedad</h2><p>{property.description}</p></div>
        {property.tags.length > 0 && <ul className="property-details-tags">{property.tags.map((tag) => { const Icon = tagIcon(tag); return <li key={tag}><Icon size={20} strokeWidth={1.8} aria-hidden="true" />{tag}</li> })}</ul>}
      </div>
      <div className="property-specs">
        {details.length > 0 && <div className="property-spec-card property-specs-list"><ClipboardList size={30} strokeWidth={1.7} aria-hidden="true" /><div><h3>Detalles</h3><ul>{details.map((item) => <li key={item}>{item}</li>)}</ul></div></div>}
        {rooms.length > 0 && <div className="property-spec-card property-specs-list"><House size={31} strokeWidth={1.7} aria-hidden="true" /><div><h3>Ambientes</h3><ul>{rooms.map((item) => <li key={item}>{item}</li>)}</ul></div></div>}
        {equipmentAndShared.length > 0 && <div className="property-spec-card property-specs-list"><Armchair size={31} strokeWidth={1.7} aria-hidden="true" /><div><h3>Equipamiento</h3><ul>{equipmentAndShared.map((item) => <li key={item}>{item}</li>)}</ul></div></div>}
      </div>
    </div>
  </div></section>
}

function PropertyCommercialTerms({ property }: { property: Property }) {
  const rows = [
    property.price?.negotiable !== undefined && ['Precio negociable', property.price.negotiable ? 'Sí' : 'No'],
    property.operation === 'Alquiler' && property.maintenance && ['Mantenimiento mensual', formatMoney(property.maintenance.amount, property.maintenance.currency)],
    property.rentalTerms?.depositMonths !== undefined && ['Garantía', `${property.rentalTerms.depositMonths} meses`],
    property.rentalTerms?.advanceMonths !== undefined && ['Adelanto', `${property.rentalTerms.advanceMonths} mes${property.rentalTerms.advanceMonths === 1 ? '' : 'es'}`],
    property.rentalTerms?.minimumMonths !== undefined && ['Plazo mínimo', `${property.rentalTerms.minimumMonths} meses`],
    property.features.petsAllowed !== undefined && ['Mascotas', property.features.petsAllowed ? 'Permitidas' : 'No permitidas'],
    property.rentalTerms?.notes && ['Condiciones adicionales', property.rentalTerms.notes],
  ].filter((item): item is string[] => Boolean(item))
  if (rows.length === 0) return null
  return <section className="property-commercial" aria-labelledby="property-commercial-title"><div className="container property-commercial-inner">
    <div><h2 id="property-commercial-title">Condiciones de {property.operation === 'Alquiler' ? 'alquiler' : 'venta'}</h2><p>Detalles para considerar antes de solicitar información.</p></div>
    <dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
  </div></section>
}

function PropertyLocation({ property }: { property: Property }) {
  const [mapFailed, setMapFailed] = useState(false)
  const mapUrl = propertyGoogleEmbedUrl(property)
  const { location } = property
  return <section className="container property-location" aria-labelledby="property-location-title">
    <div className="property-location-copy">
      <h2 id="property-location-title">Ubicación y entorno</h2>
      <p className="property-location-name"><MapPin size={23} aria-hidden="true" />{location.district}, {location.province}</p>
      <p className="property-location-explanation">{location.precision === 'aproximada' ? 'El mapa muestra el distrito como referencia; no señala la dirección exacta del inmueble.' : location.address ?? 'Ubicación exacta confirmada.'}</p>
      {location.nearby && location.nearby.length > 0 && <div className="property-location-nearby"><h3>Lugares cercanos</h3><ul>{location.nearby.map((place) => <li key={place.name}><strong>{place.name}</strong><span>{place.category}{place.distanceMeters !== undefined ? ` · ${place.distanceMeters} m` : ''}</span></li>)}</ul></div>}
      <a className="property-map-link" href={propertyGoogleMapsUrl(property)} target="_blank" rel="noopener noreferrer">Ver en Google Maps <ExternalLink size={17} aria-hidden="true" /></a>
    </div>
    <div className="property-map-frame">
      {!mapFailed ? <iframe src={mapUrl} title={`Google Maps: ubicación ${location.precision} en ${location.district}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen onError={() => setMapFailed(true)} /> : <div className="property-map-fallback"><MapPin size={28} aria-hidden="true" /><p>El mapa no está disponible en este momento.</p><a href={propertyGoogleMapsUrl(property)} target="_blank" rel="noopener noreferrer">Abrir ubicación en Google Maps</a></div>}
      <p>Ubicación {location.precision} · Mapa de Google Maps</p>
    </div>
  </section>
}

function PropertyDetailContent({ property }: { property: Property }) {
  const photos = [...(property.photos ?? [])].sort((a, b) => a.order - b.order)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [returnFocus, setReturnFocus] = useState<HTMLButtonElement | null>(null)
  const openPhoto: OpenPhoto = (index, trigger) => { setReturnFocus(trigger); setLightboxIndex(index) }
  const location = [property.location.district, property.location.province].filter(Boolean).join(', ')
  const contactUrl = propertyContactUrl(property)
  const highlights = propertyHighlights(property)
  const highlightIcons = { Área: Maximize2, Dormitorios: BedDouble, Baños: Bath, 'Servicios higiénicos': Bath, Estacionamientos: CarFront }

  return <div className="property-detail-page">
    <section className="property-detail-hero">
      <FallbackImage src={photos[0]?.src ?? property.image} alt={photos[0]?.alt ?? property.title} className="property-detail-hero-image" loading="eager" />
      <div className="property-detail-hero-overlay" aria-hidden="true" />
      <div className="container property-detail-hero-content">
        <Breadcrumbs light items={[{ label: 'Inicio', to: '/' }, { label: 'Propiedades', to: '/propiedades' }, { label: property.title }]} />
        <h1>{property.title}</h1>
        <p>{property.operation} <span aria-hidden="true">·</span> {property.type} <span aria-hidden="true">·</span> {location}</p>
      </div>
    </section>

    <PropertyGallery photos={photos} onOpen={openPhoto} />

    <section className="property-summary" aria-label="Resumen comercial"><div className="container property-summary-inner">
      <div className="property-summary-main">
        <span className="property-summary-status">{property.operation === 'Venta' ? 'EN VENTA' : 'EN ALQUILER'}</span>
        <h2>{formatPrice(property)}</h2>
        {property.maintenance && <p className="property-summary-maintenance">Mantenimiento: {formatMoney(property.maintenance.amount, property.maintenance.currency)} / mes</p>}
        <p className="property-summary-description">{property.summary}</p>
      </div>
      <aside className="property-summary-action" aria-label="Consulta sobre la propiedad">
        <h3>¿Deseas visitar o consultar esta propiedad?</h3>
        <p>Nuestro equipo te ayudará a resolver tus dudas sobre este inmueble.</p>
        <ButtonLink to={contactUrl}>Consultar esta propiedad</ButtonLink>
        <ul>
          <li><CircleCheck size={18} aria-hidden="true" />Asesoría personalizada</li>
          <li><CircleCheck size={18} aria-hidden="true" />Información del inmueble centralizada</li>
          <li><CircleCheck size={18} aria-hidden="true" />Atención mediante WhatsApp</li>
        </ul>
      </aside>
      <ul className="property-summary-highlights">{highlights.map((item) => { const Icon = highlightIcons[item.label as keyof typeof highlightIcons]; return <li key={item.label}><Icon size={22} strokeWidth={1.6} aria-hidden="true" /><span><strong>{item.value}</strong><small>{item.label}</small></span></li> })}</ul>
      <p className="property-record-note">Código {property.code} · Información actualizada el {new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${property.updatedAt}T12:00:00`))}</p>
    </div></section>

    <EnvironmentExplorer photos={photos} onOpen={openPhoto} />

    <PropertyTechnicalDetails property={property} />
    <PropertyCommercialTerms property={property} />
    <PropertyLocation property={property} />

    <section className="property-contact-band" aria-labelledby="property-contact-title"><div className="container">
      <div><h2 id="property-contact-title">Conversa con un asesor inmobiliario</h2><p>Cuéntanos qué necesitas y te orientaremos sobre esta propiedad.</p></div>
      <ButtonLink to={contactUrl} variant="light">Hablar con un asesor</ButtonLink>
    </div></section>

    <section className="property-related" aria-labelledby="property-related-title"><div className="container">
      <div className="property-related-heading"><h2 id="property-related-title">Propiedades relacionadas</h2><Link to="/propiedades">Ver todas las propiedades <ArrowRight size={18} aria-hidden="true" /></Link></div>
      <div className="property-related-grid">{relatedProperties(property).map((item) => <Link key={item.slug} to={`/propiedades/${item.slug}`} className="property-related-card">
        <FallbackImage src={item.image} alt="" />
        <div><small>{item.operation} · {item.type} · {item.district ?? item.zone}</small><h3>{item.title}</h3><strong className="property-related-price">{formatPrice(item)}</strong><p>{propertyHighlights(item).map((fact) => fact.value).join(' · ')}</p><span>Ver propiedad <ArrowRight size={17} aria-hidden="true" /></span></div>
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
