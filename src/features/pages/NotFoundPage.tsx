import { ButtonLink } from '@/components/ui'

interface NotFoundPageProps { compact?: boolean }

export function NotFoundPage({ compact = false }: NotFoundPageProps) {
  return <section className={`not-found ${compact ? 'not-found-compact' : ''}`}><div><span>404</span><h1>Esta página no está disponible.</h1><p>El contenido que buscas pudo cambiar o la dirección puede ser incorrecta.</p><ButtonLink to="/" variant="primary">Volver al inicio</ButtonLink></div></section>
}
