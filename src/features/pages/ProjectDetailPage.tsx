import { ArrowRight } from '@phosphor-icons/react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs, ButtonLink } from '@/components/ui'
import { ContactCTA } from '@/components/sections'
import { getProject, projects } from '@/data/projects'
import { Lightbox } from '@/features/projects/components/Lightbox'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFoundPage compact />
  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 2)
  return <><section className="project-detail-hero"><div className="container"><Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Proyectos', to: '/proyectos' }, { label: project.title }]} /><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p>{project.summary}</p></div></section>
    <section className="container project-gallery-wrap"><Lightbox images={project.gallery} title={project.title} /></section>
    <section className="section project-scope"><div className="container"><div><h2>Alcance del proyecto</h2><p>Coordinamos cada prestación según los objetivos y requerimientos de cada proyecto.</p></div><div>{project.scope.map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3></article>)}</div></div></section>
    <section className="section related-projects"><div className="container"><h2>Proyectos relacionados</h2><div>{related.map((item) => <Link key={item.slug} to={`/proyectos/${item.slug}`}><img src={item.image} alt="" /><span><b>{item.title}</b><ArrowRight /></span></Link>)}</div><ButtonLink to="/proyectos" variant="text">Volver a proyectos</ButtonLink></div></section>
    <ContactCTA title="Conversemos sobre un proyecto similar." text="Cuéntanos tus objetivos y coordinemos una primera conversación." /></>
}
