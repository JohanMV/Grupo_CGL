import constructionImage from '@/assets/images/construction-site.webp'
import managementImage from '@/assets/images/managed-building.webp'
import propertyImage from '@/assets/images/apartment-living.webp'
import renovationImage from '@/assets/images/renovated-kitchen.webp'
import type { Service } from '@/types/content'

export const services: Service[] = [
  {
    slug: 'inmobiliaria',
    name: 'Servicios inmobiliarios', shortName: 'Inmobiliaria',
    title: 'Servicios inmobiliarios que acompañan tus decisiones.',
    summary: 'Orientación para propietarios, compradores e inversionistas en cada etapa de una operación inmobiliaria.',
    description: 'Analizamos el objetivo, las características del inmueble y el contexto comercial para estructurar un acompañamiento claro y ordenado.',
    image: propertyImage, icon: 'building',
    services: ['Venta y alquiler de propiedades', 'Captación y presentación de inmuebles', 'Valorización comercial referencial', 'Asesoría al propietario', 'Coordinación de visitas y negociación', 'Orientación documental', 'Saneamiento físico-legal', 'Preparación para alquiler temporal'],
    benefits: ['Decisiones con mejor contexto', 'Presentación cuidada del inmueble', 'Coordinación de principio a fin', 'Información centralizada'],
    steps: ['Comparte la información del inmueble', 'Revisamos el contexto y objetivo', 'Definimos una propuesta de acompañamiento', 'Coordinamos las siguientes acciones'],
    faqs: [
      { question: '¿Qué información necesito para una primera evaluación?', answer: 'Una descripción general del inmueble, su estado, documentación disponible y el objetivo de venta, alquiler o valorización.' },
      { question: '¿La valorización mostrada en la web es automática?', answer: 'No. Esta demo no calcula valores. Una evaluación real requeriría información verificada y revisión del contexto comercial.' },
      { question: '¿Pueden orientar sobre documentación?', answer: 'El servicio puede contemplar una revisión inicial y coordinación de trámites. El alcance se define según cada caso.' },
    ],
    cta: 'Consultar por mi propiedad',
  },
  {
    slug: 'construccion-ingenieria',
    name: 'Construcción e ingeniería', shortName: 'Construcción',
    title: 'Diseñamos y desarrollamos espacios con visión integral.',
    summary: 'Arquitectura, ingeniería y coordinación de obra articuladas alrededor de un mismo objetivo.',
    description: 'Partimos de las necesidades del proyecto para ordenar especialidades, alcances y decisiones técnicas antes y durante su desarrollo.',
    image: constructionImage, icon: 'construction',
    services: ['Diseño arquitectónico', 'Construcción residencial', 'Obras y adecuaciones', 'Supervisión de obra', 'Estructuras metálicas', 'Instalaciones', 'Expedientes técnicos', 'Gestión de proyectos'],
    benefits: ['Visión coordinada', 'Alcance comprensible', 'Criterio técnico', 'Seguimiento del proyecto'],
    steps: ['Cuéntanos el objetivo del proyecto', 'Revisamos condiciones y requerimientos', 'Estructuramos el alcance', 'Coordinamos su desarrollo'],
    faqs: [
      { question: '¿Qué se necesita para iniciar una evaluación?', answer: 'El uso previsto, información del terreno o espacio, necesidades principales y documentación disponible.' },
      { question: '¿Esta web entrega presupuestos automáticos?', answer: 'No. Cada alcance requiere evaluación técnica y una propuesta elaborada con información confirmada.' },
      { question: '¿Pueden trabajar por etapas?', answer: 'La forma de trabajo puede organizarse por etapas según el alcance. Esto se define en la evaluación inicial.' },
    ],
    cta: 'Cuéntanos sobre tu obra',
  },
  {
    slug: 'remodelacion-integral',
    name: 'Remodelación integral', shortName: 'Remodelación',
    title: 'Transformamos espacios para nuevas posibilidades.',
    summary: 'Diseño, acabados y ejecución coordinada para renovar viviendas y espacios comerciales.',
    description: 'Traducimos las necesidades de uso en una propuesta de intervención que considera materiales, funcionalidad y una ejecución ordenada.',
    image: renovationImage, icon: 'renovation',
    services: ['Remodelación de viviendas', 'Cocinas', 'Baños', 'Drywall y cielos rasos', 'Melamina a medida', 'Pintura y acabados', 'Pisos y revestimientos', 'Adaptación comercial'],
    benefits: ['Espacios mejor aprovechados', 'Materiales coordinados', 'Soluciones personalizadas', 'Un alcance más claro'],
    steps: ['Describe el espacio y la necesidad', 'Evaluamos condiciones y prioridades', 'Diseñamos una propuesta', 'Coordinamos la intervención'],
    faqs: [
      { question: '¿Cómo se define el alcance de una remodelación?', answer: 'Se revisan el estado actual, los usos esperados, las prioridades y el nivel de intervención requerido.' },
      { question: '¿Puedo solicitar mobiliario a medida?', answer: 'Sí, puede considerarse dentro de la propuesta según el espacio, materiales y necesidades de uso.' },
      { question: '¿Las imágenes son trabajos ejecutados?', answer: 'No. Las imágenes de esta propuesta son referenciales y no se atribuyen como obras de Grupo CGL.' },
    ],
    cta: 'Quiero remodelar un espacio',
  },
  {
    slug: 'administracion-edificios',
    name: 'Administración de edificios', shortName: 'Administración',
    title: 'Gestión integral para edificios que funcionan mejor.',
    summary: 'Organización administrativa, mantenimiento y seguimiento cotidiano para inmuebles compartidos.',
    description: 'Articulamos las tareas administrativas y operativas que ayudan a conservar el inmueble y mantener informada a la junta de propietarios.',
    image: managementImage, icon: 'management',
    services: ['Administración', 'Cobranza y control de morosidad', 'Rendición de cuentas', 'Mantenimiento preventivo', 'Supervisión de proveedores', 'Inspecciones técnicas', 'Atención de incidencias', 'Seguimiento a juntas'],
    benefits: ['Orden de gestión', 'Visibilidad de actividades', 'Conservación de activos', 'Mejor coordinación'],
    steps: ['Comparte las características del edificio', 'Revisamos necesidades actuales', 'Preparamos un alcance de gestión', 'Acordamos el inicio y seguimiento'],
    faqs: [
      { question: '¿Qué datos ayudan a evaluar un edificio?', answer: 'Cantidad de áreas comunes, servicios actuales, necesidades de mantenimiento y principales retos de gestión.' },
      { question: '¿La propuesta incluye mantenimiento?', answer: 'El alcance puede considerar coordinación y seguimiento de mantenimiento. Los servicios se precisan para cada edificio.' },
      { question: '¿Esta demo incluye un portal de residentes?', answer: 'No. Esta propuesta presenta el servicio y no incorpora facturación, portal de residentes ni sistemas administrativos.' },
    ],
    cta: 'Solicitar propuesta de administración',
  },
]

export const getService = (slug?: string) => services.find((service) => service.slug === slug)
