import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import studioImage from '@/assets/images/studio-collaboration.webp'
import { ContactCTA, InteriorHero } from '@/components/sections'
import { FallbackImage, Reveal, SectionHeading } from '@/components/ui'
import { services } from '@/data/services'

const complements = ['Valorización de inmuebles', 'Orientación documental', 'Expedientes técnicos', 'Instalaciones', 'Adecuación para alquiler temporal', 'Supervisión de proveedores']

export function ServicesPage() {
  return <><InteriorHero title="Servicios integrales para cada proyecto" text="Cuatro áreas especializadas que pueden trabajar de forma independiente o conectarse alrededor de una misma necesidad." image={studioImage} breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Servicios' }]} />
    <section className="section service-list"><div className="container">{services.map((service, index) => <Reveal key={service.slug}><article className={`service-row ${index % 2 ? 'service-row-reverse' : ''}`}><FallbackImage src={service.image} alt={service.name} /><div><span>0{index + 1}</span><h2>{service.name}</h2><p>{service.description}</p><ul>{service.services.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul><Link to={`/servicios/${service.slug}`}>Conocer servicio <ArrowRight /></Link></div></article></Reveal>)}</div></section>
    <section className="section complements"><div className="container"><SectionHeading title="Servicios que completan la mirada." text="Cada prestación se vincula con una especialidad principal para evitar recorridos fragmentados." /><div>{complements.map((item) => <span key={item}>{item}</span>)}</div></div></section>
    <section className="section integrated-value"><div className="container"><h2>Un proyecto puede comenzar en una especialidad y necesitar el criterio de otra.</h2><p>La propuesta integral permite coordinar decisiones inmobiliarias, técnicas y operativas dentro de una experiencia más clara.</p></div></section><ContactCTA /></>
}
