'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="hud-panel divide-y divide-cyan/10">
      {items.map((item, index) => {
        const isOpen = open.has(index);
        return (
          <div key={index} className="relative">
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-cyan/5"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg font-semibold text-ink pr-4">{item.question}</span>
              {isOpen ? (
                <ChevronUp className="shrink-0 text-cyan" size={20} />
              ) : (
                <ChevronDown className="shrink-0 text-muted" size={20} />
              )}
            </button>
            {isOpen && (
              <div className="px-5 pb-4">
                <p className="leading-relaxed text-muted">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
