import { ArrowRight, Check } from '@phosphor-icons/react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs, ButtonLink, FallbackImage } from '@/components/ui'
import { getProperty, properties } from '@/data/properties'
import { NotFoundPage } from './NotFoundPage'

export function PropertyDetailPage() {
  const { slug } = useParams()
  const property = getProperty(slug)
  if (!property) return <NotFoundPage compact />
  const others = properties.filter((item) => item.slug !== property.slug).slice(0, 2)
  return <><section className="property-detail-head"><div className="container"><Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Propiedades', to: '/propiedades' }, { label: property.title }]} /><span>Presentación ilustrativa / No disponible</span><h1>{property.title}</h1><p>{property.type} / {property.zone} / Clasificación referencial: {property.operation}</p></div></section>
    <section className="container property-gallery"><div className="property-main"><FallbackImage src={property.gallery[0]} alt={`${property.title}, vista principal referencial`} /></div><div>{property.gallery.slice(1).map((image, index) => <FallbackImage key={image} src={image} alt={`${property.title}, vista referencial ${index + 2}`} />)}</div></section>
    <section className="section property-story"><div className="container"><article><h2>Descripción conceptual</h2><p>{property.description}</p><p>Esta composición demuestra cómo podría organizarse una ficha con contenido verificado en una versión contratada.</p></article><article><h2>Ambientes y posibilidades</h2>{property.tags.map((tag) => <p key={tag}><Check /> {tag}</p>)}<p><Check /> Detalles por confirmar</p></article><article><h2>Información pendiente</h2><p>Precio, área, ubicación exacta, disponibilidad, documentación y condiciones comerciales requieren información real.</p><ButtonLink to={`/contacto?servicio=inmobiliaria`} variant="primary">Consultar por mi propiedad</ButtonLink></article></div></section>
    <section className="section related-properties"><div className="container"><h2>Otras presentaciones de ejemplo</h2><div>{others.map((item) => <Link key={item.slug} to={`/propiedades/${item.slug}`}><FallbackImage src={item.image} alt="" /><span>{item.title}<ArrowRight /></span></Link>)}</div></div></section></>
}
