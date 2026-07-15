import { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Palworld Breeding Guide',
  description:
    'Learn how breeding works in Palworld. Find parent combos, understand child results, and use the breeding calculator.',
  alternates: { canonical: 'https://palworldbreedingcalculator.wiki/guide' },
};

const guideFaq = [
  {
    question: 'Is this guide official?',
    answer:
      'No. This guide is fan-made and based on community research. It is not affiliated with Pocketpair Inc.',
  },
  {
    question: 'Do I need an account to use the calculator?',
    answer: 'No. The tool works without login or registration.',
  },
  {
    question: 'Can I use the calculator on my phone?',
    answer: 'Yes. The entire site is responsive and works on mobile devices.',
  },
  {
    question: 'How often is the data updated?',
    answer:
      'We update the data when new community research or game patches change breeding results. Check the About page for the latest version note.',
  },
];

const howTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to breed a specific Pal in Palworld',
  description:
    'A plain-English guide to finding the right parent Pals and hatching the child you want.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Choose a target child Pal',
      text: 'Decide which Pal you want to breed.',
    },
    {
      '@type': 'HowToStep',
      name: 'Find compatible parent pairs',
      text: 'Use the reverse search to see every pair that can produce your target.',
    },
    {
      '@type': 'HowToStep',
      name: 'Breed and incubate',
      text: 'Place the parents in the breeding farm and keep the egg at the right temperature.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: guideFaq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const sections = [
  {
    id: 'what-is-breeding',
    title: 'What Is Breeding in Palworld?',
    body: 'Breeding lets you combine two parent Pals to produce a new Pal egg. The child Pal is determined by the parents’ values, not by random chance alone. By choosing the right parents, you can target specific children and stack useful traits.',
  },
  {
    id: 'how-the-calculator-works',
    title: 'How the Calculator Works',
    body: 'Enter any two parent Pals to see the predicted child, or search for a child Pal to find every compatible parent pair. The tool uses community data to show probability, incubation time, temperature, and food needs.',
  },
  {
    id: 'choosing-parent-pals',
    title: 'Choosing Parent Pals',
    body: 'Not every pair produces the same result. Some Pals are more common as parents because they lead to powerful children. Use the reverse search on the calculator to find the shortest path to your target.',
  },
  {
    id: 'understanding-child-results',
    title: 'Understanding Child Results',
    body: 'The child result depends on the parents’ breeding values and game mechanics. Because game patches can change these values, the calculator is a guide, not a guarantee. Always confirm in-game before major decisions.',
  },
  {
    id: 'incubation-environment',
    title: 'Incubation and Environment',
    body: 'After breeding, the egg needs the right temperature and time to hatch. Some Pals need special conditions. The calculator shows these details when available, so you can prepare your farm.',
  },
  {
    id: 'passive-skills',
    title: 'Passive Skills and Inheritance',
    body: 'Children can inherit passive skills from their parents. Planning your parent pairs around desired passives can save hours of grinding. The calculator helps you identify which parents lead to which children so you can plan around the best traits.',
  },
];

export default function GuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([howTo, faqSchema]) }}
      />

      <section className="bg-cream px-4 pb-12 pt-8 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-sand bg-paper p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone">
                Table of Contents
              </p>
              <ul className="space-y-2">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-sm text-stone hover:text-forest"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#common-questions" className="text-sm text-stone hover:text-forest">
                    Common Questions
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="font-display text-3xl font-bold md:text-4xl">
                Learn How Breeding Works
              </h1>
              <p className="text-lg text-stone">
                A plain-English guide to breeding mechanics, parent selection, and how to get the Pals you want.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg bg-forest px-5 py-3 font-semibold text-white shadow-sm hover:bg-ink"
                >
                  Try the Calculator
                </Link>
                <Link
                  href="/combos"
                  className="inline-flex items-center justify-center rounded-lg border border-sand bg-paper px-5 py-3 font-semibold text-forest hover:bg-mist"
                >
                  View All Combos
                </Link>
              </div>
            </div>

            <div className="lg:hidden">
              <details className="rounded-xl border border-sand bg-paper p-4">
                <summary className="cursor-pointer font-semibold">Table of Contents</summary>
                <ul className="mt-3 space-y-2">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="text-sm text-stone hover:text-forest">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            {sections.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="rounded-xl border border-sand bg-paper p-6"
              >
                <h2 className="mb-3 font-display text-2xl font-bold">{s.title}</h2>
                <p className="mb-4 leading-relaxed text-ink">{s.body}</p>
                <Link
                  href={s.id === 'how-the-calculator-works' ? '/' : '/combos'}
                  className="text-terra underline underline-offset-4 hover:text-forest"
                >
                  {s.id === 'how-the-calculator-works' ? 'Open the Calculator' : 'Find a Combo Now'}
                </Link>
              </article>
            ))}

            <article id="common-questions" className="rounded-xl border border-sand bg-paper p-6">
              <h2 className="mb-4 font-display text-2xl font-bold">Common Questions</h2>
              <FAQ items={guideFaq} />
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
