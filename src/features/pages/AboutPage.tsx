import { Buildings, Compass, Handshake, Ruler } from '@phosphor-icons/react'
import studio from '@/assets/images/studio-collaboration.webp'
import { ContactCTA, InteriorHero } from '@/components/sections'
import { Reveal } from '@/components/ui'

const differentials = [
  { icon: Compass, title: 'Visión integral', text: 'Cada necesidad se analiza considerando el inmueble como un conjunto.' },
  { icon: Buildings, title: 'Especialidades conectadas', text: 'Las áreas inmobiliaria, técnica y operativa se articulan bajo una misma visión.' },
  { icon: Handshake, title: 'Atención personalizada', text: 'La orientación parte del contexto, los objetivos y las prioridades de cada cliente.' },
  { icon: Ruler, title: 'Criterio técnico', text: 'Los alcances y decisiones se revisan con orden, claridad y atención al detalle.' },
]

export function AboutPage() {
  return <>
    <InteriorHero
      title="Conoce Grupo CGL"
      text="Integramos soluciones inmobiliarias, construcción, remodelación y gestión para acompañar cada inmueble con una mirada coordinada."
      image={studio}
      breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Nosotros' }]}
    />

    <section className="about-vision">
      <div className="container about-vision-grid">
        <Reveal><h2>Una visión integral del sector inmobiliario.</h2></Reveal>
        <Reveal className="about-vision-copy" delay={0.08}>
          <p>Grupo CGL reúne especialidades vinculadas al inmueble para atender a propietarios, inversionistas y clientes que buscan soluciones conectadas. Un enfoque que facilita la coordinación y permite tomar decisiones con mayor claridad.</p>
          <strong>Cada especialidad aporta su mirada. La coordinación les da sentido.</strong>
        </Reveal>
      </div>
    </section>

    <section className="about-values">
      <div className="container">
        <Reveal className="about-values-heading">
          <h2>Confianza construida desde la forma de trabajar.</h2>
          <p>Un acompañamiento claro, cercano y bien coordinado en cada etapa.</p>
        </Reveal>
        <div className="about-values-grid">
          {differentials.map(({ icon: Icon, title, text }, index) => (
            <article className="about-value" key={title}>
              <Reveal delay={index * 0.06}>
                <Icon size={28} weight="light" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>

    <ContactCTA
      title="Construyamos el siguiente paso de tu proyecto."
      text="Conversemos sobre tu necesidad y descubre cómo las soluciones de Grupo CGL pueden acompañarla."
    />
  </>
}
