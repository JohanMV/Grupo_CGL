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
  image: string
  gallery: string[]
  scope: string[]
}

export interface Property {
  slug: string
  title: string
  operation: 'Venta' | 'Alquiler'
  type: 'Departamento' | 'Casa' | 'Oficina'
  zone: 'Lima Moderna' | 'Lima Top' | 'Otras zonas'
  image: string
  gallery: string[]
  tags: string[]
  description: string
}
