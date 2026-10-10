import studio from '@/assets/images/studio-collaboration.webp'
import { ContactCTA, InteriorHero } from '@/components/sections'
import { ProjectGrid } from '@/features/projects/components/ProjectGrid'

export function ProjectsPage() {
  return <><InteriorHero title="Proyectos y espacios" text="Una muestra editorial de cómo podrían presentarse distintas líneas de proyecto." image={studio} breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Proyectos' }]} />
    <section className="concept-notice"><div className="container"><strong>Contenido conceptual</strong><p>Estos proyectos visuales son referencias creadas para la propuesta. No son obras verificadas de Grupo CGL.</p></div></section>
    <section className="section portfolio"><div className="container"><ProjectGrid /></div></section><ContactCTA title="¿Tienes un proyecto similar?" text="Cuéntanos el espacio que quieres construir, transformar o adecuar." /></>
}
