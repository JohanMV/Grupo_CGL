export interface Service {
  slug: string
  name: string
  shortName: string
  title: string
  summary: string
  description: string
  image: string
  icon: 'building' | 'construction' | 'renovation' | 'management'
  services: string[]
  benefits: string[]
  steps: string[]
  faqs: Array<{ question: string; answer: string }>
  cta: string
}

export interface Project {
  slug: string
  title: string
  category: 'Construcción' | 'Remodelación' | 'Espacios comerciales'
  summary: string
  overviewLead?: string
  description: string
  location: string
  projectType: string
  status: string
  year: string
  image: string
  gallery: string[]
  scope: Array<{ title: string; description: string }>
}

export interface Property {
  id: string
  code: string
  slug: string
  title: string
  operation: 'Venta' | 'Alquiler'
  type: 'Departamento' | 'Casa' | 'Oficina' | 'Local comercial' | 'Terreno'
  commercialStatus: 'Consultar disponibilidad' | 'Disponible' | 'Reservado' | 'Vendido' | 'Alquilado'
  updatedAt: string
  summary: string
  price?: { amount: number; currency: 'PEN' | 'USD'; period?: 'mes' | 'semana' | 'día'; negotiable?: boolean }
  maintenance?: { amount: number; currency: 'PEN' | 'USD' }
  rentalTerms?: { depositMonths?: number; advanceMonths?: number; minimumMonths?: number; notes?: string }
  features: PropertyFeatures
  amenities?: { distribution?: string[]; equipment?: string[]; shared?: string[] }
  location: PropertyLocation
  zone: 'Lima Moderna' | 'Lima Top' | 'Otras zonas'
  catalogZone?: 'Lima Norte' | 'Lima Centro' | 'Lima Este' | 'Lima Sur' | 'Callao'
  district?: string
  image: string
  photos?: PropertyPhoto[]
  spaces?: string[]
  tags: string[]
  description: string
}

export interface PropertyPhoto {
  id: string
  src: string
  alt: string
  category: string
  label: string
  isReference: boolean
  order: number
  source?: string
}

export interface PropertyFeatures {
  totalArea?: number
  builtArea?: number
  landArea?: number
  bedrooms?: number
  fullBathrooms?: number
  halfBathrooms?: number
  parking?: number
  floor?: number
  levels?: number
  ageYears?: number
  condition?: string
  furnished?: boolean
  elevator?: boolean
  terrace?: boolean
  balcony?: boolean
  patio?: boolean
  garden?: boolean
  storage?: boolean
  petsAllowed?: boolean
  frontage?: number
  depth?: number
  zoning?: string
}

export interface PropertyLocation {
  department: string
  province: string
  district: string
  sector?: string
  address?: string
  reference?: string
  latitude?: number
  longitude?: number
  precision: 'exacta' | 'aproximada'
  nearby?: Array<{ name: string; category: string; distanceMeters?: number }>
}
