import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { FallbackImage } from '@/components/ui'
import { projects } from '@/data/projects'

const filters = ['Todos', 'Construcción', 'Remodelación', 'Espacios comerciales'] as const

export function ProjectGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>('Todos')
  const filtered = active === 'Todos' ? projects : projects.filter((project) => project.category === active)
  return <><div className="filter-bar" aria-label="Filtrar proyectos">{filters.map((filter) => <button className={active === filter ? 'is-active' : ''} type="button" onClick={() => setActive(filter)} key={filter}>{filter}</button>)}</div>
    {filtered.length ? <div className="portfolio-grid">{filtered.map((project, index) => <article key={project.slug} className={`portfolio-item portfolio-item-${index % 4}`}><Link to={`/proyectos/${project.slug}`}><FallbackImage src={project.image} alt={`${project.title}, proyecto visual conceptual`} /><div><small>Conceptual / {project.category}</small><h2>{project.title}</h2><p>{project.summary}</p><span>Ver detalle <ArrowRight /></span></div></Link></article>)}</div> : <div className="empty-state"><h2>No encontramos conceptos en este filtro.</h2><button type="button" onClick={() => setActive('Todos')}>Ver todos</button></div>}
  </>
}
