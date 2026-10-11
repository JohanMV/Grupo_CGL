import { CheckCircle } from '@phosphor-icons/react'
import { Link, useParams } from 'react-router-dom'
import { Accordion, ButtonLink, FallbackImage, Reveal, SectionHeading } from '@/components/ui'
import { ContactCTA, InteriorHero } from '@/components/sections'
import { getService } from '@/data/services'
import { NotFoundPage } from './NotFoundPage'

export function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getService(slug)
  if (!service) return <NotFoundPage compact />
  return <><InteriorHero title={service.title} text={service.summary} image={service.image} eyebrow={service.shortName} breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Servicios', to: '/servicios' }, { label: service.shortName }]}><ButtonLink to={`/contacto?servicio=${service.slug}`} variant="light">{service.cta}</ButtonLink></InteriorHero>
    <section className="section service-intro"><div className="container service-intro-grid"><Reveal><FallbackImage src={service.image} alt={service.name} /></Reveal><Reveal><h2>Un enfoque pensado para ordenar decisiones.</h2><p>{service.description}</p><p>La información inicial permite identificar prioridades y preparar un alcance que pueda revisarse antes de avanzar.</p></Reveal></div></section>
    <section className="section service-offerings"><div className="container"><SectionHeading title="Prestaciones que pueden formar parte del alcance." /><div className="offering-grid">{service.services.map((item) => <Reveal key={item}><CheckCircle size={24} weight="light" /><h3>{item}</h3><p>El detalle se define después de revisar las condiciones y necesidades del proyecto.</p></Reveal>)}</div></div></section>
    <section className="section service-benefits"><div className="container"><h2>Lo que este enfoque busca aportar.</h2><div>{service.benefits.map((benefit) => <span key={benefit}>{benefit}</span>)}</div></div></section>
    <section className="section service-process"><div className="container"><SectionHeading title="Cómo iniciar una conversación." /><div className="process-grid">{service.steps.map((step, index) => <div key={step}><span>0{index + 1}</span><h3>{step}</h3></div>)}</div></div></section>
    <section className="section faq-section"><div className="container faq-grid"><div><h2>Preguntas frecuentes</h2><p>Respuestas para orientar una primera conversación.</p>{service.slug === 'inmobiliaria' && <Link to="/propiedades">Ver propiedades</Link>}</div><Accordion items={service.faqs} /></div></section>
    <ContactCTA title={service.cta} text="Cuéntanos qué necesitas y coordinemos una primera conversación." service={service.slug} /></>
}
