import { CheckCircle } from '@phosphor-icons/react'
import { Link, useParams } from 'react-router-dom'
import apartmentImage from '@/assets/images/apartment-living.webp'
import commercialImage from '@/assets/images/commercial-space.webp'
import constructionImage from '@/assets/images/construction-site.webp'
import managementImage from '@/assets/images/managed-building.webp'
import kitchenImage from '@/assets/images/renovated-kitchen.webp'
import residenceImage from '@/assets/images/residencia_3.webp'
import residenceDetailImage from '@/assets/images/residencia_2.webp'
import { Accordion, ButtonLink, FallbackImage, Reveal, SectionHeading } from '@/components/ui'
import { ContactCTA, InteriorHero } from '@/components/sections'
import { getService } from '@/data/services'
import { NotFoundPage } from './NotFoundPage'

const offeringGroups: Record<string, Array<{ title: string; description: string; image: string; imageAlt: string }>> = {
  inmobiliaria: [
    { title: 'Comercialización', description: 'Estrategias y gestión para maximizar el valor de cada inmueble.', image: apartmentImage, imageAlt: 'Sala residencial luminosa con vista a la ciudad' },
    { title: 'Asesoría y gestión', description: 'Acompañamiento técnico y operativo durante todo el proceso.', image: managementImage, imageAlt: 'Edificio residencial contemporáneo' },
  ],
  'construccion-ingenieria': [
    { title: 'Diseño y ejecución', description: 'Soluciones técnicas coordinadas desde la idea hasta la obra.', image: constructionImage, imageAlt: 'Edificación en proceso de construcción' },
    { title: 'Supervisión y especialidades', description: 'Control y coordinación para desarrollar cada proyecto con claridad.', image: residenceDetailImage, imageAlt: 'Proyecto residencial contemporáneo' },
  ],
  'remodelacion-integral': [
    { title: 'Remodelación residencial', description: 'Renovación de espacios para mejorar su funcionalidad y acabado.', image: kitchenImage, imageAlt: 'Cocina remodelada con acabados contemporáneos' },
    { title: 'Acabados y espacios comerciales', description: 'Intervenciones integrales para viviendas, oficinas y locales.', image: commercialImage, imageAlt: 'Espacio comercial contemporáneo' },
  ],
  'administracion-edificios': [
    { title: 'Gestión del edificio', description: 'Organización administrativa para cuidar el funcionamiento del inmueble.', image: managementImage, imageAlt: 'Edificio residencial con áreas comunes' },
    { title: 'Operación y mantenimiento', description: 'Seguimiento de proveedores, incidencias y mantenimiento preventivo.', image: residenceImage, imageAlt: 'Residencia contemporánea con jardín' },
  ],
}

export function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getService(slug)
  if (!service) return <NotFoundPage compact />
  return <><InteriorHero title={service.title} text={service.summary} image={service.image} eyebrow={service.shortName} breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Servicios', to: '/servicios' }, { label: service.shortName }]}><ButtonLink to={`/contacto?servicio=${service.slug}`} variant="light">{service.cta}</ButtonLink></InteriorHero>
    <section className="section service-intro"><div className="container service-intro-grid"><Reveal><FallbackImage src={service.image} alt={service.name} /></Reveal><Reveal><h2>Un enfoque pensado para ordenar decisiones.</h2><p>{service.description}</p><p>La información inicial permite identificar prioridades y preparar un alcance que pueda revisarse antes de avanzar.</p></Reveal></div></section>
    <section className="section service-offerings"><div className="container"><SectionHeading title="Prestaciones que pueden formar parte del alcance." /><div className="offering-groups">{(offeringGroups[service.slug] ?? offeringGroups.inmobiliaria).map((group, groupIndex) => <Reveal className="offering-group" key={group.title}>
      <div className="offering-group-image"><FallbackImage src={group.image} alt={group.imageAlt} /></div>
      <div className="offering-group-content"><span className="offering-group-number">0{groupIndex + 1}</span><h3>{group.title}</h3><p className="offering-group-description">{group.description}</p>
        <ul>{service.services.slice(groupIndex * 4, groupIndex * 4 + 4).map((item) => <li key={item}><CheckCircle size={21} weight="light" aria-hidden="true" /><h4>{item}</h4></li>)}</ul>
      </div>
    </Reveal>)}</div></div></section>
    <section className="section faq-section"><div className="container faq-grid"><div><h2>Preguntas frecuentes</h2><p>Respuestas para orientar una primera conversación.</p>{service.slug === 'inmobiliaria' && <Link to="/propiedades">Ver propiedades</Link>}</div><Accordion items={service.faqs} /></div></section>
    <ContactCTA title={service.cta} text="Cuéntanos qué necesitas y coordinemos una primera conversación." service={service.slug} /></>
}
