import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <section className="bg-cream px-4 py-20 text-center md:px-6">
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-4xl font-bold md:text-5xl">Page Not Found</h1>
        <p className="mt-4 text-lg text-stone">
          We couldn’t find that page. Try the calculator or the combos database.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-forest px-5 py-3 font-semibold text-white shadow-sm hover:bg-ink"
          >
            Go to Calculator
          </Link>
          <Link
            href="/combos"
            className="inline-flex items-center justify-center rounded-lg border border-sand bg-paper px-5 py-3 font-semibold text-forest hover:bg-mist"
          >
            Browse Combos
          </Link>
        </div>
      </div>
    </section>
  );
}
