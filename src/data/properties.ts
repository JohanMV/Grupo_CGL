import apartment from '@/assets/images/apartment-living.webp'
import building from '@/assets/images/managed-building.webp'
import commercial from '@/assets/images/commercial-space.webp'
import hero from '@/assets/images/hero-residence.webp'
import kitchen from '@/assets/images/renovated-kitchen.webp'
import studio from '@/assets/images/studio-collaboration.webp'
import type { Property } from '@/types/content'

export const properties: Property[] = [
  { slug: 'departamento-con-terraza', title: 'Departamento con terraza urbana', operation: 'Venta', type: 'Departamento', zone: 'Lima Moderna', image: apartment, gallery: [apartment, kitchen, building], tags: ['Luz natural', 'Terraza', 'Distribución abierta'], description: 'Concepto de vivienda urbana con ambientes conectados, luz natural y una terraza integrada a la zona social.' },
  { slug: 'residencia-con-jardin', title: 'Residencia contemporánea con jardín', operation: 'Venta', type: 'Casa', zone: 'Lima Top', image: hero, gallery: [hero, apartment, kitchen], tags: ['Jardín', 'Materiales nobles', 'Áreas sociales'], description: 'Presentación referencial de una residencia de líneas contemporáneas, espacios sociales amplios y relación directa con el jardín.' },
  { slug: 'oficina-representativa', title: 'Oficina de imagen representativa', operation: 'Alquiler', type: 'Oficina', zone: 'Lima Top', image: commercial, gallery: [commercial, studio, building], tags: ['Recepción', 'Salas de reunión', 'Luz natural'], description: 'Ejemplo de oficina profesional con recepción sobria, áreas colaborativas y salas configurables.' },
  { slug: 'departamento-calido', title: 'Departamento de materialidad cálida', operation: 'Alquiler', type: 'Departamento', zone: 'Lima Moderna', image: kitchen, gallery: [kitchen, apartment, studio], tags: ['Cocina integrada', 'Carpintería', 'Iluminación cálida'], description: 'Concepto interior que prioriza funcionalidad, almacenamiento y una atmósfera doméstica serena.' },
  { slug: 'oficina-flexible', title: 'Oficina flexible para equipos', operation: 'Alquiler', type: 'Oficina', zone: 'Otras zonas', image: studio, gallery: [studio, commercial, building], tags: ['Espacios flexibles', 'Colaboración', 'Materiales durables'], description: 'Ejemplo de espacio de trabajo adaptable con zonas para concentración, colaboración y reuniones.' },
  { slug: 'casa-urbana', title: 'Casa urbana de líneas limpias', operation: 'Venta', type: 'Casa', zone: 'Otras zonas', image: building, gallery: [building, hero, apartment], tags: ['Fachada contemporánea', 'Áreas comunes', 'Paisajismo'], description: 'Presentación visual de una vivienda urbana donde arquitectura, acceso y vegetación forman un conjunto equilibrado.' },
]

export const getProperty = (slug?: string) => properties.find((property) => property.slug === slug)
