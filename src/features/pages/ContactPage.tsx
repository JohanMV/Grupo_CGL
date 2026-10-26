import { EnvelopeSimple, FacebookLogo, InstagramLogo, Phone, TiktokLogo } from '@phosphor-icons/react'
import { InteriorHero } from '@/components/sections'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { contactData } from '@/data/site'
import contactBanner from '@/assets/images/contact-banner.webp'
import contactBackdrop from '@/assets/images/hero-residence.webp'

export function ContactPage() {
  return <main className="contact-page">
    <InteriorHero title="Hablemos de tu proyecto" text="Cuéntanos qué necesitas y coordinemos una primera conversación." image={contactBanner} breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Contacto' }]} />
    <section className="contact-section" aria-labelledby="contact-title">
      <div className="container contact-stage">
        <div className="contact-scene" aria-hidden="true"><img src={contactBackdrop} alt="" /></div>
        <div className="contact-grid">
          <div className="contact-intro">
            <p className="contact-eyebrow">Solicitar asesoría</p>
            <h2 id="contact-title">Hablemos de tu proyecto</h2>
            <p>Cuéntanos qué necesitas y coordinemos una primera conversación.</p>
            <div className="contact-details">
              <a href={contactData.phoneHref}><Phone aria-hidden="true" /> {contactData.phone}</a>
              <a href={`mailto:${contactData.email}`}><EnvelopeSimple aria-hidden="true" /> {contactData.email}</a>
            </div>
            <div className="contact-socials" aria-label="Redes sociales">
              <a href={contactData.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramLogo aria-hidden="true" weight="regular" /></a>
              <a href={contactData.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookLogo aria-hidden="true" weight="fill" /></a>
              <span role="img" aria-label="TikTok"><TiktokLogo aria-hidden="true" weight="fill" /></span>
            </div>
          </div>
          <div className="contact-panel">
            <div className="contact-panel-heading">
              <p className="contact-eyebrow">Solicitar asesoría</p>
              <h2>Completa el formulario</h2>
              <p>Selecciona el tipo de servicio y cuéntanos más sobre tu consulta.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </main>
}
