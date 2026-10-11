import { ButtonLink } from '@/components/ui'

interface ContactCTAProps { title?: string; text?: string; service?: string }

export function ContactCTA({ title = 'Hablemos de tu próximo proyecto.', text = 'Cuéntanos qué necesitas y coordinemos una primera conversación.', service }: ContactCTAProps) {
  const to = service ? `/contacto?servicio=${service}` : '/contacto'
  return <section className="contact-cta"><div className="container"><div><h2>{title}</h2><p>{text}</p></div><ButtonLink to={to} variant="light">Solicitar asesoría</ButtonLink></div></section>
}
