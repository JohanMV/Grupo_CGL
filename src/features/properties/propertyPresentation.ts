import type { Property } from '@/types/content'

const numberFormat = new Intl.NumberFormat('es-PE', { maximumFractionDigits: 0 })

export function formatMoney(amount: number, currency: 'PEN' | 'USD') {
  return `${currency === 'PEN' ? 'S/' : 'US$'} ${numberFormat.format(amount)}`
}

export function formatPrice(property: Property) {
  if (!property.price) return 'Precio a consultar'
  const period = property.price.period ? ` / ${property.price.period}` : ''
  return `${formatMoney(property.price.amount, property.price.currency)}${period}`
}

export function propertyArea(property: Property) {
  const area = property.type === 'Casa' ? property.features.landArea ?? property.features.totalArea : property.features.totalArea ?? property.features.builtArea
  return area === undefined ? null : `${numberFormat.format(area)} m²${property.type === 'Casa' && property.features.landArea ? ' de terreno' : ''}`
}

export function propertyHighlights(property: Property) {
  const { features } = property
  const area = propertyArea(property)
  return [
    area && { label: 'Área', value: area },
    features.bedrooms !== undefined && { label: 'Dormitorios', value: `${features.bedrooms} dorm.` },
    features.fullBathrooms !== undefined && { label: property.type === 'Oficina' ? 'Servicios higiénicos' : 'Baños', value: `${features.fullBathrooms} ${property.type === 'Oficina' ? 'SS. HH.' : 'baños'}` },
    features.parking !== undefined && { label: 'Estacionamientos', value: `${features.parking} estac.` },
  ].filter((item): item is { label: string; value: string } => Boolean(item))
}

export function propertyContactUrl(property: Property) {
  const params = new URLSearchParams({
    servicio: 'inmobiliaria',
    propiedad: property.id,
    codigo: property.code,
    nombre: property.title,
    operacion: property.operation,
    tipo: property.type,
  })
  return `/contacto?${params.toString()}`
}

export function propertyGoogleEmbedUrl(property: Property) {
  const { location } = property
  const query = location.precision === 'exacta' && location.latitude !== undefined && location.longitude !== undefined
    ? `${location.latitude},${location.longitude}`
    : `${location.district}, ${location.province}, Perú`
  const params = new URLSearchParams({ q: query, hl: 'es', z: location.precision === 'exacta' ? '16' : '12', output: 'embed' })
  return `https://maps.google.com/maps?${params.toString()}`
}

export function propertyGoogleMapsUrl(property: Property) {
  const { location } = property
  const query = location.precision === 'exacta' && location.latitude !== undefined && location.longitude !== undefined
    ? `${location.latitude},${location.longitude}`
    : `${location.district}, ${location.province}, Perú`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
