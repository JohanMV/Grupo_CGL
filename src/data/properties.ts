import apartment from '@/assets/images/apartment-living.webp'
import building from '@/assets/images/managed-building.webp'
import commercial from '@/assets/images/commercial-space.webp'
import hero from '@/assets/images/hero-residence.webp'
import kitchen from '@/assets/images/renovated-kitchen.webp'
import studio from '@/assets/images/studio-collaboration.webp'
import type { Property } from '@/types/content'

export const properties: Property[] = [
  { slug: 'departamento-con-terraza', title: 'Departamento con terraza urbana', operation: 'Venta', type: 'Departamento', zone: 'Lima Moderna', catalogZone: 'Lima Centro', district: 'Miraflores', image: apartment, gallery: [apartment, kitchen, building], spaces: ['Zona social', 'Terraza'], tags: ['Luz natural', 'Terraza', 'Distribución abierta'], description: 'Ambientes conectados, luz natural y una terraza integrada a la zona social.' },
  { slug: 'residencia-con-jardin', title: 'Residencia contemporánea con jardín', operation: 'Venta', type: 'Casa', zone: 'Lima Top', catalogZone: 'Lima Centro', district: 'San Isidro', image: hero, gallery: [hero, apartment, kitchen], spaces: ['Áreas sociales', 'Jardín'], tags: ['Jardín', 'Materiales nobles', 'Áreas sociales'], description: 'Residencia de líneas contemporáneas, espacios sociales amplios y relación directa con el jardín.' },
  { slug: 'oficina-representativa', title: 'Oficina de imagen representativa', operation: 'Alquiler', type: 'Oficina', zone: 'Lima Top', catalogZone: 'Lima Centro', district: 'San Isidro', image: commercial, gallery: [commercial, studio, building], spaces: ['Recepción', 'Áreas colaborativas', 'Salas de reunión'], tags: ['Recepción', 'Salas de reunión', 'Luz natural'], description: 'Oficina profesional con recepción sobria, áreas colaborativas y salas configurables.' },
  { slug: 'departamento-calido', title: 'Departamento de materialidad cálida', operation: 'Alquiler', type: 'Departamento', zone: 'Lima Moderna', catalogZone: 'Lima Este', district: 'La Molina', image: kitchen, gallery: [kitchen, apartment, studio], spaces: ['Cocina integrada', 'Almacenamiento integrado'], tags: ['Cocina integrada', 'Carpintería', 'Iluminación cálida'], description: 'Vivienda funcional con almacenamiento integrado y una atmósfera doméstica serena.' },
  { slug: 'oficina-flexible', title: 'Oficina flexible para equipos', operation: 'Alquiler', type: 'Oficina', zone: 'Otras zonas', catalogZone: 'Callao', district: 'Bellavista', image: studio, gallery: [studio, commercial, building], spaces: ['Zona de concentración', 'Zona de colaboración', 'Reuniones'], tags: ['Espacios flexibles', 'Colaboración', 'Materiales durables'], description: 'Espacio de trabajo adaptable con zonas para concentración, colaboración y reuniones.' },
  { slug: 'casa-urbana', title: 'Casa urbana de líneas limpias', operation: 'Venta', type: 'Casa', zone: 'Otras zonas', catalogZone: 'Lima Sur', district: 'Chorrillos', image: building, gallery: [building, hero, apartment], spaces: ['Acceso', 'Áreas comunes', 'Áreas verdes'], tags: ['Fachada contemporánea', 'Áreas comunes', 'Paisajismo'], description: 'Vivienda urbana con arquitectura contemporánea, acceso claro y áreas verdes integradas.' },
]

export const getProperty = (slug?: string) => properties.find((property) => property.slug === slug)
