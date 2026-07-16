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

      <section className="px-4 pb-12 pt-8 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan border border-cyan/30 bg-cyan-fade"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
            >
              About
            </div>
            
            <h1 className="font-display text-3xl font-bold text-white md:text-4xl">About the Tool</h1>
            <p className="text-lg text-muted">
              A fast, free, unofficial breeding calculator for Palworld players.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="hud-btn-primary"
              >
                Try the Calculator
              </Link>
              <Link
                href="/guide"
                className="hud-btn-secondary"
              >
                Read the Guide
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <article className="hud-panel p-6">
              <div className="mb-3 h-1 w-12 bg-cyan" />
              <h2 className="font-display text-2xl font-bold text-white">Why We Built This</h2>
              <p className="leading-relaxed text-ink">
                Palworld players need a fast way to find the right parent pairs. We built this calculator to replace slow Wiki tables and scattered Reddit threads with a clean, shareable tool that works on any device.
              </p>
            </article>

            <article className="hud-panel p-6">
              <div className="mb-3 h-1 w-12 bg-cyan" />
              <h2 className="font-display text-2xl font-bold text-white">Data Source and Version</h2>
              <p className="leading-relaxed text-ink">
                The breeding data comes from the PalCalc community dataset. We do not scrape official game servers or host copyrighted game assets. The data is versioned with each site update, so you can see which game version the current dataset reflects.
              </p>
              <p className="font-mono text-sm text-muted">Current data version: v2.0.0 — synced with PalCalc community data</p>
            </article>

            <article className="hud-panel p-6">
              <div className="mb-3 h-1 w-12 bg-cyan" />
              <h2 className="font-display text-2xl font-bold text-white">Important Disclaimer</h2>
              <p className="leading-relaxed text-ink">
                Palworld Breeding Calculator is an unofficial, fan-made tool. It is not affiliated with, endorsed by, or sponsored by Pocketpair Inc. Palworld is a trademark of its respective owner. Breeding results are based on community data and may change with game updates. Always verify critical information in-game.
              </p>
              <p className="leading-relaxed text-ink">
                Read our <Link href="/privacy" className="text-cyan hover:text-cyan-dim">Privacy Policy</Link> and{' '}
                <Link href="/terms" className="text-cyan hover:text-cyan-dim">Terms of Use</Link>.
              </p>
            </article>

            <article className="hud-panel p-6">
              <div className="mb-3 h-1 w-12 bg-cyan" />
              <h2 className="font-display text-2xl font-bold text-white">Contact</h2>
              <p className="leading-relaxed text-ink">
                Questions or feedback? Reach us at{' '}
                <a href="mailto:contact@palworldbreedingcalculator.wiki" className="text-cyan hover:text-cyan-dim">
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
