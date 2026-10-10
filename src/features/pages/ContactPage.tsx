import { Buildings, EnvelopeSimple, HouseLine, PaintBrush, Phone } from '@phosphor-icons/react'
import { InteriorHero } from '@/components/sections'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { contactData } from '@/data/site'

export function ContactPage() {
  return <><InteriorHero title="Hablemos de tu proyecto" text="Cuéntanos qué necesitas y revisa cómo se organizaría una primera solicitud." breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Contacto' }]} />
    <section className="section contact-section"><div className="container contact-grid"><aside><h2>Empecemos por tu necesidad.</h2><p>Selecciona el área más cercana a tu proyecto. Esta demo no enviará la información.</p><div className="contact-specialties"><span><HouseLine /> Inmobiliaria</span><span><Buildings /> Construcción y gestión</span><span><PaintBrush /> Remodelación</span></div><div className="contact-reference"><h3>Datos públicos pendientes de confirmación</h3><span><Phone /> {contactData.phone}</span><span><EnvelopeSimple /> {contactData.email}</span></div></aside><ContactForm /></div></section></>
}
