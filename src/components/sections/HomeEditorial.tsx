import studioImage from '@/assets/images/studio-collaboration.webp'
import buildingImage from '@/assets/images/managed-building.webp'
import { ButtonLink, FallbackImage, Reveal } from '@/components/ui'

export function InstitutionalIntro() {
  return (
    <section className="section institutional"><div className="container institutional-grid">
      <Reveal className="institutional-image"><FallbackImage src={studioImage} alt="Equipo técnico revisando planos" /></Reveal>
      <Reveal className="institutional-copy"><p className="eyebrow">CONOCE GRUPO CGL</p><h2>Una visión integral del sector inmobiliario.</h2><p>Grupo CGL reúne servicios inmobiliarios, construcción, remodelación y gestión de edificios para acompañar distintas necesidades de un mismo inmueble. Una propuesta integral para coordinar decisiones y desarrollar cada proyecto con mayor claridad.</p><ButtonLink to="/nosotros" variant="text">Conoce nuestra empresa</ButtonLink></Reveal>
    </div></section>
  )
}

export function ManagementSpotlight() {
  return (
    <section className="management-spotlight"><FallbackImage src={buildingImage} alt="Edificio residencial contemporáneo" /><div className="management-overlay" /><div className="container management-content"><Reveal><p className="eyebrow">ADMINISTRACIÓN DE EDIFICIOS</p><h2>Cuidar un edificio también es cuidar su valor.</h2><p>Administración de edificios, seguimiento de incidencias, control de morosidad y mantenimiento preventivo para una operación más ordenada.</p><div className="spotlight-benefits"><span>Organización</span><span>Mantenimiento preventivo</span><span>Atención de incidencias</span></div><ButtonLink to="/servicios/administracion-edificios" variant="light">Conocer Facility Management</ButtonLink></Reveal></div></section>
  )
}

