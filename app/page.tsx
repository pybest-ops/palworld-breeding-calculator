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
    answer:
      'Yes. Core features are free. Some pages may show non-intrusive ads to support maintenance.',
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

      <section className="bg-cream px-4 pb-12 pt-10 md:px-6 md:pt-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl">
              Find the Perfect Breed Combo
            </h1>
            <p className="text-lg text-stone">
              Enter two parents or search for a target Pal — see child results, combos, and breeding conditions in seconds.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center rounded-lg bg-forest px-5 py-3 font-semibold text-white shadow-sm hover:bg-ink"
              >
                Find My Combo
              </a>
              <a
                href="/combos"
                className="inline-flex items-center justify-center rounded-lg border border-sand bg-paper px-5 py-3 font-semibold text-forest hover:bg-mist"
              >
                Browse All Combos
              </a>
            </div>
          </div>

          <div id="calculator">
            <Suspense fallback={<div className="rounded-2xl border border-sand bg-paper p-8 text-center"><p className="text-stone">Loading calculator…</p></div>}>
              <BreedingCalculator />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center font-display text-2xl font-bold">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Select parent Pals',
                body: 'Pick any two parents from the dropdown or search by name.',
              },
              {
                step: '2',
                title: 'View the result',
                body: 'Instantly see the child Pal, breeding probability, and incubation needs.',
              },
              {
                step: '3',
                title: 'Share or reverse-search',
                body: 'Copy the result URL or search for a target child to find more combos.',
              },
            ].map((card) => (
              <div key={card.step} className="rounded-xl border border-sand bg-cream p-6">
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-forest text-sm font-bold text-white">
                  {card.step}
                </span>
                <h3 className="mb-2 font-display text-xl font-semibold">{card.title}</h3>
                <p className="text-stone">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center font-display text-2xl font-bold">What Can You Do?</h2>
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
                icon: <Share2 className="text-amber" size={24} />,
              },
              {
                title: 'Share combos with friends',
                body: 'Every result gets a shareable link, perfect for Discord or Reddit.',
                icon: <Smartphone className="text-amber" size={24} />,
              },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border border-sand bg-paper p-6">
                <div className="mb-3">{card.icon}</div>
                <h3 className="mb-2 font-display text-xl font-semibold">{card.title}</h3>
                <p className="text-stone">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center font-display text-2xl font-bold">Why Use This Tool?</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              'Two-way lookup — Parent-to-child and child-to-parents in one place.',
              'Shareable results — Copy a link to any calculation.',
              'Mobile-friendly — Built to work while you play.',
              'Community-driven data — Updated from publicly available community research.',
            ].map((item) => (
              <div key={item} className="rounded-lg border border-sand bg-cream p-5">
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-12 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-display text-2xl font-bold">Frequently Asked Questions</h2>
          <FAQ items={faqItems} />
        </div>
      </section>
    </>
  );
}
