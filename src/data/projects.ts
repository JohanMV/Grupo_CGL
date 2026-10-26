import apartment from '@/assets/images/apartment-living.webp'
import building from '@/assets/images/managed-building.webp'
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
  {
    slug: 'residencia-contemporanea', title: 'Residencia contemporánea', category: 'Construcción',
    summary: 'Una propuesta que integra estructura, paisaje y materialidad cálida.',
    overviewLead: 'Una vivienda que equilibra arquitectura, naturaleza y confort en un entorno privilegiado.',
    description: 'Este proyecto integra diseño contemporáneo, espacios abiertos y materialidad cálida, logrando una residencia funcional y atemporal que se conecta con el paisaje.',
    location: 'Lima, Perú', projectType: 'Vivienda unifamiliar', status: 'Finalizado', year: '2024',
    image: hero, gallery: [hero, residenceTwo, residenceThree],
    scope: [
      { title: 'Diseño arquitectónico', description: 'Desarrollo de una propuesta funcional y atemporal, integrada al entorno natural.' },
      { title: 'Coordinación de especialidades', description: 'Integración de ingeniería, estructuras e instalaciones para un resultado eficiente.' },
      { title: 'Gestión de obra', description: 'Supervisión y control en todas las etapas, asegurando calidad y cumplimiento de plazos.' },
    ],
  },
  {
    slug: 'cocina-integral', title: 'Cocina integral', category: 'Remodelación',
    summary: 'Carpintería, piedra e iluminación articuladas para un uso cotidiano.',
    description: 'Una intervención integral que ordena almacenamiento, superficies de trabajo e iluminación para crear una cocina cálida, funcional y duradera.',
    location: 'Lima, Perú', projectType: 'Remodelación residencial', status: 'Finalizado', year: '2025',
    image: kitchenOne, gallery: [kitchenOne, kitchenTwo, kitchenThree],
    scope: [
      { title: 'Diseño interior', description: 'Definición de distribución, materialidad y detalles para optimizar el uso cotidiano.' },
      { title: 'Mobiliario a medida', description: 'Desarrollo de carpintería funcional según las dimensiones y necesidades del espacio.' },
      { title: 'Acabados e iluminación', description: 'Coordinación de superficies, herrajes y luz para una lectura cálida y uniforme.' },
    ],
  },
  {
    slug: 'oficina-ejecutiva', title: 'Adecuación de oficina ejecutiva', category: 'Espacios comerciales',
    summary: 'Recepción y áreas de trabajo con una identidad sobria y funcional.',
    description: 'La adecuación articula imagen corporativa, privacidad y eficiencia operativa mediante una distribución clara y acabados de carácter institucional.',
    location: 'Lima, Perú', projectType: 'Oficina corporativa', status: 'Finalizado', year: '2025',
    image: officeOne, gallery: [officeOne, officeTwo, officeThree],
    scope: [
      { title: 'Distribución interior', description: 'Organización de recepción, puestos de trabajo y áreas privadas para recorridos eficientes.' },
      { title: 'Acabados corporativos', description: 'Selección de materiales y detalles alineados con una identidad sobria y profesional.' },
      { title: 'Coordinación de instalaciones', description: 'Integración de iluminación, electricidad y climatización con el diseño interior.' },
    ],
  },
  {
    slug: 'vivienda-urbana', title: 'Vivienda urbana conectada', category: 'Remodelación',
    summary: 'Ambientes flexibles que amplían la relación entre interior y terraza.',
    description: 'La propuesta reorganiza los ambientes sociales para aprovechar la luz, mejorar la circulación y extender la vida interior hacia la terraza.',
    location: 'Lima, Perú', projectType: 'Remodelación residencial', status: 'Finalizado', year: '2024',
    image: apartment, gallery: [apartment, kitchen, building],
    scope: [
      { title: 'Redistribución', description: 'Reorganización de ambientes para mejorar recorridos, amplitud y relación con el exterior.' },
      { title: 'Selección de materiales', description: 'Paleta coherente de revestimientos y acabados para un conjunto cálido y resistente.' },
      { title: 'Acondicionamiento interior', description: 'Coordinación de mobiliario, iluminación y detalles para completar la experiencia del espacio.' },
    ],
  },
  {
    slug: 'edificio-residencial', title: 'Edificio residencial eficiente', category: 'Construcción',
    summary: 'Una lectura ordenada de accesos, fachada y espacios compartidos.',
    description: 'El proyecto prioriza eficiencia espacial, claridad de accesos y una expresión arquitectónica coherente para las áreas privadas y comunes.',
    location: 'Lima, Perú', projectType: 'Edificio multifamiliar', status: 'Finalizado', year: '2025',
    image: building, gallery: [building, construction, hero],
    scope: [
      { title: 'Anteproyecto', description: 'Definición del partido arquitectónico, accesos y organización general del conjunto.' },
      { title: 'Desarrollo técnico', description: 'Resolución de planos, criterios constructivos y especificaciones para la ejecución.' },
      { title: 'Coordinación de obra', description: 'Seguimiento de especialidades y decisiones técnicas durante el proceso constructivo.' },
    ],
  },
  {
    slug: 'espacio-de-trabajo', title: 'Espacio de trabajo flexible', category: 'Espacios comerciales',
    summary: 'Un entorno profesional con luz, acústica y recorridos claros.',
    description: 'La propuesta combina zonas colaborativas y espacios de concentración, equilibrando flexibilidad, confort acústico e identidad profesional.',
    location: 'Lima, Perú', projectType: 'Oficina corporativa', status: 'Finalizado', year: '2025',
    image: workspaceOne, gallery: [workspaceOne, workspaceTwo, workspaceThree],
    scope: [
      { title: 'Planeamiento', description: 'Definición de necesidades, aforo y relaciones funcionales para el espacio de trabajo.' },
      { title: 'Diseño de espacios', description: 'Desarrollo de ambientes flexibles que favorecen colaboración y concentración.' },
      { title: 'Especificación de materiales', description: 'Selección de superficies, soluciones acústicas y acabados de uso intensivo.' },
    ],
  },
]

export const getProject = (slug?: string) => projects.find((project) => project.slug === slug)
