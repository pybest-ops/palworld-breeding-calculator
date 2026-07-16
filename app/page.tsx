import { Metadata } from 'next';
import { Suspense } from 'react';
import BreedingCalculator from '@/components/BreedingCalculator';
import FAQ from '@/components/FAQ';
import { Zap, Share2, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Palworld Breeding Calculator',
  description:
    'Free Palworld breeding calculator. Enter two parents or search for a target Pal to see child results, combos, and breeding conditions.',
  alternates: { canonical: 'https://palworldbreedingcalculator.wiki/' },
};

const faqItems = [
  {
    question: 'Is this an official Palworld tool?',
    answer:
      'No. This is an unofficial, fan-made calculator. It is not affiliated with, endorsed by, or sponsored by Pocketpair Inc.',
  },
  {
    question: 'How accurate are the breeding results?',
    answer:
      'Results are based on the best available community data. Game updates may change values, so always verify important details in-game.',
  },
  {
    question: 'Can I share a result with someone else?',
    answer:
      'Yes. Each calculation can be shared with a URL, so friends can see the same result instantly.',
  },
  {
    question: 'Does this work on mobile?',
    answer:
      'Yes. The calculator, combo table, and guide are all responsive and work on phones and tablets.',
  },
  {
    question: 'What data does the site use?',
    answer:
      'The site uses a community-derived breeding-power dataset covering 299 Pal species and all formula-based combos. Values are based on publicly available fan research and game observations.',
  },
  {
    question: 'Is the tool free?',
    answer: 'Yes. Core features are free. Some pages may show non-intrusive ads to support maintenance.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Palworld Breeding Calculator',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      url: 'https://palworldbreedingcalculator.wiki/',
      description:
        'Free Palworld breeding calculator. Enter two parents or search for a target Pal to see child results, combos, and breeding conditions.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@type': 'HowTo',
      name: 'How to breed a specific Pal in Palworld',
      description:
        'Enter two parent Pals or search for a target child to discover breeding combos.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Select parent Pals',
          text: 'Pick any two parents from the dropdown or search by name.',
        },
        {
          '@type': 'HowToStep',
          name: 'View the result',
          text: 'Instantly see the child Pal, breeding probability, and incubation needs.',
        },
        {
          '@type': 'HowToStep',
          name: 'Share or reverse-search',
          text: 'Copy the result URL or search for a target child to find more combos.',
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative overflow-hidden px-4 pb-12 pt-10 md:px-6 md:pt-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan/5 via-transparent to-transparent" />
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan border border-cyan/30 bg-cyan-fade"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
              Unofficial Fan Tool
            </div>
            
            <h1 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl">
              Find the Perfect
              <span className="block text-cyan">Breed Combo</span>
            </h1>
            <p className="text-lg text-muted">
              Enter two parents or search for a target Pal — see child results, combos, and breeding conditions in seconds.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#calculator"
                className="hud-btn-primary"
              >
                Find My Combo
              </a>
              <a
                href="/combos"
                className="hud-btn-secondary"
              >
                Browse All Combos
              </a>
            </div>
          </div>

          <div id="calculator">
            <Suspense fallback={<div className="hud-panel p-8 text-center">
              <p className="text-muted">Loading calculator…</p>
            </div>}>
              <BreedingCalculator />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan/40" />
            <h2 className="font-display text-2xl font-bold text-white">How It Works</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan/40" />
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Select parent Pals',
                body: 'Pick any two parents from the dropdown or search by name.',
              },
              {
                step: '02',
                title: 'View the result',
                body: 'Instantly see the child Pal, breeding probability, and incubation needs.',
              },
              {
                step: '03',
                title: 'Share or reverse-search',
                body: 'Copy the result URL or search for a target child to find more combos.',
              },
            ].map((card) => (
              <div key={card.step} className="hud-panel p-6">
                <span className="mb-3 inline-block font-mono text-sm font-bold text-cyan">
                  {card.step}
                </span>
                <h3 className="mb-2 font-display text-xl font-semibold text-white">{card.title}</h3>
                <p className="text-muted">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan/40" />
            <h2 className="font-display text-2xl font-bold text-white">What Can You Do?</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan/40" />
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Find the best parents for a target Pal',
                body: 'Search for the child you want and see every compatible pair.',
                icon: <Zap className="text-amber" size={24} />,
              },
              {
                title: 'Check what a random pair will produce',
                body: 'Enter two parents and see the predicted outcome.',
                icon: <Share2 className="text-cyan" size={24} />,
              },
              {
                title: 'Share combos with friends',
                body: 'Every result gets a shareable link, perfect for Discord or Reddit.',
                icon: <Smartphone className="text-terra" size={24} />,
              },
            ].map((card) => (
              <div key={card.title} className="hud-panel p-6">
                <div className="mb-3">{card.icon}</div>
                <h3 className="mb-2 font-display text-xl font-semibold text-white">{card.title}</h3>
                <p className="text-muted">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="hud-panel p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan/40" />
              <h2 className="font-display text-2xl font-bold text-white">Why Use This Tool?</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan/40" />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                'Two-way lookup — Parent-to-child and child-to-parents in one place.',
                'Shareable results — Copy a link to any calculation.',
                'Mobile-friendly — Built to work while you play.',
                'Community-driven data — Updated from publicly available community research.',
              ].map((item) => (
                <div key={item} className="hud-panel border-cyan/10 bg-cyan-fade p-5">
                  <div className="mb-2 h-1 w-8 bg-cyan" />
                  <p className="text-sm text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan/40" />
            <h2 className="font-display text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan/40" />
          </div>
          
          <FAQ items={faqItems} />
        </div>
      </section>
    </>
  );
}
