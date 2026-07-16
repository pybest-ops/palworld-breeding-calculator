import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import VideoBackground from '@/components/VideoBackground';

const space = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
const dm = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
const mono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://palworldbreedingcalculator.wiki'),
  title: {
    default: 'Palworld Breeding Calculator | palworldbreedingcalculator.wiki',
    template: '%s | palworldbreedingcalculator.wiki',
  },
  description:
    'Free Palworld breeding calculator. Enter two parents or search for a target Pal to see child results, combos, and breeding conditions.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://palworldbreedingcalculator.wiki',
    siteName: 'Palworld Breeding Calculator',
    title: 'Palworld Breeding Calculator',
    description: 'Find the perfect Palworld breed combo in seconds.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palworld Breeding Calculator',
    description: 'Find the perfect Palworld breed combo in seconds.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://palworldbreedingcalculator.wiki' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${space.variable} ${dm.variable} ${mono.variable}`}>
      <head>
        {/* Privacy-friendly analytics by Plausible */}
        <script
          async
          src="https://plausible.shipsolo.io/js/pa-G_xSYdDfv6qvXX4Yrj_dI.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible = window.plausible || function () { (plausible.q = plausible.q || []).push(arguments); };
              plausible.init = plausible.init || function (i) { plausible.o = i || {}; };
              plausible.init();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-void font-body text-ink antialiased">
        <VideoBackground />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
