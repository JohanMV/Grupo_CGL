import { Buildings, Crane, EnvelopeSimple, HouseLine, PaintBrush, Phone } from '@phosphor-icons/react'
import { InteriorHero } from '@/components/sections'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { contactData } from '@/data/site'
import contactBanner from '@/assets/images/contact-banner.webp'

export function ContactPage() {
  return <><InteriorHero title="Hablemos de tu proyecto" text="Cuéntanos qué necesitas y coordinemos una primera conversación." image={contactBanner} breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Contacto' }]} />
    <section className="section contact-section"><div className="container contact-grid"><aside><h2>Empecemos por tu necesidad.</h2><p>Selecciona el servicio que necesitas y cuéntanos brevemente sobre tu proyecto.</p><div className="contact-specialties"><span><HouseLine /> Inmobiliaria</span><span><Crane /> Construcción e ingeniería</span><span><PaintBrush /> Remodelación integral</span><span><Buildings /> Administración de edificios</span></div><div className="contact-details"><h3>Contacto</h3><a href={contactData.phoneHref}><Phone /> {contactData.phone}</a><a href={`mailto:${contactData.email}`}><EnvelopeSimple /> {contactData.email}</a></div></aside><ContactForm /></div></section></>
}
