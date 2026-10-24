import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Buildings, CaretDown, Crane, HouseLine, List, PaintBrush, WhatsappLogo, X } from '@phosphor-icons/react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import heroImage from '@/assets/images/hero-residence.webp'
import { services } from '@/data/services'
import { contactData } from '@/data/site'

const serviceIcons = [HouseLine, Crane, PaintBrush, Buildings]

export function Header() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 30))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && (setServicesOpen(false), setMobileOpen(false))
    const outside = (event: MouseEvent) => dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && setServicesOpen(false)
    document.addEventListener('keydown', close)
    document.addEventListener('mousedown', outside)
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('mousedown', outside) }
  }, [])

  return (
    <>
      <header className={`site-header ${scrolled || location.pathname !== '/' ? 'site-header-solid' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="wordmark" aria-label="Grupo CGL, inicio"><span>CGL</span><small>GRUPO</small></Link>
          <nav className="desktop-nav" aria-label="Navegación principal">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/nosotros">Nosotros</NavLink>
            <div className="nav-dropdown" ref={dropdownRef}>
              <button type="button" aria-expanded={servicesOpen} aria-controls="services-menu" onClick={() => setServicesOpen(!servicesOpen)}>
                Servicios <CaretDown size={14} weight="bold" />
              </button>
              {servicesOpen && (
                <div id="services-menu" className="mega-menu">
                  {services.map((service, index) => {
                    const Icon = serviceIcons[index]
                    return <Link onClick={() => setServicesOpen(false)} to={`/servicios/${service.slug}`} key={service.slug}><Icon size={22} /><span><strong>{service.shortName}</strong><small>{service.summary}</small></span></Link>
                  })}
                  <Link className="mega-all" onClick={() => setServicesOpen(false)} to="/servicios">Ver todos los servicios</Link>
                </div>
              )}
            </div>
            <NavLink to="/proyectos">Proyectos</NavLink>
            <NavLink to="/propiedades">Propiedades</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
          </nav>
          <Link className="header-cta" to="/contacto">Solicitar asesoría</Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(true)}
          ><List size={27} /></button>
        </div>
      </header>
      <div id="mobile-navigation" className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
        <img className="mobile-menu-background" src={heroImage} alt="" aria-hidden="true" />
        <button className="mobile-close" type="button" aria-label="Cerrar menú" onClick={() => setMobileOpen(false)}><X size={28} /></button>
        <nav aria-label="Navegación móvil" onClick={() => setMobileOpen(false)}>
          <Link to="/">Inicio</Link><Link to="/nosotros">Nosotros</Link><Link to="/servicios">Servicios</Link>
          <div className="mobile-subnav">
            {services.map((service, index) => {
              const Icon = serviceIcons[index]
              return (
                <Link to={`/servicios/${service.slug}`} key={service.slug}>
                  <Icon size={19} aria-hidden="true" />
                  <span>{service.shortName}</span>
                </Link>
              )
            })}
          </div>
          <Link to="/proyectos">Proyectos</Link><Link to="/propiedades">Propiedades</Link><Link to="/contacto">Contacto</Link>
        </nav>
        <a className="mobile-whatsapp" href={`https://wa.me/${contactData.whatsappNumber}`} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)}>
          <WhatsappLogo size={26} weight="fill" aria-hidden="true" />
          <span><strong>WhatsApp</strong><small>{contactData.phone}</small></span>
        </a>
      </div>
    </>
  )
}
