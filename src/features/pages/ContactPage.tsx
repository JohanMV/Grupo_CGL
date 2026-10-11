import { Buildings, EnvelopeSimple, HouseLine, PaintBrush, Phone } from '@phosphor-icons/react'
import { InteriorHero } from '@/components/sections'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { contactData } from '@/data/site'
import contactBanner from '@/assets/images/contact-banner.webp'

export function ContactPage() {
  return <><InteriorHero title="Hablemos de tu proyecto" text="Cuéntanos qué necesitas y coordinemos una primera conversación." image={contactBanner} breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Contacto' }]} />
    <section className="section contact-section"><div className="container contact-grid"><aside><h2>Empecemos por tu necesidad.</h2><p>Selecciona el área más cercana a tu proyecto y cuéntanos cómo podemos ayudarte.</p><div className="contact-specialties"><span><HouseLine /> Inmobiliaria</span><span><Buildings /> Construcción y gestión</span><span><PaintBrush /> Remodelación</span></div><div className="contact-details"><h3>Contacto</h3><span><Phone /> {contactData.phone}</span><span><EnvelopeSimple /> {contactData.email}</span></div></aside><ContactForm /></div></section></>
}
