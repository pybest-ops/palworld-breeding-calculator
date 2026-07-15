import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/combos', label: 'Combos' },
  { href: '/guide', label: 'Guide' },
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
];

export default function Footer() {
  return (
    <footer className="border-t border-sand bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div className="space-y-2">
            <Link href="/" className="font-display text-lg font-bold text-forest">
              palworldbreedingcalculator.wiki
            </Link>
            <p className="max-w-md text-sm text-stone">
              A fast, free, unofficial breeding calculator for Palworld players. Built from community data.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-stone hover:text-forest"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-sand pt-6 text-xs text-stone">
          <p>
            © 2026 palworldbreedingcalculator.wiki — Palworld Breeding Calculator is an unofficial fan tool. Palworld is a trademark of its respective owner.
          </p>
        </div>
      </div>
    </footer>
  );
}
