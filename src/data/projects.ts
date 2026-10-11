import apartment from '@/assets/images/apartment-living.webp'
import building from '@/assets/images/managed-building.webp'
import commercial from '@/assets/images/commercial-space.webp'
import construction from '@/assets/images/construction-site.webp'
import hero from '@/assets/images/hero-residence.webp'
import kitchen from '@/assets/images/renovated-kitchen.webp'
import studio from '@/assets/images/studio-collaboration.webp'
import type { Project } from '@/types/content'

export const projects: Project[] = [
  { slug: 'residencia-contemporanea', title: 'Residencia contemporánea', category: 'Construcción', summary: 'Una propuesta que integra estructura, paisaje y materialidad cálida.', image: hero, gallery: [hero, studio, construction], scope: ['Diseño arquitectónico', 'Coordinación de especialidades', 'Gestión de obra'] },
  { slug: 'cocina-integral', title: 'Cocina integral', category: 'Remodelación', summary: 'Carpintería, piedra e iluminación articuladas para un uso cotidiano.', image: kitchen, gallery: [kitchen, apartment, studio], scope: ['Diseño interior', 'Mobiliario a medida', 'Acabados e iluminación'] },
  { slug: 'oficina-ejecutiva', title: 'Adecuación de oficina ejecutiva', category: 'Espacios comerciales', summary: 'Recepción y áreas de trabajo con una identidad sobria y funcional.', image: commercial, gallery: [commercial, studio, kitchen], scope: ['Distribución interior', 'Acabados corporativos', 'Coordinación de instalaciones'] },
  { slug: 'vivienda-urbana', title: 'Vivienda urbana conectada', category: 'Remodelación', summary: 'Ambientes flexibles que amplían la relación entre interior y terraza.', image: apartment, gallery: [apartment, kitchen, building], scope: ['Redistribución', 'Selección de materiales', 'Acondicionamiento interior'] },
  { slug: 'edificio-residencial', title: 'Edificio residencial eficiente', category: 'Construcción', summary: 'Una lectura ordenada de accesos, fachada y espacios compartidos.', image: building, gallery: [building, construction, hero], scope: ['Anteproyecto', 'Desarrollo técnico', 'Coordinación de obra'] },
  { slug: 'espacio-de-trabajo', title: 'Espacio de trabajo flexible', category: 'Espacios comerciales', summary: 'Un entorno profesional con luz, acústica y recorridos claros.', image: studio, gallery: [studio, commercial, construction], scope: ['Planeamiento', 'Diseño de espacios', 'Especificación de materiales'] },
]

export const getProject = (slug?: string) => projects.find((project) => project.slug === slug)
