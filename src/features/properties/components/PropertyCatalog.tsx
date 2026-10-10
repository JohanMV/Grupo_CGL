import { useMemo, useState } from 'react'
import { ArrowRight, MagnifyingGlass, X } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { FallbackImage } from '@/components/ui'
import { properties } from '@/data/properties'

export function PropertyCatalog() {
  const [search, setSearch] = useState('')
  const [operation, setOperation] = useState('Todas')
  const [type, setType] = useState('Todos')
  const [zone, setZone] = useState('Todas')
  const filtered = useMemo(() => properties.filter((property) => {
    const matchesText = `${property.title} ${property.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase())
    return matchesText && (operation === 'Todas' || property.operation === operation) && (type === 'Todos' || property.type === type) && (zone === 'Todas' || property.zone === zone)
  }), [search, operation, type, zone])
  const reset = () => { setSearch(''); setOperation('Todas'); setType('Todos'); setZone('Todas') }
  return <><div className="catalog-filters"><label className="search-field"><span>Buscar por concepto o característica</span><div><MagnifyingGlass /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ej. terraza, oficina, jardín" /></div></label><label><span>Operación</span><select value={operation} onChange={(event) => setOperation(event.target.value)}><option>Todas</option><option>Venta</option><option>Alquiler</option></select></label><label><span>Tipo</span><select value={type} onChange={(event) => setType(event.target.value)}><option>Todos</option><option>Departamento</option><option>Casa</option><option>Oficina</option></select></label><label><span>Zona</span><select value={zone} onChange={(event) => setZone(event.target.value)}><option>Todas</option><option>Lima Moderna</option><option>Lima Top</option><option>Otras zonas</option></select></label></div>
    <div className="catalog-meta"><p>{filtered.length} resultados ilustrativos</p><button type="button" onClick={reset}><X /> Limpiar filtros</button></div>
    {filtered.length ? <div className="catalog-grid">{filtered.map((property) => <article className="property-card" key={property.slug}><Link to={`/propiedades/${property.slug}`}><div className="property-image"><FallbackImage src={property.image} alt={`${property.title}, ficha ilustrativa`} /></div><div className="property-copy"><small>Ejemplo · Ficha ilustrativa</small><h2>{property.title}</h2><p>{property.type} / {property.zone}</p><div>{property.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><b>Ver detalle <ArrowRight /></b></div></Link></article>)}</div> : <div className="empty-state"><h2>No hay ejemplos que coincidan.</h2><p>Prueba con otros criterios o vuelve a ver la colección completa.</p><button type="button" onClick={reset}>Limpiar filtros</button></div>}
  </>
}
