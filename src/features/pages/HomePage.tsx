import { ContactCTA, FeaturedProjects, HomeHero, InstitutionalIntro, ManagementSpotlight, Methodology, PropertyPreview, ServiceRibbon, ServicesShowcase } from '@/components/sections'

export function HomePage() {
  return <><HomeHero /><ServiceRibbon /><ServicesShowcase /><InstitutionalIntro /><FeaturedProjects /><ManagementSpotlight /><PropertyPreview /><Methodology /><ContactCTA text="¿Buscas comprar, construir, remodelar o administrar un inmueble? Cuéntanos qué necesitas y descubre cómo podemos acompañar tu proyecto." /></>
}
