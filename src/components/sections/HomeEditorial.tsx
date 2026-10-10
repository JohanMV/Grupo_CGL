import { Buildings, Compass, Handshake, Ruler } from '@phosphor-icons/react'
import studioImage from '@/assets/images/studio-collaboration.webp'
import buildingImage from '@/assets/images/managed-building.webp'
import { ButtonLink, FallbackImage, Reveal } from '@/components/ui'

export function InstitutionalIntro() {
  return (
    <section className="section institutional"><div className="container institutional-grid">
      <Reveal className="institutional-image"><FallbackImage src={studioImage} alt="Equipo técnico revisando planos, imagen referencial" /><span>Imagen referencial</span></Reveal>
      <Reveal className="institutional-copy"><p className="eyebrow">CONOCE GRUPO CGL</p><h2>Una visión integral del sector inmobiliario.</h2><p>El valor de un proyecto también está en cómo se coordinan sus decisiones. Grupo CGL reúne distintas especialidades para orientar cada necesidad con criterio técnico y una comunicación clara.</p><ButtonLink to="/nosotros" variant="text">Conoce nuestra empresa</ButtonLink></Reveal>
    </div></section>
  )
}

export function ManagementSpotlight() {
  return (
    <section className="management-spotlight"><FallbackImage src={buildingImage} alt="Edificio residencial contemporáneo de referencia" /><div className="management-overlay" /><div className="container management-content"><Reveal><p className="eyebrow">ADMINISTRACIÓN DE EDIFICIOS</p><h2>Cuidar un edificio también es cuidar su valor.</h2><p>Gestión administrativa, mantenimiento preventivo y seguimiento de incidencias para sostener el funcionamiento cotidiano.</p><div className="spotlight-benefits"><span>Organización</span><span>Mantenimiento preventivo</span><span>Atención de incidencias</span></div><ButtonLink to="/servicios/administracion-edificios" variant="light">Conocer Facility Management</ButtonLink></Reveal></div><p className="reference-note">Imagen generada para esta propuesta conceptual</p></section>
  )
}

const pillars = [
  { icon: Compass, title: 'Enfoque integral', text: 'Una lectura completa de las necesidades del inmueble.' },
  { icon: Handshake, title: 'Atención personalizada', text: 'Orientación conectada con el objetivo de cada cliente.' },
  { icon: Ruler, title: 'Visión técnica', text: 'Criterios claros para ordenar decisiones y alcances.' },
  { icon: Buildings, title: 'Acompañamiento', text: 'Coordinación durante las etapas definidas del servicio.' },
]

export function ValuePillars() {
  return <section className="section pillars"><div className="container"><Reveal><h2>Una mirada completa sobre cada inmueble.</h2></Reveal><div className="pillar-grid">{pillars.map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * 0.06}><Icon size={30} weight="thin" /><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>
}
