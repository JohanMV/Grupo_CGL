import apartment from '@/assets/images/apartment-living.webp'
import building from '@/assets/images/managed-building.webp'
import commercial from '@/assets/images/commercial-space.webp'
import hero from '@/assets/images/hero-residence.webp'
import kitchen from '@/assets/images/renovated-kitchen.webp'
import studio from '@/assets/images/studio-collaboration.webp'
import type { Property } from '@/types/content'

export const properties: Property[] = [
  {
    slug: 'departamento-con-terraza', title: 'Departamento con terraza urbana', operation: 'Venta', type: 'Departamento', zone: 'Lima Moderna', catalogZone: 'Lima Centro', district: 'Miraflores', image: apartment,
    photos: [
      { id: 'sala', src: apartment, alt: 'Sala luminosa con acceso a terraza', category: 'Sala y comedor', label: 'Sala y terraza', isReference: true, order: 1 },
      { id: 'cocina', src: kitchen, alt: 'Cocina contemporánea de referencia', category: 'Cocina', label: 'Cocina', isReference: true, order: 2 },
    ],
    spaces: ['Zona social', 'Terraza'], tags: ['Luz natural', 'Terraza', 'Distribución abierta'], description: 'Ambientes conectados, luz natural y una terraza integrada a la zona social.',
  },
  {
    slug: 'residencia-con-jardin', title: 'Residencia contemporánea con jardín', operation: 'Venta', type: 'Casa', zone: 'Lima Top', catalogZone: 'Lima Centro', district: 'San Isidro', image: hero,
    photos: [
      { id: 'exterior', src: hero, alt: 'Exterior de residencia contemporánea al atardecer', category: 'Exterior', label: 'Arquitectura exterior', isReference: true, order: 1 },
      { id: 'sala', src: apartment, alt: 'Sala contemporánea de referencia', category: 'Sala y comedor', label: 'Sala', isReference: true, order: 2 },
      { id: 'cocina', src: kitchen, alt: 'Cocina contemporánea de referencia', category: 'Cocina', label: 'Cocina', isReference: true, order: 3 },
    ],
    spaces: ['Áreas sociales', 'Jardín'], tags: ['Jardín', 'Materiales nobles', 'Áreas sociales'], description: 'Residencia de líneas contemporáneas, espacios sociales amplios y relación directa con el jardín.',
  },
  {
    slug: 'oficina-representativa', title: 'Oficina de imagen representativa', operation: 'Alquiler', type: 'Oficina', zone: 'Lima Top', catalogZone: 'Lima Centro', district: 'San Isidro', image: commercial,
    photos: [
      { id: 'recepcion', src: commercial, alt: 'Recepción y sala de reuniones de oficina', category: 'Recepción', label: 'Recepción', isReference: true, order: 1 },
      { id: 'trabajo', src: studio, alt: 'Equipo trabajando en una mesa compartida', category: 'Áreas de trabajo', label: 'Espacio colaborativo', isReference: true, order: 2 },
    ],
    spaces: ['Recepción', 'Áreas colaborativas', 'Salas de reunión'], tags: ['Recepción', 'Salas de reunión', 'Luz natural'], description: 'Oficina profesional con recepción sobria, áreas colaborativas y salas configurables.',
  },
  {
    slug: 'departamento-calido', title: 'Departamento de materialidad cálida', operation: 'Alquiler', type: 'Departamento', zone: 'Lima Moderna', catalogZone: 'Lima Este', district: 'La Molina', image: kitchen,
    photos: [
      { id: 'cocina', src: kitchen, alt: 'Cocina integrada y acabados cálidos', category: 'Cocina', label: 'Cocina integrada', isReference: true, order: 1 },
      { id: 'sala', src: apartment, alt: 'Sala contemporánea con luz natural', category: 'Sala y comedor', label: 'Sala', isReference: true, order: 2 },
    ],
    spaces: ['Cocina integrada', 'Almacenamiento integrado'], tags: ['Cocina integrada', 'Carpintería', 'Iluminación cálida'], description: 'Vivienda funcional con almacenamiento integrado y una atmósfera doméstica serena.',
  },
  {
    slug: 'oficina-flexible', title: 'Oficina flexible para equipos', operation: 'Alquiler', type: 'Oficina', zone: 'Otras zonas', catalogZone: 'Callao', district: 'Bellavista', image: studio,
    photos: [
      { id: 'trabajo', src: studio, alt: 'Equipo colaborando en un espacio de trabajo', category: 'Áreas de trabajo', label: 'Trabajo compartido', isReference: true, order: 1 },
      { id: 'reuniones', src: commercial, alt: 'Recepción y espacio de reunión de oficina', category: 'Salas de reuniones', label: 'Reuniones', isReference: true, order: 2 },
    ],
    spaces: ['Zona de concentración', 'Zona de colaboración', 'Reuniones'], tags: ['Espacios flexibles', 'Colaboración', 'Materiales durables'], description: 'Espacio de trabajo adaptable con zonas para concentración, colaboración y reuniones.',
  },
  {
    slug: 'casa-urbana', title: 'Casa urbana de líneas limpias', operation: 'Venta', type: 'Casa', zone: 'Otras zonas', catalogZone: 'Lima Sur', district: 'Chorrillos', image: building,
    photos: [
      { id: 'fachada', src: building, alt: 'Fachada arquitectónica contemporánea', category: 'Fachada', label: 'Fachada', isReference: true, order: 1 },
      { id: 'exterior', src: hero, alt: 'Exterior residencial contemporáneo', category: 'Exterior', label: 'Espacio exterior', isReference: true, order: 2 },
    ],
    spaces: ['Acceso', 'Áreas comunes', 'Áreas verdes'], tags: ['Fachada contemporánea', 'Áreas comunes', 'Paisajismo'], description: 'Vivienda urbana con arquitectura contemporánea, acceso claro y áreas verdes integradas.',
  },
]

export const getProperty = (slug?: string) => properties.find((property) => property.slug === slug)
