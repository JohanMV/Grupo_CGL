import { useLayoutEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

export function SiteLayout() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const mainRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (reduceMotion || location.pathname === '/') return

    const sections = mainRef.current?.querySelectorAll<HTMLElement>(
      ':scope > section:not(:first-child), :scope > div > section:not(:first-child)',
    )
    if (!sections?.length) return

    sections.forEach((section) => section.classList.add('scroll-reveal-section'))

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [location.pathname, reduceMotion])

  return (
    <>
      <Header />
      <motion.main
        ref={mainRef}
        key={location.pathname}
        className="site-main"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </>
  )
}
