interface SectionHeadingProps {
  title: string
  text?: string
  eyebrow?: string
  light?: boolean
}

export function SectionHeading({ title, text, eyebrow, light = false }: SectionHeadingProps) {
  return (
    <header className={`section-heading ${light ? 'section-heading-light' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </header>
  )
}
