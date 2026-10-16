import apartment from '@/assets/images/apartment-living.webp'
import building from '@/assets/images/managed-building.webp'
import commercial from '@/assets/images/commercial-space.webp'
import construction from '@/assets/images/construction-site.webp'
import hero from '@/assets/images/hero-residence.webp'
import kitchen from '@/assets/images/renovated-kitchen.webp'
import kitchenOne from '@/assets/images/Cocina_integral_1.webp'
import kitchenTwo from '@/assets/images/Cocina_integral_2.webp'
import kitchenThree from '@/assets/images/Cocina_integral_3.webp'
import officeOne from '@/assets/images/oficina_ejecutiva_1.webp'
import officeTwo from '@/assets/images/oficina_ejecutiva_2.webp'
import officeThree from '@/assets/images/oficina_ejecutiva_3.webp'
import residenceTwo from '@/assets/images/residencia_2.webp'
import residenceThree from '@/assets/images/residencia_3.webp'
import workspaceOne from '@/assets/images/Espacio_de_trabajo_1.webp'
import workspaceTwo from '@/assets/images/Espacio_de_trabajo_2.webp'
import workspaceThree from '@/assets/images/Espacio_de_trabajo_3.webp'
import type { Project } from '@/types/content'

export const projects: Project[] = [
  { slug: 'residencia-contemporanea', title: 'Residencia contemporánea', category: 'Construcción', summary: 'Una propuesta que integra estructura, paisaje y materialidad cálida.', image: hero, banner: hero, gallery: [hero, residenceTwo, residenceThree], scope: ['Diseño arquitectónico', 'Coordinación de especialidades', 'Gestión de obra'] },
  { slug: 'cocina-integral', title: 'Cocina integral', category: 'Remodelación', summary: 'Carpintería, piedra e iluminación articuladas para un uso cotidiano.', image: kitchenOne, banner: kitchenOne, gallery: [kitchenOne, kitchenTwo, kitchenThree], scope: ['Diseño interior', 'Mobiliario a medida', 'Acabados e iluminación'] },
  { slug: 'oficina-ejecutiva', title: 'Adecuación de oficina ejecutiva', category: 'Espacios comerciales', summary: 'Recepción y áreas de trabajo con una identidad sobria y funcional.', image: officeOne, banner: officeOne, gallery: [officeOne, officeTwo, officeThree], scope: ['Distribución interior', 'Acabados corporativos', 'Coordinación de instalaciones'] },
  { slug: 'vivienda-urbana', title: 'Vivienda urbana conectada', category: 'Remodelación', summary: 'Ambientes flexibles que amplían la relación entre interior y terraza.', image: apartment, gallery: [apartment, kitchen, building], scope: ['Redistribución', 'Selección de materiales', 'Acondicionamiento interior'] },
  { slug: 'edificio-residencial', title: 'Edificio residencial eficiente', category: 'Construcción', summary: 'Una lectura ordenada de accesos, fachada y espacios compartidos.', image: building, gallery: [building, construction, hero], scope: ['Anteproyecto', 'Desarrollo técnico', 'Coordinación de obra'] },
  { slug: 'espacio-de-trabajo', title: 'Espacio de trabajo flexible', category: 'Espacios comerciales', summary: 'Un entorno profesional con luz, acústica y recorridos claros.', image: workspaceOne, banner: workspaceOne, gallery: [workspaceOne, workspaceTwo, workspaceThree], scope: ['Planeamiento', 'Diseño de espacios', 'Especificación de materiales'] },
]

export const getProject = (slug?: string) => projects.find((project) => project.slug === slug)
