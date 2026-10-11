import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { FallbackImage } from '@/components/ui'
import { projects } from '@/data/projects'

const filters = ['Todos', 'Construcción', 'Remodelación', 'Espacios comerciales'] as const

export function ProjectGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>('Todos')
  const filtered = active === 'Todos' ? projects : projects.filter((project) => project.category === active)
  return <>
    <div className="portfolio-toolbar">
      <div><h2>Galería de proyectos</h2><p aria-live="polite">{filtered.length} {filtered.length === 1 ? 'proyecto' : 'proyectos'}</p></div>
      <div className="filter-bar" aria-label="Filtrar proyectos">{filters.map((filter) => <button aria-pressed={active === filter} className={active === filter ? 'is-active' : ''} type="button" onClick={() => setActive(filter)} key={filter}>{filter}</button>)}</div>
    </div>
    {filtered.length ? <div className="portfolio-grid">{filtered.map((project) => <article key={project.slug} className="portfolio-item"><Link to={`/proyectos/${project.slug}`}><div className="portfolio-image"><FallbackImage src={project.image} alt={project.title} /></div><div className="portfolio-copy"><small>{project.category}</small><h3>{project.title}</h3><p>{project.summary}</p><b>Ver proyecto <ArrowRight /></b></div></Link></article>)}</div> : <div className="empty-state"><h2>No encontramos proyectos en esta categoría.</h2><p>Prueba con otra categoría o vuelve a consultar la colección completa.</p><button type="button" onClick={() => setActive('Todos')}>Ver todos</button></div>}
  </>
}
