import { Link } from 'react-router-dom'

interface Breadcrumb { label: string; to?: string }
interface BreadcrumbsProps { items: Breadcrumb[]; light?: boolean }

export function Breadcrumbs({ items, light = false }: BreadcrumbsProps) {
  return (
    <nav className={`breadcrumbs ${light ? 'breadcrumbs-light' : ''}`} aria-label="Migas de pan">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          {index < items.length - 1 && <span aria-hidden="true">/</span>}
        </span>
      ))}
    </nav>
  )
}
