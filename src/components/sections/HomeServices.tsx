import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { services } from '@/data/services'
import { FallbackImage, Reveal, SectionHeading } from '@/components/ui'

export function ServiceRibbon() {
  return <section className="service-ribbon"><div className="container"><p>Un mismo enfoque para cada etapa de tu proyecto.</p><div>{services.map((service) => <Link key={service.slug} to={`/servicios/${service.slug}`}>{service.shortName}<ArrowRight /></Link>)}</div></div></section>
}

export function ServicesShowcase() {
  return (
    <section className="section services-showcase">
      <div className="container">
        <Reveal><SectionHeading title="Soluciones que se conectan." text="Cada especialidad suma contexto y continuidad para tomar mejores decisiones sobre tu inmueble." /></Reveal>
        <div className="service-grid">
          {services.map((service, index) => <Reveal key={service.slug} delay={index * 0.06} className={`service-card service-card-${index + 1}`}>
            <Link to={`/servicios/${service.slug}`}><div className="service-image"><FallbackImage src={service.image} alt={`${service.name}, imagen referencial`} /></div><div className="service-card-copy"><span>0{index + 1}</span><h3>{service.shortName}</h3><p>{service.summary}</p><b>Conocer servicio <ArrowRight /></b></div></Link>
          </Reveal>)}
        </div>
      </div>
    </section>
  )
}
