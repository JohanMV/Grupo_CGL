import { useState } from 'react'
import { Plus, Minus } from '@phosphor-icons/react'

interface AccordionItem { question: string; answer: string }
interface AccordionProps { items: AccordionItem[] }

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <div className="accordion">
      {items.map((item, index) => {
        const open = openIndex === index
        return (
          <div className="accordion-item" key={item.question}>
            <button type="button" aria-expanded={open} onClick={() => setOpenIndex(open ? null : index)}>
              <span>{item.question}</span>{open ? <Minus size={20} /> : <Plus size={20} />}
            </button>
            <div className="accordion-panel" hidden={!open}><p>{item.answer}</p></div>
          </div>
        )
      })}
    </div>
  )
}
