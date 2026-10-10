import { Buildings, Compass, HouseLine, PaintBrush } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import studio from '@/assets/images/studio-collaboration.webp'
import construction from '@/assets/images/construction-site.webp'
import { ContactCTA, InteriorHero } from '@/components/sections'
import { FallbackImage, Reveal, SectionHeading } from '@/components/ui'
import { services } from '@/data/services'

const icons = [HouseLine, Compass, PaintBrush, Buildings]

export function AboutPage() {
  return <><InteriorHero title="Conoce Grupo CGL" text="Una propuesta de valor que integra soluciones inmobiliarias, diseño, construcción y gestión." image={studio} breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Nosotros' }]} />
    <section className="section about-intro"><div className="container"><Reveal><h2>Un aliado para mirar el inmueble como un todo.</h2><p>Grupo CGL presenta una oferta que conecta necesidades inmobiliarias, técnicas y operativas. Esta propuesta digital organiza esas áreas para que cada visitante encuentre con claridad el punto de partida adecuado.</p></Reveal><Reveal><FallbackImage src={construction} alt="Profesionales revisando un proyecto, imagen referencial" /></Reveal></div></section>
    <section className="section motivations"><div className="container"><SectionHeading title="Lo que orienta cada conversación." /><div><article><span>01</span><h3>Comprender el objetivo</h3><p>Escuchar el contexto antes de definir una solución.</p></article><article><span>02</span><h3>Coordinar especialidades</h3><p>Conectar los aspectos técnicos y de gestión necesarios.</p></article><article><span>03</span><h3>Dar claridad al proceso</h3><p>Ordenar alcance, decisiones y siguientes pasos.</p></article></div></div></section>
    <section className="section about-areas"><div className="container"><h2>Cuatro áreas, una visión compartida.</h2>{services.map((service, index) => { const Icon = icons[index]; return <Link to={`/servicios/${service.slug}`} key={service.slug}><Icon size={28} weight="light" /><span><strong>{service.shortName}</strong><small>{service.summary}</small></span></Link> })}</div></section>
    <section className="section multidisciplinary"><div className="container"><div><h2>Un equipo multidisciplinario para cada necesidad.</h2><p>Cuando no existen fotografías, nombres y cargos autorizados, una presentación responsable debe hablar de capacidades sin atribuir identidades o credenciales no confirmadas.</p></div><FallbackImage src={studio} alt="Mesa de trabajo multidisciplinaria, imagen referencial" /></div></section><ContactCTA title="Conversemos sobre tu proyecto." /></>
}
