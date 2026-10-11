import { ArrowRight, Building, ChartBar, ClipboardList, FileText, HardHat, House, Paintbrush, Ruler, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import studioImage from '@/assets/images/studio-collaboration.webp'
import { InteriorHero } from '@/components/sections'
import { ButtonLink, FallbackImage, SectionHeading } from '@/components/ui'
import { services } from '@/data/services'

const specialtyCopy: Record<string, { description: string; features: string[]; imageAlt: string }> = {
  inmobiliaria: {
    description: 'Asesoría para vender, alquilar y potenciar el valor comercial de tus propiedades.',
    features: ['Venta y alquiler de propiedades', 'Captación y promoción inmobiliaria', 'Valorización comercial'],
    imageAlt: 'Interior residencial luminoso con terraza',
  },
  'construccion-ingenieria': {
    description: 'Soluciones de diseño, ingeniería y ejecución para proyectos residenciales y comerciales.',
    features: ['Diseño y planos arquitectónicos', 'Construcción de viviendas y edificaciones', 'Supervisión y ejecución de obras'],
    imageAlt: 'Estructura arquitectónica en proceso de construcción',
  },
  'remodelacion-integral': {
    description: 'Transformamos viviendas y espacios comerciales con soluciones de diseño, adecuación y acabados.',
    features: ['Remodelación de cocinas y baños', 'Drywall, melamina y acabados', 'Adecuación de oficinas y locales comerciales'],
    imageAlt: 'Cocina contemporánea con acabados cálidos',
  },
  'administracion-edificios': {
    description: 'Gestión administrativa y mantenimiento para conservar el funcionamiento y valor de los inmuebles.',
    features: ['Administración de edificios y condominios', 'Facility Management', 'Mantenimiento preventivo y gestión de incidencias'],
    imageAlt: 'Fachada de edificio residencial contemporáneo',
  },
}

const complements = [
  { title: 'Valorización de inmuebles', description: 'Evaluación comercial para orientar decisiones de venta, alquiler e inversión.', icon: ChartBar, service: 'inmobiliaria' },
  { title: 'Orientación documental', description: 'Asesoría sobre documentación y gestiones relacionadas con inmuebles.', icon: FileText, service: 'inmobiliaria' },
  { title: 'Expedientes técnicos', description: 'Documentación técnica vinculada al diseño y ejecución de proyectos.', icon: Ruler, service: 'construccion-ingenieria' },
  { title: 'Instalaciones', description: 'Soluciones de instalaciones y acondicionamiento para viviendas y espacios comerciales.', icon: Wrench, service: 'construccion-ingenieria' },
  { title: 'Adecuación para alquiler temporal', description: 'Preparación y mejora de inmuebles destinados al alquiler temporal.', icon: House, service: 'inmobiliaria' },
  { title: 'Supervisión de proveedores', description: 'Coordinación y seguimiento de servicios relacionados con la gestión de inmuebles.', icon: ClipboardList, service: 'administracion-edificios' },
]

const closingSpecialties = [
  { label: 'Inmobiliaria', icon: House },
  { label: 'Construcción', icon: HardHat },
  { label: 'Remodelación', icon: Paintbrush },
  { label: 'Administración', icon: Building },
]

export function ServicesPage() {
  return <div className="services-page">
    <InteriorHero title="Servicios integrales para cada proyecto" text="Cuatro áreas especializadas que pueden trabajar de forma independiente o conectarse alrededor de una misma necesidad." image={studioImage} breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Servicios' }]} />

    <section className="services-specialties"><div className="container">
      <SectionHeading title="Soluciones para cada proyecto." text="Conoce nuestras especialidades en inmobiliaria, construcción, remodelación y administración de edificios." />
      <div className="services-specialty-grid">{services.map((service, index) => {
        const copy = specialtyCopy[service.slug]
        return <article className="services-specialty-card" key={service.slug}>
          <div className="services-specialty-image"><FallbackImage src={service.image} alt={copy?.imageAlt ?? service.name} /></div>
          <div className="services-specialty-content">
            <span className="services-specialty-number">0{index + 1}</span>
            <h3>{service.name}</h3>
            <p>{copy?.description ?? service.description}</p>
            <ul>{(copy?.features ?? service.services.slice(0, 3)).map((item) => <li key={item}>{item}</li>)}</ul>
            <Link to={`/servicios/${service.slug}`}>Conocer servicio <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </article>
      })}</div>
    </div></section>

    <section className="services-complements"><div className="container">
      <SectionHeading title="Más soluciones para tu inmueble." text="Servicios especializados que complementan nuestras principales áreas de trabajo." />
      <div className="services-complement-grid">{complements.map(({ title, description, icon: Icon, service }) => <article className="services-complement-card" key={title}>
        <Icon size={29} strokeWidth={1.5} aria-hidden="true" />
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={`/servicios/${service}`} aria-label={`Conocer la especialidad relacionada con ${title}`}>Ver especialidad <ArrowRight size={16} aria-hidden="true" /></Link>
      </article>)}</div>
    </div></section>

    <section className="services-closing" aria-labelledby="services-closing-title"><div className="container services-closing-grid">
      <div className="services-closing-copy"><h2 id="services-closing-title">Tu próximo proyecto comienza aquí.</h2><p>Ya sea que necesites vender, construir, remodelar o administrar un inmueble, descubre cómo nuestras especialidades pueden ayudarte a avanzar.</p><ButtonLink to="/contacto" variant="light">Solicitar asesoría</ButtonLink></div>
      <div className="services-closing-disciplines" aria-label="Especialidades de Grupo CGL">{closingSpecialties.map(({ label, icon: Icon }, index) => <div key={label}><span>0{index + 1}</span><Icon size={29} strokeWidth={1.5} aria-hidden="true" /><strong>{label}</strong></div>)}</div>
    </div></section>
  </div>
}
