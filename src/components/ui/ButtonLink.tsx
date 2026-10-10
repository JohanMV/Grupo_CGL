import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'

interface ButtonLinkProps {
  to: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'light' | 'text'
  className?: string
  showArrow?: boolean
}

export function ButtonLink({ to, children, variant = 'primary', className = '', showArrow = true }: ButtonLinkProps) {
  return (
    <Link className={`button button-${variant} ${className}`} to={to}>
      <span>{children}</span>
      {showArrow && <ArrowUpRight aria-hidden="true" size={17} weight="bold" />}
    </Link>
  )
}
