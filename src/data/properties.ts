import apartment from '@/assets/images/apartment-living.webp'
import commercial from '@/assets/images/commercial-space.webp'
import hero from '@/assets/images/hero-residence.webp'
import kitchen from '@/assets/images/renovated-kitchen.webp'
import terrazaBano from '@/assets/images/properties/terraza-bano.webp'
import terrazaDormitorio from '@/assets/images/properties/terraza-dormitorio.webp'
import terrazaCocina from '@/assets/images/properties/terraza-cocina.webp'
import residenciaJardin from '@/assets/images/properties/residencia-jardin.webp'
import residenciaSala from '@/assets/images/properties/residencia-sala.webp'
import residenciaCocina from '@/assets/images/properties/residencia-cocina.webp'
import representativaReuniones from '@/assets/images/properties/representativa-reuniones.webp'
import representativaTrabajo from '@/assets/images/properties/representativa-trabajo.webp'
import representativaPrivado from '@/assets/images/properties/representativa-privado.webp'
import calidoBano from '@/assets/images/properties/calido-bano.webp'
import calidoDormitorio from '@/assets/images/properties/calido-dormitorio.webp'
import calidoSala from '@/assets/images/properties/calido-sala.webp'
import flexibleReuniones from '@/assets/images/properties/flexible-reuniones.webp'
import flexibleConcentracion from '@/assets/images/properties/flexible-concentracion.webp'
import flexibleTrabajo from '@/assets/images/properties/flexible-trabajo.webp'
import flexibleRecepcion from '@/assets/images/properties/flexible-recepcion.webp'
import urbanaSala from '@/assets/images/properties/urbana-sala.webp'
import urbanaCocina from '@/assets/images/properties/urbana-cocina.webp'
import urbanaFachada from '@/assets/images/properties/urbana-fachada.webp'
import urbanaJardin from '@/assets/images/properties/urbana-jardin.webp'
import type { Property } from '@/types/content'

export const properties: Property[] = [
  {
    slug: 'departamento-con-terraza', title: 'Departamento con terraza urbana', operation: 'Venta', type: 'Departamento', zone: 'Lima Moderna', catalogZone: 'Lima Centro', district: 'Miraflores', image: apartment,
    photos: [
      { id: 'sala', src: apartment, alt: 'Sala luminosa con acceso a terraza', category: 'Sala y comedor', label: 'Sala y terraza', isReference: true, order: 1 },
      { id: 'cocina', src: terrazaCocina, alt: 'Cocina luminosa con mobiliario de roble y vista a la terraza', category: 'Cocina', label: 'Cocina', isReference: true, order: 2 },
      { id: 'dormitorio', src: terrazaDormitorio, alt: 'Dormitorio de tonos claros junto a la terraza', category: 'Dormitorio', label: 'Dormitorio', isReference: true, order: 3 },
      { id: 'bano', src: terrazaBano, alt: 'Baño de piedra clara y mobiliario de madera', category: 'Baño', label: 'Baño', isReference: true, order: 4 },
    ],
    spaces: ['Zona social', 'Terraza'], tags: ['Luz natural', 'Terraza', 'Distribución abierta'], description: 'Ambientes conectados, luz natural y una terraza integrada a la zona social.',
  },
  {
    slug: 'residencia-con-jardin', title: 'Residencia contemporánea con jardín', operation: 'Venta', type: 'Casa', zone: 'Lima Top', catalogZone: 'Lima Centro', district: 'San Isidro', image: hero,
    photos: [
      { id: 'exterior', src: hero, alt: 'Exterior de residencia contemporánea al atardecer', category: 'Exterior', label: 'Arquitectura exterior', isReference: true, order: 1 },
      { id: 'sala', src: residenciaSala, alt: 'Sala amplia de concreto y madera abierta al jardín', category: 'Sala y comedor', label: 'Sala', isReference: true, order: 2 },
      { id: 'cocina', src: residenciaCocina, alt: 'Cocina y comedor de la residencia con vista al exterior', category: 'Cocina', label: 'Cocina y comedor', isReference: true, order: 3 },
      { id: 'jardin', src: residenciaJardin, alt: 'Jardín y terraza de la residencia contemporánea', category: 'Jardín', label: 'Jardín y terraza', isReference: true, order: 4 },
    ],
    spaces: ['Áreas sociales', 'Jardín'], tags: ['Jardín', 'Materiales nobles', 'Áreas sociales'], description: 'Residencia de líneas contemporáneas, espacios sociales amplios y relación directa con el jardín.',
  },
  {
    slug: 'oficina-representativa', title: 'Oficina de imagen representativa', operation: 'Alquiler', type: 'Oficina', zone: 'Lima Top', catalogZone: 'Lima Centro', district: 'San Isidro', image: commercial,
    photos: [
      { id: 'recepcion', src: commercial, alt: 'Recepción y sala de reuniones de oficina', category: 'Recepción', label: 'Recepción', isReference: true, order: 1 },
      { id: 'trabajo', src: representativaTrabajo, alt: 'Área colaborativa de la oficina representativa', category: 'Áreas de trabajo', label: 'Espacio colaborativo', isReference: true, order: 2 },
      { id: 'reuniones', src: representativaReuniones, alt: 'Sala de reuniones con acabados contemporáneos', category: 'Salas de reuniones', label: 'Sala de reuniones', isReference: true, order: 3 },
      { id: 'privado', src: representativaPrivado, alt: 'Despacho privado con luz natural', category: 'Despacho', label: 'Despacho privado', isReference: true, order: 4 },
    ],
    spaces: ['Recepción', 'Áreas colaborativas', 'Salas de reunión'], tags: ['Recepción', 'Salas de reunión', 'Luz natural'], description: 'Oficina profesional con recepción sobria, áreas colaborativas y salas configurables.',
  },
  {
    slug: 'departamento-calido', title: 'Departamento de materialidad cálida', operation: 'Alquiler', type: 'Departamento', zone: 'Lima Moderna', catalogZone: 'Lima Este', district: 'La Molina', image: kitchen,
    photos: [
      { id: 'cocina', src: kitchen, alt: 'Cocina integrada y acabados cálidos', category: 'Cocina', label: 'Cocina integrada', isReference: true, order: 1 },
      { id: 'sala', src: calidoSala, alt: 'Sala de materialidad cálida con balcón y luz natural', category: 'Sala y comedor', label: 'Sala', isReference: true, order: 2 },
      { id: 'dormitorio', src: calidoDormitorio, alt: 'Dormitorio con carpintería cálida y tonos neutros', category: 'Dormitorio', label: 'Dormitorio', isReference: true, order: 3 },
      { id: 'bano', src: calidoBano, alt: 'Baño de acabados cálidos y piedra natural', category: 'Baño', label: 'Baño', isReference: true, order: 4 },
    ],
    spaces: ['Cocina integrada', 'Almacenamiento integrado'], tags: ['Cocina integrada', 'Carpintería', 'Iluminación cálida'], description: 'Vivienda funcional con almacenamiento integrado y una atmósfera doméstica serena.',
  },
  {
    slug: 'oficina-flexible', title: 'Oficina flexible para equipos', operation: 'Alquiler', type: 'Oficina', zone: 'Otras zonas', catalogZone: 'Callao', district: 'Bellavista', image: flexibleTrabajo,
    photos: [
      { id: 'trabajo', src: flexibleTrabajo, alt: 'Área de trabajo abierta de la oficina flexible', category: 'Áreas de trabajo', label: 'Trabajo compartido', isReference: true, order: 1 },
      { id: 'reuniones', src: flexibleReuniones, alt: 'Sala de reuniones de la oficina flexible', category: 'Salas de reuniones', label: 'Reuniones', isReference: true, order: 2 },
      { id: 'concentracion', src: flexibleConcentracion, alt: 'Zona de concentración con puestos de trabajo', category: 'Áreas de trabajo', label: 'Zona de concentración', isReference: true, order: 3 },
      { id: 'recepcion', src: flexibleRecepcion, alt: 'Recepción y sala de espera de la oficina flexible', category: 'Recepción', label: 'Recepción', isReference: true, order: 4 },
    ],
    spaces: ['Zona de concentración', 'Zona de colaboración', 'Reuniones'], tags: ['Espacios flexibles', 'Colaboración', 'Materiales durables'], description: 'Espacio de trabajo adaptable con zonas para concentración, colaboración y reuniones.',
  },
  {
    slug: 'casa-urbana', title: 'Casa urbana de líneas limpias', operation: 'Venta', type: 'Casa', zone: 'Otras zonas', catalogZone: 'Lima Sur', district: 'Chorrillos', image: urbanaFachada,
    photos: [
      { id: 'fachada', src: urbanaFachada, alt: 'Fachada de casa urbana de concreto y madera', category: 'Fachada', label: 'Fachada', isReference: true, order: 1 },
      { id: 'sala', src: urbanaSala, alt: 'Sala luminosa con vista al jardín de la casa urbana', category: 'Sala y comedor', label: 'Sala', isReference: true, order: 2 },
      { id: 'cocina', src: urbanaCocina, alt: 'Cocina contemporánea de la casa urbana', category: 'Cocina', label: 'Cocina', isReference: true, order: 3 },
      { id: 'jardin', src: urbanaJardin, alt: 'Jardín privado y terraza de la casa urbana', category: 'Jardín', label: 'Jardín y terraza', isReference: true, order: 4 },
    ],
    spaces: ['Acceso', 'Áreas comunes', 'Áreas verdes'], tags: ['Fachada contemporánea', 'Áreas comunes', 'Paisajismo'], description: 'Vivienda urbana con arquitectura contemporánea, acceso claro y áreas verdes integradas.',
  },
]

export const getProperty = (slug?: string) => properties.find((property) => property.slug === slug)
