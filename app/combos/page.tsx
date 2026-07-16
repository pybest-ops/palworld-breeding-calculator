import { Metadata } from 'next';
import ComboTable from '@/components/ComboTable';
import FAQ from '@/components/FAQ';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Palworld Breeding Combos',
  description:
    'Browse all Palworld breeding combos. Search by parent or child Pal to find the exact pair you need.',
  alternates: { canonical: 'https://palworldbreedingcalculator.wiki/combos' },
};

const faqItems = [
  {
    question: 'How do I read the combo table?',
    answer:
      'Each row shows two parents and the child Pal they can produce, along with probability and incubation details.',
  },
  {
    question: 'What is the best combo for a specific Pal?',
    answer:
      'The “best” combo depends on your goals. Use the reverse search to find every pair that produces your target child, then pick the one that matches your current Pals.',
  },
  {
    question: 'Can I filter by element or type?',
    answer:
      'If the data supports it, yes. Select an element filter to narrow down results by the child’s type.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function CombosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="px-4 pb-12 pt-8 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan border border-cyan/30 bg-cyan-fade"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
            >
              Database
            </div>
            
            <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
              Discover Every Breeding Combo
            </h1>
            <p className="text-lg text-muted">
              Search the full combo database by parent, child, or type. Find the pair that gets you the Pal you want.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="hud-btn-primary"
              >
                Open the Calculator
              </Link>
              <Link
                href="/guide"
                className="hud-btn-secondary"
              >
                Read the Guide
              </Link>
            </div>
          </div>

          <ComboTable />

          <div className="mt-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan/40" />
              <h2 className="font-display text-2xl font-bold text-white">Combo FAQ</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan/40" />
            </div>
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}
