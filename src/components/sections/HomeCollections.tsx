import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { projects } from '@/data/projects'
import { properties } from '@/data/properties'
import { ButtonLink, FallbackImage, Reveal, SectionHeading } from '@/components/ui'

export function FeaturedProjects() {
  return <section className="section featured-projects"><div className="container"><Reveal><SectionHeading title="Proyectos de construcción y remodelación." text="Conceptos visuales creados para esta demostración. No corresponden a obras verificadas de Grupo CGL." /></Reveal><div className="projects-asym">{projects.slice(0, 3).map((project, index) => <Reveal key={project.slug} className={`project-tile project-tile-${index + 1}`}><Link to={`/proyectos/${project.slug}`}><FallbackImage src={project.image} alt={`${project.title}, ejemplo conceptual`} /><div><small>Conceptual / {project.category}</small><h3>{project.title}</h3><span>Ver concepto <ArrowRight /></span></div></Link></Reveal>)}</div><ButtonLink to="/proyectos" variant="text">Explorar proyectos</ButtonLink></div></section>
}

export function PropertyPreview() {
  return <section className="section property-preview"><div className="container"><Reveal><SectionHeading title="Explora propiedades y oportunidades." text="Catálogo ilustrativo. Las fichas son demostrativas y no constituyen ofertas inmobiliarias activas." /></Reveal><div className="property-preview-grid">{properties.slice(0, 3).map((property, index) => <Reveal key={property.slug} delay={index * 0.06}><article className="property-card"><Link to={`/propiedades/${property.slug}`}><div className="property-image"><FallbackImage src={property.image} alt={`${property.title}, presentación ilustrativa`} /></div><div className="property-copy"><small>Ficha demostrativa</small><h3>{property.title}</h3><p>{property.type}<span aria-hidden="true">/</span>{property.zone}</p><div>{property.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div><b>Ver presentación <ArrowRight /></b></div></Link></article></Reveal>)}</div><ButtonLink to="/propiedades" variant="text">Ver catálogo de ejemplo</ButtonLink></div></section>
}

const steps = [
  ['01', 'Cuéntanos tu necesidad', 'Conocemos tus objetivos y el tipo de servicio que buscas.'],
  ['02', 'Evaluamos tu proyecto', 'Revisamos las características y requerimientos relevantes.'],
  ['03', 'Preparamos una propuesta', 'Definimos una solución y un alcance según tu necesidad.'],
  ['04', 'Acompañamos el desarrollo', 'Coordinamos las etapas previstas para el servicio contratado.'],
]

export function Methodology() {
  return <section className="section methodology"><div className="container"><Reveal><SectionHeading title="Así desarrollamos cada proyecto." /></Reveal><div className="method-grid">{steps.map(([number, title, text], index) => <Reveal key={number} delay={index * 0.06}><span>{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div><p className="method-note">Proceso general referencial. Las etapas pueden variar según el servicio y el alcance acordado.</p></div></section>
}
