import { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Palworld Breeding Calculator collects, uses, and protects your information.',
  alternates: { canonical: 'https://palworldbreedingcalculator.wiki/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-cream px-4 pb-12 pt-8 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold md:text-4xl">Privacy Policy</h1>
            <p className="mt-2 text-sm text-stone">Effective date: 2026-07-15 · Last updated: 2026-07-15</p>
          </div>

          <article className="prose-legal rounded-xl border border-sand bg-paper p-6">
            <p>
              Palworld Breeding Calculator (“we,” “us,” or “our”) operates the website{' '}
              <strong>palworldbreedingcalculator.wiki</strong> (the “Site”). This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit or use the Site.
            </p>
            <p>
              By using the Site, you agree to this Privacy Policy. If you do not agree, please do not use the Site.
            </p>

            <h2>1. Information We Collect</h2>
            <h3>Information You Provide Voluntarily</h3>
            <p>
              We do not require users to create accounts or log in. If you choose to contact us, we may collect the email address and message content you send.
            </p>
            <h3>Information Collected Automatically</h3>
            <p></p>
            <ul>
              <li>Usage Data — pages visited, time spent, clicks, referrer, device/browser type.</li>
              <li>Cookie / Local Storage — cookie consent preference and display settings.</li>
              <li>Calculator State — Pal selections may be encoded in the URL for sharing only.</li>
            </ul>

            <h2>2. Third-Party Analytics and Advertising</h2>
            <p>We may use the following third-party services:</p>
            <ul>
              <li>Google Analytics (optional) — measure site usage.</li>
              <li>Google AdSense (optional) — display contextual advertisements.</li>
              <li>Plausible Analytics (optional) — privacy-friendly, anonymous analytics.</li>
            </ul>

            <h2>3. How We Use Information</h2>
            <ul>
              <li>Operate and improve the Site.</li>
              <li>Analyze traffic and understand usage.</li>
              <li>Show non-intrusive advertisements to support the Site.</li>
              <li>Communicate with you when you contact us.</li>
            </ul>

            <h2>4. Cookies and Similar Technologies</h2>
            <p>We use Essential, Analytics, Advertising, and Preferences cookies. You can manage cookies through your browser settings.</p>

            <h2>5. Children’s Privacy</h2>
            <p>The Site is not directed to children under 13. We do not knowingly collect personal information from children.</p>

            <h2>6. Data Sharing and Disclosure</h2>
            <p>We do not sell your information. We may share data with service providers or when required by law.</p>

            <h2>7. International Visitors</h2>
            <p>The Site is intended for users in the United States. If you access it from outside the United States, your information may be transferred to U.S. jurisdictions.</p>

            <h2>8. Data Security</h2>
            <p>We take reasonable measures to protect the information we collect, but no method of transmission is completely secure.</p>

            <h2>9. Your Rights and Choices</h2>
            <p>Depending on your jurisdiction, you may have rights to access, correct, delete, or opt out of data collection. Because the Site does not require accounts, most data is pseudonymous or anonymous.</p>

            <h2>10. Third-Party Links</h2>
            <p>The Site may contain links to third-party websites. We are not responsible for their privacy practices.</p>

            <h2>11. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions, contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </article>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="text-terra underline">Terms of Use</Link>
            <Link href="/cookie-policy" className="text-terra underline">Cookie Policy</Link>
          </div>
        </div>
      </section>
    </>
  );
}
