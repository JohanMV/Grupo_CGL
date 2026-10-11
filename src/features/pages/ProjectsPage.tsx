import studio from '@/assets/images/studio-collaboration.webp'
import { ContactCTA, InteriorHero } from '@/components/sections'
import { ProjectGrid } from '@/features/projects/components/ProjectGrid'

export function ProjectsPage() {
  return <div className="projects-page"><InteriorHero title="Proyectos y soluciones" text="Propuestas de construcción, remodelación y espacios comerciales pensadas para transformar cada entorno." image={studio} breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Proyectos' }]} />
    <section className="section portfolio"><div className="container"><ProjectGrid /></div></section><ContactCTA title="Transformemos tu próximo espacio." text="Cuéntanos qué necesitas construir, remodelar o adecuar y conversemos sobre el alcance de tu proyecto." /></div>
}
