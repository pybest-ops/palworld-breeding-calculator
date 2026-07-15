import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn about the cookies and tracking technologies used on this site.',
  alternates: { canonical: 'https://palworldbreedingcalculator.wiki/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <>
      <section className="bg-cream px-4 pb-12 pt-8 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold md:text-4xl">Cookie Policy</h1>
            <p className="mt-2 text-sm text-stone">Effective date: 2026-07-15 · Last updated: 2026-07-15</p>
          </div>

          <article className="prose-legal rounded-xl border border-sand bg-paper p-6">
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device by websites you visit. They help websites remember preferences, measure traffic, and deliver relevant content. The Site may also use browser local storage for similar purposes.
            </p>

            <h2>Categories of Cookies We Use</h2>
            <ul>
              <li><strong>Essential</strong> — Enable the Site to function and remember your cookie consent choice.</li>
              <li><strong>Analytics</strong> — Understand how users interact with the Site.</li>
              <li><strong>Advertising</strong> — Display and measure ads that support the Site.</li>
              <li><strong>Preferences</strong> — Remember your display settings.</li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>Third-party services may place cookies on your device:</p>
            <ul>
              <li>Google Analytics / Google AdSense — may set cookies for measurement and ads.</li>
              <li>Plausible Analytics — does not use cookies by default.</li>
              <li>Ko-fi / Buy Me a Coffee — may set cookies on their donation pages.</li>
            </ul>

            <h2>How Long Do Cookies Last?</h2>
            <p>Session cookies are deleted when you close your browser. Persistent analytics and advertising cookies typically last up to two years. Local storage persists until you clear it.</p>

            <h2>How to Manage Cookies</h2>
            <p>You can manage or delete cookies through your browser settings:</p>
            <ul>
              <li>Chrome — Settings → Privacy and security → Cookies and other site data.</li>
              <li>Firefox — Settings → Privacy & Security → Cookies and Site Data.</li>
              <li>Safari — Settings → Privacy → Cookies and website data.</li>
              <li>Edge — Settings → Cookies and site permissions.</li>
            </ul>

            <h2>Consent</h2>
            <p>
              When you first visit the Site, a cookie banner asks you to accept or manage non-essential cookies. You can change your preferences at any time through the Cookie Settings link in the footer.
            </p>
          </article>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href="/privacy" className="text-terra underline">Privacy Policy</Link>
            <Link href="/terms" className="text-terra underline">Terms of Use</Link>
          </div>
        </div>
      </section>
    </>
  );
}
