import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Palworld Breeding Calculator: community-driven data, disclaimers, and how we keep the tool up to date.',
  alternates: { canonical: 'https://palworldbreedingcalculator.wiki/about' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Palworld Breeding Calculator',
  url: 'https://palworldbreedingcalculator.wiki/about',
  description:
    'A fast, free, unofficial breeding calculator for Palworld players built from community data.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Palworld Breeding Calculator',
    url: 'https://palworldbreedingcalculator.wiki',
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-cream px-4 pb-12 pt-8 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 space-y-3">
            <h1 className="font-display text-3xl font-bold md:text-4xl">About the Tool</h1>
            <p className="text-lg text-stone">
              A fast, free, unofficial breeding calculator for Palworld players.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-forest px-5 py-3 font-semibold text-white shadow-sm hover:bg-ink"
              >
                Try the Calculator
              </Link>
              <Link
                href="/guide"
                className="inline-flex items-center justify-center rounded-lg border border-sand bg-paper px-5 py-3 font-semibold text-forest hover:bg-mist"
              >
                Read the Guide
              </Link>
            </div>
          </div>

          <div className="prose-legal space-y-8">
            <article className="rounded-xl border border-sand bg-paper p-6">
              <h2>Why We Built This</h2>
              <p>
                Palworld players need a fast way to find the right parent pairs. We built this calculator to replace slow Wiki tables and scattered Reddit threads with a clean, shareable tool that works on any device.
              </p>
            </article>

            <article className="rounded-xl border border-sand bg-paper p-6">
              <h2>Data Source and Version</h2>
              <p>
                The breeding data comes from publicly available community research. We do not scrape official game servers or host copyrighted game assets. The data is versioned with each site update, so you can see which game version the current dataset reflects.
              </p>
              <p className="font-mono text-sm text-stone">Current data version: v1.0.0 — game version TBD</p>
            </article>

            <article className="rounded-xl border border-sand bg-paper p-6">
              <h2>Important Disclaimer</h2>
              <p>
                Palworld Breeding Calculator is an unofficial, fan-made tool. It is not affiliated with, endorsed by, or sponsored by Pocketpair Inc. Palworld is a trademark of its respective owner. Breeding results are based on community data and may change with game updates. Always verify critical information in-game.
              </p>
              <p>
                Read our <Link href="/privacy">Privacy Policy</Link> and{' '}
                <Link href="/terms">Terms of Use</Link>.
              </p>
            </article>

            <article className="rounded-xl border border-sand bg-paper p-6">
              <h2>Support the Tool</h2>
              <p>
                The calculator is free to use. If you want to help cover domain and maintenance costs, you can buy us a coffee. Supporters do not unlock extra features — the core tool stays free for everyone.
              </p>
              <a
                href="https://ko-fi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-amber px-5 py-3 font-semibold text-white shadow-sm hover:bg-amber/90"
              >
                Buy Us a Coffee
              </a>
            </article>

            <article className="rounded-xl border border-sand bg-paper p-6">
              <h2>Contact</h2>
              <p>
                Questions or feedback? Reach us at{' '}
                <a href="mailto:contact@palworldbreedingcalculator.wiki">
                  contact@palworldbreedingcalculator.wiki
                </a>
                .
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
