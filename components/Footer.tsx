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
    <footer className="border-t border-cyan/20 bg-void-light">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div className="space-y-2">
            <Link href="/" className="font-display text-lg font-bold text-cyan tracking-wide">
              PALWORLD BREEDER
            </Link>
            <p className="max-w-md text-sm text-muted">
              A fast, free, unofficial breeding calculator for Palworld players. Built from community data.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-cyan"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hud-divider my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-dark sm:flex-row">
          <p>
            © 2026 palworldbreedingcalculator.wiki — Unofficial fan tool. Palworld is a trademark of its respective owner.
          </p>
          <p className="font-mono">
            v2.0.0
          </p>
        </div>
      </div>
    </footer>
  );
}
