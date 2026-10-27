import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { services } from '@/data/services'
import { FallbackImage, Reveal, SectionHeading } from '@/components/ui'

const homeServiceDescriptions: Record<string, string> = {
  inmobiliaria: 'Venta, alquiler, valorización y asesoría inmobiliaria.',
  'construccion-ingenieria': 'Diseño arquitectónico, ingeniería y ejecución de obras.',
  'remodelacion-integral': 'Transformación integral de viviendas, oficinas y espacios comerciales.',
  'administracion-edificios': 'Gestión de edificios, mantenimiento y Facility Management.',
}

export function ServiceRibbon() {
  return <section className="service-ribbon"><div className="container"><p>Un mismo enfoque para cada etapa de tu proyecto.</p><div>{services.map((service) => <Link key={service.slug} to={`/servicios/${service.slug}`}>{service.shortName}<ArrowRight /></Link>)}</div></div></section>
}

export function ServicesShowcase() {
  return (
    <section className="section services-showcase">
      <div className="container">
        <Reveal><SectionHeading title="Soluciones para cada etapa de tu inmueble." text="Cuatro especialidades que se complementan para atender necesidades inmobiliarias, técnicas y operativas." /></Reveal>
        <div className="service-grid">
          {services.map((service, index) => <Reveal key={service.slug} delay={index * 0.06} amount={0.05} className={`service-card service-card-${index + 1}`}>
            <Link to={`/servicios/${service.slug}`}><div className="service-image"><FallbackImage src={service.image} alt={service.name} /></div><div className="service-card-copy"><span>0{index + 1}</span><h3>{service.shortName}</h3><p>{homeServiceDescriptions[service.slug]}</p><b>Conocer servicio <ArrowRight /></b></div></Link>
          </Reveal>)}
        </div>
      </div>
    </section>
  )
}
