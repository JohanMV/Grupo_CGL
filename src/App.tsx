import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from '@/layouts/SiteLayout'
import { AboutPage, ContactPage, HomePage, NotFoundPage, ProjectDetailPage, ProjectsPage, PropertiesPage, PropertyDetailPage, ServiceDetailPage, ServicesPage } from '@/features/pages'

function App() {
  return <Routes><Route element={<SiteLayout />}><Route index element={<HomePage />} /><Route path="nosotros" element={<AboutPage />} /><Route path="servicios" element={<ServicesPage />} /><Route path="servicios/:slug" element={<ServiceDetailPage />} /><Route path="proyectos" element={<ProjectsPage />} /><Route path="proyectos/:slug" element={<ProjectDetailPage />} /><Route path="propiedades" element={<PropertiesPage />} /><Route path="propiedades/:slug" element={<PropertyDetailPage />} /><Route path="contacto" element={<ContactPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes>
}

export default App
