import { ArrowRight as PhosphorArrowRight } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, FileSearch, HardHat, MessagesSquare, PencilRuler } from 'lucide-react'
import { Link } from 'react-router-dom'
import procesoDesarrollo from '@/assets/images/proceso-desarrollo.webp'
import procesoEvaluacion from '@/assets/images/proceso-evaluacion.webp'
import procesoNecesidad from '@/assets/images/proceso-necesidad.png'
import procesoPropuesta from '@/assets/images/proceso-propuesta.webp'
import procesoSeccionBg from '@/assets/images/proceso-seccion-bg.webp'
import { projects } from '@/data/projects'
import { properties } from '@/data/properties'
import { ButtonLink, FallbackImage, Reveal, SectionHeading } from '@/components/ui'
import { PropertyCard } from '@/features/properties/components/PropertyCatalog'

export function FeaturedProjects() {
  return <section className="section featured-projects"><div className="container"><Reveal><SectionHeading title="Proyectos de construcción y remodelación." text="Soluciones desarrolladas para transformar viviendas, edificios y espacios de trabajo." /></Reveal><div className="projects-asym">{projects.slice(0, 3).map((project, index) => <Reveal key={project.slug} className={`project-tile project-tile-${index + 1}`}><Link to={`/proyectos/${project.slug}`}><FallbackImage src={project.image} alt={project.title} /><div><small>{project.category}</small><h3>{project.title}</h3><span>Ver proyecto <PhosphorArrowRight /></span></div></Link></Reveal>)}</div><ButtonLink to="/proyectos" variant="text">Explorar proyectos</ButtonLink></div></section>
}

export function PropertyPreview() {
  return <section className="section property-preview"><div className="container"><Reveal><SectionHeading title="Explora propiedades y oportunidades." text="Encuentra espacios residenciales y comerciales para tus próximos proyectos." /></Reveal><div className="property-related-grid property-preview-list">{properties.slice(0, 3).map((property) => <PropertyCard property={property} headingLevel="h3" key={property.slug} />)}</div><ButtonLink to="/propiedades" variant="text">Ver propiedades</ButtonLink></div></section>
}

const steps = [
  {
    number: '01',
    label: 'PRIMER CONTACTO',
    title: 'Cuéntanos tu necesidad',
    summary: 'Conocemos tus objetivos y el tipo de servicio que buscas.',
    detailTitle: 'Todo comienza con tu idea.',
    detail: 'Conversamos sobre tus objetivos, el tipo de inmueble o espacio y tus expectativas para entender qué solución necesitas.',
    image: procesoNecesidad,
    icon: MessagesSquare,
  },
  {
    number: '02',
    label: 'EVALUACIÓN',
    title: 'Evaluamos tu proyecto',
    summary: 'Revisamos las características y requerimientos relevantes.',
    detailTitle: 'Analizamos las necesidades del proyecto.',
    detail: 'Revisamos la información disponible, las condiciones del espacio y los requerimientos para identificar un enfoque adecuado.',
    image: procesoEvaluacion,
    icon: FileSearch,
  },
  {
    number: '03',
    label: 'PROPUESTA',
    title: 'Preparamos una propuesta',
    summary: 'Definimos una solución y un alcance según tu necesidad.',
    detailTitle: 'Una solución clara y estructurada.',
    detail: 'Preparamos una propuesta que establece el alcance, los entregables y las condiciones correspondientes al servicio solicitado.',
    image: procesoPropuesta,
    icon: PencilRuler,
  },
  {
    number: '04',
    label: 'DESARROLLO',
    title: 'Acompañamos el desarrollo',
    summary: 'Coordinamos las etapas previstas para el servicio contratado.',
    detailTitle: 'Te acompañamos durante el proceso.',
    detail: 'Coordinamos las actividades previstas, mantenemos la comunicación y damos seguimiento al desarrollo según los acuerdos establecidos.',
    image: procesoDesarrollo,
    icon: HardHat,
  },
]

export function Methodology() {
  const [activeStep, setActiveStep] = useState(1)
  const reduceMotion = useReducedMotion()
  const selectedStep = steps[activeStep]
  const MobileIcon = selectedStep.icon
  const move = (direction: number) => setActiveStep((current) => (current + direction + steps.length) % steps.length)

  return <section className="section methodology" aria-labelledby="methodology-title">
    <img className="methodology-background" src={procesoSeccionBg} alt="" aria-hidden="true" loading="lazy" decoding="async" />
    <div className="container methodology-container">
      <Reveal className="methodology-header">
        <div className="methodology-heading">
          <p className="methodology-eyebrow"><span aria-hidden="true" />Nuestro proceso</p>
          <h2 id="methodology-title">Así desarrollamos cada proyecto.</h2>
        </div>
        <p className="methodology-intro">Un proceso claro y personalizado, desde la primera conversación hasta el desarrollo de tu proyecto.</p>
      </Reveal>

      <div className="method-mobile">
        <div className="method-mobile-steps" role="group" aria-label="Seleccionar etapa del proceso">
          {steps.map((step, index) => {
            const isActive = activeStep === index
            return <div className={`method-mobile-step${isActive ? ' is-active' : ''}${index <= activeStep ? ' is-complete' : ''}`} key={step.number}>
              <button
                type="button"
                aria-label={`Etapa ${step.number}: ${step.title}`}
                aria-pressed={isActive}
                aria-controls="method-mobile-card"
                onClick={() => setActiveStep(index)}
              >{step.number}</button>
              <span aria-hidden="true" />
            </div>
          })}
        </div>

        <motion.div
          className="method-mobile-card-shell"
          id="method-mobile-card"
          layout={!reduceMotion}
          transition={{ duration: .28, ease: [0.16, 1, 0.3, 1] }}
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              className="method-mobile-card"
              key={selectedStep.number}
              initial={reduceMotion ? false : { opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -10 }}
              transition={{ duration: .22, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="method-card-media" aria-hidden="true">
                <img className="method-card-photo" src={selectedStep.image} alt="" decoding="async" />
                <span className="method-card-overlay" />
              </span>
              <div className="method-mobile-card-topline">
                <span className="method-mobile-icon"><MobileIcon size={24} strokeWidth={1.9} aria-hidden="true" /></span>
                <span>Etapa {selectedStep.number} / 04</span>
              </div>
              <p className="method-mobile-label">{selectedStep.label}</p>
              <h3>{selectedStep.title}</h3>
              <p className="method-mobile-detail">{selectedStep.detail}</p>
              <div className="method-mobile-card-footer">
                <span>Paso {activeStep + 1} de {steps.length}</span>
                <div className="method-mobile-controls">
                  <button type="button" onClick={() => move(-1)} aria-label="Ver etapa anterior"><ArrowLeft size={20} strokeWidth={1.7} aria-hidden="true" /></button>
                  <button type="button" onClick={() => move(1)} aria-label="Ver etapa siguiente"><ArrowRight size={20} strokeWidth={1.7} aria-hidden="true" /></button>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="method-timeline">
        <div className="method-connector" aria-hidden="true" />
        <div className="method-grid" role="group" aria-label="Etapas de nuestro proceso">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === index
            return <motion.button
              className={`method-card${isActive ? ' is-active' : ''}`}
              type="button"
              key={step.number}
              aria-pressed={isActive}
              onClick={() => setActiveStep(index)}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              whileTap={reduceMotion ? undefined : { scale: .99 }}
              transition={{ duration: .24, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="method-card-media" aria-hidden="true">
                <img className="method-card-photo" src={step.image} alt="" loading="lazy" decoding="async" />
                <span className="method-card-overlay" />
              </span>
              <span className="method-step-number">{step.number}</span>
              <span className="method-icon"><Icon size={26} strokeWidth={1.9} aria-hidden="true" /></span>
              <strong>{step.title}</strong>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  className={`method-summary${isActive ? ' method-card-detail' : ''}`}
                  key={isActive ? `${step.number}-detail` : `${step.number}-summary`}
                  initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
                  transition={{ duration: .18, ease: [0.16, 1, 0.3, 1] }}
                >
                  {isActive && <span className="method-card-detail-title">{step.detailTitle}</span>}
                  {isActive ? step.detail : step.summary}
                </motion.span>
              </AnimatePresence>
              <ArrowRight className="method-card-arrow" size={20} strokeWidth={1.7} aria-hidden="true" />
            </motion.button>
          })}
        </div>
      </div>

      <div className="method-footer">
        <p className="method-note">Cada etapa se coordina según el servicio y el alcance acordado.</p>
        <div className="method-progress" role="img" aria-label={`Etapa ${activeStep + 1} de ${steps.length}`}>
          {steps.map((step, index) => <span key={step.number} className={index <= activeStep ? 'is-complete' : ''} />)}
        </div>
      </div>
    </div>
  </section>
}
