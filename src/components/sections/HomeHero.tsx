import { motion, useReducedMotion } from 'motion/react'
import heroImage from '@/assets/images/hero-residence.webp'
import { ButtonLink, FallbackImage } from '@/components/ui'

export function HomeHero() {
  const reduce = useReducedMotion()
  const animation = (delay: number) => reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const } }
  return (
    <section className="home-hero">
      <FallbackImage src={heroImage} alt="Residencia contemporánea al atardecer" loading="eager" />
      <div className="hero-scrim" />
      <div className="container hero-content">
        <motion.p className="eyebrow" {...animation(0.05)}>INMOBILIARIA · CONSTRUCCIÓN · GESTIÓN</motion.p>
        <motion.h1 {...animation(0.12)}>Soluciones integrales para tus proyectos inmobiliarios.</motion.h1>
        <motion.p className="hero-copy" {...animation(0.19)}>Inmobiliaria, construcción, remodelación y administración de edificios. Soluciones profesionales para cada etapa de tu inmueble.</motion.p>
        <motion.div className="hero-actions" {...animation(0.26)}><ButtonLink to="/servicios" variant="light">Explorar servicios</ButtonLink><ButtonLink to="/contacto" variant="secondary">Solicitar asesoría</ButtonLink></motion.div>
      </div>
    </section>
  )
}
