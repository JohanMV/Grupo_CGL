import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const whatsappNumber = '51916842610'

interface FormValues { name: string; email: string; phone: string; service: string; message: string }
type FormErrors = Partial<Record<keyof FormValues, string>>

const serviceMap: Record<string, string> = { inmobiliaria: 'Inmobiliaria', 'construccion-ingenieria': 'Construcción', 'remodelacion-integral': 'Remodelación', 'administracion-edificios': 'Administración de edificios' }

export function ContactForm() {
  const [params] = useSearchParams()
  const initialService = serviceMap[params.get('servicio') ?? ''] ?? ''
  const empty = (): FormValues => ({ name: '', email: '', phone: '', service: initialService, message: '' })
  const [values, setValues] = useState<FormValues>(empty)
  const [errors, setErrors] = useState<FormErrors>({})
  const [notice, setNotice] = useState('')
  const update = (field: keyof FormValues, value: string) => { setValues((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })) }
  const validate = () => {
    const next: FormErrors = {}
    if (!values.name.trim()) next.name = 'Ingresa tu nombre completo.'
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Ingresa un correo electrónico válido.'
    if (!values.service) next.service = 'Selecciona un tipo de servicio.'
    if (values.message.trim().length < 15) next.message = 'Cuéntanos un poco más. Usa al menos 15 caracteres.'
    setErrors(next)
    return Object.keys(next).length === 0
  }
  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    const body = [`Hola, quiero realizar una consulta.`, `Nombre: ${values.name}`, `Correo: ${values.email}`, `Teléfono: ${values.phone || 'No indicado'}`, `Servicio: ${values.service}`, '', values.message].join('\n')
    setNotice('Se abrirá WhatsApp con tu mensaje listo para enviar.')
    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`
  }
  return <form className="contact-form" onSubmit={submit} noValidate>
    <Field label="Nombre completo" error={errors.name} required><input value={values.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} /></Field>
    <Field label="Correo electrónico" error={errors.email} required><input type="email" value={values.email} onChange={(event) => update('email', event.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} /></Field>
    <Field label="Teléfono" helper="Opcional"><input value={values.phone} onChange={(event) => update('phone', event.target.value)} autoComplete="tel" /></Field>
    <Field label="Tipo de servicio" error={errors.service} required><select value={values.service} onChange={(event) => update('service', event.target.value)} aria-invalid={Boolean(errors.service)}><option value="">Selecciona una opción</option><option>Inmobiliaria</option><option>Construcción</option><option>Remodelación</option><option>Administración de edificios</option><option>Otro</option></select></Field>
    <Field label="Describe tu necesidad" error={errors.message} required><textarea rows={5} value={values.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(errors.message)} /></Field>
    {notice && <p className="form-note" role="status">{notice}</p>}<button className="submit-button" type="submit">Enviar solicitud por WhatsApp</button>
  </form>
}

interface FieldProps { label: string; helper?: string; error?: string; required?: boolean; children: React.ReactNode }
function Field({ label, helper, error, required, children }: FieldProps) {
  return <label className="form-field"><span>{label}{required && <b aria-hidden="true"> *</b>}</span>{children}{helper && <small>{helper}</small>}{error && <small className="field-error">{error}</small>}</label>
}
