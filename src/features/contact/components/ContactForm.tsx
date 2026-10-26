import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Buildings, Crane, HouseLine, PaintBrush, WhatsappLogo } from '@phosphor-icons/react'
import { useSearchParams } from 'react-router-dom'
import { contactData } from '@/data/site'

const serviceOptions = [
  { value: 'Inmobiliaria', shortLabel: 'Inmobiliaria', icon: HouseLine, contextualLabel: '¿Qué operación necesitas?', contextualOptions: ['Comprar una propiedad', 'Vender una propiedad', 'Alquilar una propiedad', 'Poner mi propiedad en alquiler', 'Valorización o asesoría', 'Otro servicio inmobiliario'] },
  { value: 'Construcción e ingeniería', shortLabel: 'Construcción', icon: Crane, contextualLabel: 'Tipo de proyecto', contextualOptions: ['Construcción de vivienda', 'Diseño y planos arquitectónicos', 'Construcción comercial', 'Supervisión de obra', 'Ingeniería o expediente técnico', 'Otro'] },
  { value: 'Remodelación integral', shortLabel: 'Remodelación', icon: PaintBrush, contextualLabel: '¿Qué deseas remodelar?', contextualOptions: ['Vivienda completa', 'Cocina', 'Baño', 'Oficina o local comercial', 'Acabados y acondicionamiento', 'Otro'] },
  { value: 'Administración de edificios', shortLabel: 'Administración', icon: Buildings, contextualLabel: 'Tipo de inmueble', contextualOptions: ['Edificio residencial', 'Condominio', 'Edificio comercial', 'Otro'] },
] as const

const serviceMap: Record<string, string> = {
  inmobiliaria: 'Inmobiliaria',
  'construccion-ingenieria': 'Construcción e ingeniería',
  'remodelacion-integral': 'Remodelación integral',
  'administracion-edificios': 'Administración de edificios',
}

interface FormValues { name: string; phone: string; email: string; service: string; context: string; location: string; message: string }
type FormField = keyof FormValues
type FormErrors = Partial<Record<FormField, string>>

function getFieldError(field: FormField, values: FormValues) {
  if (field === 'name' && !values.name.trim()) return 'Ingresa tu nombre completo.'
  if (field === 'phone') {
    const digits = values.phone.replace(/\D/g, '')
    if (digits.length < 8 || digits.length > 15) return 'Ingresa un número de teléfono válido.'
  }
  if (field === 'email' && values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email)) return 'Revisa el formato de tu correo electrónico.'
  if (field === 'service' && !values.service) return 'Selecciona el servicio que necesitas.'
  if (field === 'message' && values.message.trim().length < 10) return 'Cuéntanos brevemente qué necesitas.'
  return undefined
}

function hasMeaningfulValue(field: FormField, values: FormValues) {
  if (field === 'phone') return values.phone.replace(/\D/g, '').length > 2
  return Boolean(values[field].trim())
}

export function ContactForm() {
  const [params] = useSearchParams()
  const initialService = serviceMap[params.get('servicio') ?? ''] ?? ''
  const createInitialValues = (): FormValues => ({ name: '', phone: '+51 ', email: '', service: initialService, context: '', location: '', message: '' })
  const [values, setValues] = useState<FormValues>(createInitialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const selectedService = serviceOptions.find((service) => service.value === values.service)

  const update = (field: FormField, value: string) => {
    const nextValues = field === 'service'
      ? { ...values, service: value, context: '' }
      : { ...values, [field]: value }
    setValues(nextValues)
    setErrors((current) => field === 'service'
      ? { ...current, service: hasAttemptedSubmit ? getFieldError('service', nextValues) : undefined, context: undefined, location: undefined }
      : { ...current, [field]: hasAttemptedSubmit ? getFieldError(field, nextValues) : undefined })
  }

  const validateField = (field: FormField) => {
    if (!hasAttemptedSubmit && !hasMeaningfulValue(field, values)) return
    const error = getFieldError(field, values)
    setErrors((current) => ({ ...current, [field]: error }))
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasAttemptedSubmit(true)
    const requiredFields: FormField[] = ['name', 'phone', 'email', 'service', 'message']
    const nextErrors = requiredFields.reduce<FormErrors>((current, field) => ({ ...current, [field]: getFieldError(field, values) }), {})
    setErrors(nextErrors)

    const firstInvalid = requiredFields.find((field) => nextErrors[field])
    if (firstInvalid) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus())
      return
    }

    const message = [
      'Solicitud de asesoría — Grupo CGL',
      '',
      `Nombre: ${values.name.trim()}`,
      `Teléfono: ${values.phone.trim()}`,
      values.email.trim() && `Correo: ${values.email.trim()}`,
      `Servicio: ${values.service}`,
      values.context && `Detalle del servicio: ${values.context}`,
      values.location.trim() && `Ubicación: ${values.location.trim()}`,
      `Descripción: ${values.message.trim()}`,
    ].filter(Boolean).join('\n')

    window.location.href = `https://wa.me/${contactData.whatsappNumber}?text=${encodeURIComponent(message)}`
  }

  return <form ref={formRef} className="contact-form" onSubmit={submit} noValidate>
    <fieldset className="service-choice" aria-describedby={errors.service ? 'contact-service-error' : undefined}>
      <legend>Tipo de servicio requerido <b aria-hidden="true">*</b></legend>
      <div className="service-options">{serviceOptions.map(({ value, shortLabel, icon: Icon }) => <label className={`service-option${values.service === value ? ' is-selected' : ''}`} key={value}>
        <input type="radio" name="service" value={value} checked={values.service === value} onChange={() => update('service', value)} required aria-invalid={Boolean(errors.service)} />
        <Icon size={28} weight="light" aria-hidden="true" /><span>{shortLabel}</span>
      </label>)}</div>
      {errors.service && <small id="contact-service-error" className="field-error" role="alert">{errors.service}</small>}
    </fieldset>
    <Field id="contact-name" label="Nombre completo" error={errors.name} required>
      <input id="contact-name" name="name" value={values.name} onChange={(event) => update('name', event.target.value)} onBlur={() => validateField('name')} placeholder="Ej. Juan Pérez" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
    </Field>
    <Field id="contact-email" label="Correo electrónico" error={errors.email}>
      <input id="contact-email" name="email" type="email" value={values.email} onChange={(event) => update('email', event.target.value)} onBlur={() => validateField('email')} placeholder="correo@ejemplo.com" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
    </Field>
    <Field id="contact-phone" label="Teléfono / WhatsApp" error={errors.phone} required>
      <input id="contact-phone" name="phone" type="tel" inputMode="tel" value={values.phone} onChange={(event) => update('phone', event.target.value)} onBlur={() => validateField('phone')} placeholder="+51 987 654 321" autoComplete="tel" required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'contact-phone-error' : undefined} />
    </Field>
    <Field id="contact-location" label="Distrito o ubicación del inmueble" helper="Opcional">
      <input id="contact-location" name="location" value={values.location} onChange={(event) => update('location', event.target.value)} placeholder="Ej. Miraflores, San Isidro, Surco" autoComplete="address-level2" />
    </Field>
    {selectedService && <fieldset className="contextual-fields" aria-live="polite">
      <legend>Información sobre {selectedService.value}</legend>
      <Field id="contact-context" label={selectedService.contextualLabel}>
        <select id="contact-context" name="context" value={values.context} onChange={(event) => update('context', event.target.value)}>
          <option value="">Selecciona una opción</option>
          {selectedService.contextualOptions.map((option) => <option value={option} key={option}>{option}</option>)}
        </select>
      </Field>
    </fieldset>}
    <Field id="contact-message" className="form-field--full" label="Cuéntanos sobre tu proyecto" error={errors.message} required>
      <textarea id="contact-message" name="message" rows={5} value={values.message} onChange={(event) => update('message', event.target.value)} onBlur={() => validateField('message')} placeholder="Describe brevemente qué necesitas, dónde se encuentra el inmueble o qué tienes en mente..." required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
    </Field>
    <button className="submit-button" type="submit"><WhatsappLogo size={19} weight="fill" aria-hidden="true" />Enviar solicitud por WhatsApp</button>
  </form>
}

interface FieldProps { id: string; label: string; helper?: string; error?: string; required?: boolean; className?: string; children: ReactNode }
function Field({ id, label, helper, error, required, className, children }: FieldProps) {
  const errorId = `${id}-error`
  return <div className={`form-field${className ? ` ${className}` : ''}`}><label htmlFor={id}>{label}{required && <b aria-hidden="true"> *</b>}</label>{children}{helper && <small>{helper}</small>}{error && <small id={errorId} className="field-error" role="alert">{error}</small>}</div>
}
