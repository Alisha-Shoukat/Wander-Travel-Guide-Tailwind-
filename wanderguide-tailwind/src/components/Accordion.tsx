import { useState } from 'react';
interface AccordionItem {
  header: string;
  body: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="overflow-hidden rounded-wg-md border border-border-muted dark:border-[#2a3a4a]">
      {items.map((item, index) => (
        <div key={index}>
          <div
            className={`cursor-pointer select-none border-b border-border-muted bg-bg-card px-4 py-3 font-semibold transition dark:border-[#2a3a4a] dark:bg-[#172435] ${openIndex === index ? 'text-brand-third' : 'text-text-primary dark:text-[#f0ece4]'}`}
            onClick={() => toggle(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggle(index)}
          >
            {item.header}
          </div>
          <div
            className={`overflow-hidden bg-bg-main transition-[max-height] duration-[400ms] ease-out dark:bg-[#0f1e2d] ${openIndex === index ? 'max-h-[600px]' : 'max-h-0'}`}
          >
            <p className="px-4 pb-4 pt-3 text-text-secondary dark:text-[#c8c0b0]">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
