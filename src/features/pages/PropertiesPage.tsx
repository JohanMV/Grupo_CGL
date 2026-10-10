import apartment from '@/assets/images/apartment-living.webp'
import { InteriorHero } from '@/components/sections'
import { PropertyCatalog } from '@/features/properties/components/PropertyCatalog'

export function PropertiesPage() {
  return <><InteriorHero title="Encuentra el espacio que imaginas." text="Explora una colección demostrativa pensada para mostrar una experiencia inmobiliaria más clara." image={apartment} breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Propiedades' }]} />
    <section className="concept-notice"><div className="container"><strong>Propiedades ilustrativas</strong><p>No constituyen ofertas reales ni están disponibles para comercialización.</p></div></section>
    <section className="section catalog"><div className="container"><PropertyCatalog /></div></section></>
}
