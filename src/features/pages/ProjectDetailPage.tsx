import { ArrowRight } from '@phosphor-icons/react'
import { BadgeCheck, CalendarDays, HardHat, House, Layers3, MapPin, Network, PencilRuler } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs, ButtonLink, FallbackImage } from '@/components/ui'
import { ContactCTA } from '@/components/sections'
import { getProject, projects } from '@/data/projects'
import { Lightbox } from '@/features/projects/components/Lightbox'
import { NotFoundPage } from './NotFoundPage'

const scopeIcons = [PencilRuler, Network, HardHat]

const contactServiceByCategory = {
  Construcción: 'construccion-ingenieria',
  Remodelación: 'remodelacion-integral',
  'Espacios comerciales': 'construccion-ingenieria',
} as const

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFoundPage compact />
  const projectBanner = project.gallery[0] ?? project.image
  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 2)
  const contactUrl = `/contacto?servicio=${contactServiceByCategory[project.category]}&proyecto=${encodeURIComponent(project.title)}`
  const projectDetails = [
    { label: 'Servicio principal', value: project.category, Icon: House },
    { label: 'Ubicación', value: project.location, Icon: MapPin },
    { label: 'Tipo de proyecto', value: project.projectType, Icon: Layers3 },
    { label: 'Estado', value: project.status, Icon: BadgeCheck },
    { label: 'Fecha', value: project.year, Icon: CalendarDays },
  ]
  return <><section className="project-detail-hero project-detail-hero-image">
      <img className="project-detail-hero-background" src={projectBanner} alt="" /><div className="project-detail-hero-overlay" aria-hidden="true" />
      <div className="container"><Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Proyectos', to: '/proyectos' }, { label: project.title }]} /><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p>{project.summary}</p></div>
    </section>
    <section className="container project-gallery-wrap"><Lightbox images={project.gallery} title={project.title} /></section>
    <section className="project-overview" aria-labelledby="project-overview-title"><div className="container">
      <div className="project-overview-panel">
        <div className="project-overview-copy">
          <p className="project-section-kicker"><span aria-hidden="true" />Proyecto destacado</p>
          <h2 id="project-overview-title">{project.title}</h2>
          <p className="project-overview-lead">{project.overviewLead ?? project.summary}</p>
          <p className="project-overview-description">{project.description}</p>
          <ul className="project-overview-services" aria-label="Servicios destacados">
            {project.scope.map((item, index) => { const Icon = scopeIcons[index % scopeIcons.length]; return <li key={item.title}><Icon size={25} strokeWidth={1.6} aria-hidden="true" /><span>{item.title}</span></li> })}
          </ul>
        </div>
        <div className="project-overview-visual" aria-hidden="true"><FallbackImage src={project.image} alt="" /></div>
        <aside className="project-overview-card" aria-label="Detalles del proyecto">
          <dl>{projectDetails.map(({ label, value, Icon }) => <div key={label}><Icon size={22} strokeWidth={1.6} aria-hidden="true" /><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <div className="project-overview-action"><ButtonLink to={contactUrl} className="project-overview-cta">Solicitar asesoría</ButtonLink></div>
        </aside>
      </div>
    </div></section>
    <section className="project-scope" aria-labelledby="project-scope-title"><div className="container project-scope-grid">
      <div className="project-scope-intro"><p className="project-section-kicker"><span aria-hidden="true" />Nuestro proceso</p><h2 id="project-scope-title">Alcance del proyecto</h2><p>Coordinamos cada prestación según los objetivos y requerimientos de este proyecto.</p></div>
      <div className="project-scope-cards">{project.scope.map((item, index) => { const Icon = scopeIcons[index % scopeIcons.length]; return <article key={item.title}><span>0{index + 1}</span><Icon size={30} strokeWidth={1.55} aria-hidden="true" /><h3>{item.title}</h3><p>{item.description}</p></article> })}</div>
    </div></section>
    <section className="section related-projects"><div className="container"><div className="related-projects-heading"><h2>Proyectos relacionados</h2><ButtonLink to="/proyectos" variant="text">Ver todos los proyectos</ButtonLink></div><div className="related-projects-grid">{related.map((item) => <Link key={item.slug} to={`/proyectos/${item.slug}`}><img src={item.image} alt="" /><span><b>{item.title}</b><ArrowRight /></span></Link>)}</div></div></section>
    <ContactCTA title="Conversemos sobre un proyecto similar." text="Cuéntanos tus objetivos y coordinemos una primera conversación." /></>
}
