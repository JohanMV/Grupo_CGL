import { ArrowUpRight, FacebookLogo, InstagramLogo } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { contactData } from '@/data/site'
import { services } from '@/data/services'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="wordmark wordmark-footer"><span>CGL</span><small>GRUPO</small></Link>
          <p>Una mirada integral para el inmueble, desde la idea hasta su operación.</p>
        </div>
        <div><h3>Empresa</h3><Link to="/nosotros">Nosotros</Link><Link to="/proyectos">Proyectos</Link><Link to="/contacto">Contacto</Link></div>
        <div><h3>Servicios</h3>{services.map((service) => <Link to={`/servicios/${service.slug}`} key={service.slug}>{service.shortName}</Link>)}</div>
        <div><h3>Contacto</h3><span>{contactData.phone}</span><span>{contactData.email}</span><div className="social-links"><a href={contactData.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramLogo /></a><a href={contactData.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookLogo /></a></div></div>
      </div>
      <div className="container footer-bottom">
        <Link to="/contacto">Solicitar asesoría <ArrowUpRight /></Link>
      </div>
    </footer>
  )
}
