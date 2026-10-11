import apartment from '@/assets/images/apartment-living.webp'
import { InteriorHero } from '@/components/sections'
import { PropertyCatalog } from '@/features/properties/components/PropertyCatalog'

export function PropertiesPage() {
  return <><InteriorHero title="Encuentra el espacio que imaginas." text="Explora oportunidades residenciales y comerciales en Lima." image={apartment} breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Propiedades' }]} />
    <section className="section catalog"><div className="container"><PropertyCatalog /></div></section></>
}
