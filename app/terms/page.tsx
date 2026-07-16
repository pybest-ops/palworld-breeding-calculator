import { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Read the terms and conditions for using Palworld Breeding Calculator.',
  alternates: { canonical: 'https://palworldbreedingcalculator.wiki/terms' },
};

export default function TermsPage() {
  return (
    <>
      <section className="px-4 pb-12 pt-8 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan border border-cyan/30 bg-cyan-fade"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
            >
              Legal
            </div>
            
            <h1 className="font-display text-3xl font-bold text-white md:text-4xl">Terms of Use</h1>
            <p className="mt-2 text-sm text-muted">Effective date: 2026-07-15 · Last updated: 2026-07-15</p>
          </div>

          <article className="prose-legal hud-panel p-6">
            <p>
              These Terms of Use (“Terms”) govern your access to and use of the website{' '}
              <strong>palworldbreedingcalculator.wiki</strong> (the “Site”). By accessing or using the Site, you agree to be bound by these Terms.
            </p>

            <h2>1. Who We Are</h2>
            <p>
              Palworld Breeding Calculator is an unofficial, fan-made online tool. The Site is not affiliated with, endorsed by, sponsored by, or approved by Pocketpair Inc. or any other rights holder of Palworld. The Site uses community-contributed and publicly available information.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You may use the Site only if you can form a binding contract and are not barred from receiving services under applicable law. The Site is not directed to children under 13.
            </p>

            <h2>3. Permitted Use</h2>
            <p>You may use the Site for personal, non-commercial purposes, including:</p>
            <ul>
              <li>Looking up Palworld breeding combinations and results.</li>
              <li>Reading guides and explanations.</li>
              <li>Sharing result URLs for discussion or personal reference.</li>
            </ul>

            <h2>4. Prohibited Use</h2>
            <p>You may not use the Site for illegal purposes, scrape data without permission, reverse-engineer code, upload malware, impersonate the Site, or interfere with its availability.</p>

            <h2>5. Intellectual Property</h2>
            <p>
              The Site’s text, code, layout, and data compilation are owned by or licensed to the Site operator. Palworld game names, characters, and assets are trademarks and copyrights of their respective owners.
            </p>

            <h2>6. Disclaimers</h2>
            <p>
              The Site is not an official Palworld tool. The Site and services are provided “AS IS” without warranties. Breeding results may change with game updates. Always verify critical information in-game.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, the Site operator will not be liable for indirect, incidental, special, consequential, or punitive damages arising out of your use of the Site. Because the Site is free, this allocation of risk is reasonable.
            </p>

            <h2>8. Indemnification</h2>
            <p>You agree to defend and hold harmless the Site operator from claims arising from your use of the Site or violation of these Terms.</p>

            <h2>9. Donations and Subscriptions</h2>
            <p>Donations are voluntary and non-refundable. Optional subscriptions, if offered, will have separate terms. Core functionality remains free.</p>

            <h2>10. Advertising</h2>
            <p>The Site may display third-party ads. We are not responsible for advertiser content or claims.</p>

            <h2>11. Links to Third-Party Sites</h2>
            <p>The Site may link to third-party websites. Your use of those sites is at your own risk.</p>

            <h2>12. Termination</h2>
            <p>We may suspend or terminate your access at any time for any reason, including violation of these Terms.</p>

            <h2>13. Governing Law</h2>
            <p>These Terms are governed by the laws of the State of California, United States.</p>

            <h2>14. Changes to These Terms</h2>
            <p>We may update these Terms from time to time. Changes will be posted on this page with an updated effective date.</p>

            <h2>15. Contact Information</h2>
            <p>
              If you have questions, contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </article>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href="/privacy" className="text-cyan underline hover:text-cyan-dim">Privacy Policy</Link>
            <Link href="/cookie-policy" className="text-cyan underline hover:text-cyan-dim">Cookie Policy</Link>
          </div>
        </div>
      </section>
    </>
  );
}
