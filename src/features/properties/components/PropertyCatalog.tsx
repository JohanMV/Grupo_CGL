import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { ArrowRight, ArrowsOut, Bathtub, Bed, Car, CaretDown, Check, MagnifyingGlass, MapPin, X } from '@phosphor-icons/react'
import { Link, useSearchParams } from 'react-router-dom'
import { FallbackImage } from '@/components/ui'
import { properties } from '@/data/properties'
import type { Property } from '@/types/content'
import { formatPrice, propertyHighlights } from '@/features/properties/propertyPresentation'

const zones = ['Lima Norte', 'Lima Centro', 'Lima Este', 'Lima Sur', 'Callao'] as const
const types = [...new Set(properties.map((property) => property.type))]

type CatalogFilterOption = {
  value: string
  label: string
}

type CatalogSelectProps = {
  label: string
  value: string
  options: CatalogFilterOption[]
  onChange: (value: string) => void
}

function normalized(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim()
}

function CatalogSelect({ label, value, options, onChange }: CatalogSelectProps) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const controlId = useId()
  const labelId = `${controlId}-label`
  const valueId = `${controlId}-value`
  const listboxId = `${controlId}-listbox`
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value))
  const selected = options[selectedIndex]

  useEffect(() => {
    if (!open) return

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsidePress)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress)
  }, [open])

  const openMenu = () => {
    setActiveIndex(selectedIndex)
    setOpen(true)
  }

  const selectOption = (index: number) => {
    const option = options[index]
    if (!option) return
    onChange(option.value)
    setActiveIndex(index)
    setOpen(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) {
        openMenu()
        return
      }
      const direction = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((current) => (current + direction + options.length) % options.length)
      return
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      if (!open) openMenu()
      setActiveIndex(event.key === 'Home' ? 0 : options.length - 1)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (open) selectOption(activeIndex)
      else openMenu()
      return
    }

    if (event.key === 'Escape' && open) {
      event.preventDefault()
      setOpen(false)
    }
  }

  return <div className="catalog-filter-field catalog-select" ref={rootRef}>
    <span className="catalog-filter-label" id={labelId}>{label}</span>
    <button
      type="button"
      className="catalog-select-trigger"
      role="combobox"
      aria-labelledby={`${labelId} ${valueId}`}
      aria-controls={listboxId}
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-activedescendant={open ? `${controlId}-option-${activeIndex}` : undefined}
      onClick={() => open ? setOpen(false) : openMenu()}
      onKeyDown={handleKeyDown}
    >
      <span id={valueId}>{selected.label}</span>
      <CaretDown size={16} weight="bold" aria-hidden="true" />
    </button>
    {open && <div className="catalog-select-menu" id={listboxId} role="listbox" aria-labelledby={labelId}>
      {options.map((option, index) => {
        const isSelected = option.value === value
        return <button
          type="button"
          role="option"
          id={`${controlId}-option-${index}`}
          className="catalog-select-option"
          aria-selected={isSelected}
          data-active={activeIndex === index}
          key={option.value || 'all'}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => selectOption(index)}
        >
          <span>{option.label}</span>
          {isSelected && <Check size={16} weight="bold" aria-hidden="true" />}
        </button>
      })}
    </div>}
  </div>
}

function PropertyFeatureIcon({ label }: { label: string }) {
  if (label === 'Área') return <ArrowsOut size={19} weight="regular" aria-hidden="true" />
  if (label === 'Dormitorios') return <Bed size={19} weight="regular" aria-hidden="true" />
  if (label === 'Baños' || label === 'Servicios higiénicos') return <Bathtub size={19} weight="regular" aria-hidden="true" />
  return <Car size={19} weight="regular" aria-hidden="true" />
}

function PropertyCard({ property }: { property: Property }) {
  const destination = `/propiedades/${property.slug}`
  const location = [property.district, property.catalogZone].filter(Boolean).join(' · ')

  return <article className="property-card catalog-card">
    <Link className="catalog-card-hitarea" to={destination} aria-label={`Ver propiedad: ${property.title}`}>
      <div className="catalog-card-image">
        <FallbackImage src={property.image} alt={property.title} />
        <span className="catalog-card-badge">{property.operation} · {property.type}</span>
      </div>
      <div className="catalog-card-copy">
        <h2>{property.title}</h2>
        {location && <p className="catalog-card-location"><MapPin size={17} weight="regular" aria-hidden="true" />{location}</p>}
        <p className="catalog-card-price">{formatPrice(property)}</p>
        <ul className="catalog-card-features" aria-label="Características principales">
          {propertyHighlights(property).map((fact) => <li key={fact.label} aria-label={`${fact.label}: ${fact.value}`}>
            <PropertyFeatureIcon label={fact.label} />
            <span>{fact.value}</span>
          </li>)}
        </ul>
        <span className="catalog-card-link">Ver propiedad <ArrowRight size={18} weight="bold" aria-hidden="true" /></span>
      </div>
    </Link>
  </article>
}

export function PropertyCatalog() {
  const [params, setParams] = useSearchParams()
  const search = params.get('buscar') ?? ''
  const operation = params.get('operacion') ?? ''
  const type = params.get('tipo') ?? ''
  const zone = params.get('zona') ?? ''
  const district = params.get('distrito') ?? ''

  const districts = useMemo(() => [...new Set(properties
    .filter((property) => !zone || property.catalogZone === zone)
    .map((property) => property.district)
    .filter((value): value is string => Boolean(value)))].sort((a, b) => a.localeCompare(b, 'es')), [zone])

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key === 'zona' && value && district && !properties.some((property) => property.catalogZone === value && property.district === district)) next.delete('distrito')
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const active = Boolean(search || operation || type || zone || district)
  const reset = () => setParams(new URLSearchParams(), { replace: true, preventScrollReset: true })
  const term = normalized(search)
  const filtered = properties.filter((property) => {
    const searchable = normalized([property.title, property.type, property.district, property.catalogZone, property.description, ...property.tags].filter(Boolean).join(' '))
    return (!term || searchable.includes(term))
      && (!operation || property.operation === operation)
      && (!type || property.type === type)
      && (!zone || property.catalogZone === zone)
      && (!district || property.district === district)
  })

  return <>
    <div className="catalog-filters" role="search" aria-label="Buscar propiedades">
      <label className="catalog-search catalog-filter-field"><span>Buscar</span><span className="catalog-search-input"><MagnifyingGlass size={19} aria-hidden="true" /><input type="search" value={search} onChange={(event) => updateFilter('buscar', event.target.value)} placeholder="Ej. terraza, departamento, Miraflores" /></span></label>
      <CatalogSelect label="Operación" value={operation} onChange={(nextValue) => updateFilter('operacion', nextValue)} options={[{ value: '', label: 'Todas' }, { value: 'Venta', label: 'Venta' }, { value: 'Alquiler', label: 'Alquiler' }]} />
      <CatalogSelect label="Tipo" value={type} onChange={(nextValue) => updateFilter('tipo', nextValue)} options={[{ value: '', label: 'Todos' }, ...types.map((item) => ({ value: item, label: item }))]} />
      <CatalogSelect label="Zona" value={zone} onChange={(nextValue) => updateFilter('zona', nextValue)} options={[{ value: '', label: 'Todas las zonas' }, ...zones.map((item) => ({ value: item, label: item }))]} />
      <CatalogSelect label="Distrito" value={district} onChange={(nextValue) => updateFilter('distrito', nextValue)} options={[{ value: '', label: 'Todos los distritos' }, ...districts.map((item) => ({ value: item, label: item }))]} />
    </div>
    <div className="catalog-meta"><p role="status">{filtered.length} {filtered.length === 1 ? 'propiedad' : 'propiedades'}</p>{active && <button type="button" onClick={reset}><X size={16} aria-hidden="true" /> Limpiar filtros</button>}</div>
    {filtered.length > 0
      ? <div className="catalog-grid">{filtered.map((property) => <PropertyCard property={property} key={property.slug} />)}</div>
      : <div className="catalog-empty"><h2>No encontramos propiedades con esos filtros.</h2><p>Prueba con otra combinación o vuelve a ver el catálogo completo.</p><button type="button" onClick={reset}>Limpiar filtros <ArrowRight size={18} aria-hidden="true" /></button></div>}
  </>
}
