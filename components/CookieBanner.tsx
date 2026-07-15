'use client';

import { useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';

type Consent = {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  preferences: boolean;
};

const KEY = 'pbc_cookie_consent';

function getStoredConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Consent;
  } catch {
    return null;
  }
}

function saveConsent(consent: Consent) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(consent));
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [manage, setManage] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    essential: true,
    analytics: false,
    advertising: false,
    preferences: false,
  });

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setShow(true);
    } else {
      setConsent(stored);
    }
  }, []);

  const acceptAll = () => {
    const c = { essential: true, analytics: true, advertising: true, preferences: true };
    setConsent(c);
    saveConsent(c);
    setShow(false);
    setManage(false);
  };

  const rejectNonEssential = () => {
    const c = { essential: true, analytics: false, advertising: false, preferences: false };
    setConsent(c);
    saveConsent(c);
    setShow(false);
    setManage(false);
  };

  const savePreferences = () => {
    saveConsent(consent);
    setShow(false);
    setManage(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-sand bg-paper p-4 shadow-lg md:bottom-4 md:left-auto md:right-4 md:max-w-md md:rounded-xl md:border">
      <div className="flex items-start gap-3">
        <Cookie className="mt-1 shrink-0 text-forest" size={20} />
        <div className="flex-1">
          <p className="text-sm text-ink">
            We use cookies to improve your experience and to support the site through analytics and ads.
          </p>

          {!manage ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={acceptAll}
                className="rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
              >
                Accept all
              </button>
              <button
                onClick={() => setManage(true)}
                className="rounded-lg border border-sand px-4 py-2 text-sm font-semibold text-forest hover:bg-mist"
              >
                Manage cookies
              </button>
              <button
                onClick={rejectNonEssential}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-stone hover:bg-mist"
              >
                Reject non-essential
              </button>
            </div>
          ) : (
            <div className="mt-3 space-y-3">
              <div className="space-y-2 rounded-lg bg-cream p-3">
                {(
                  [
                    ['essential', 'Essential', 'Always on. Required for the site to work.'],
                    ['analytics', 'Analytics', 'Helps us understand how visitors use the site.'],
                    ['advertising', 'Advertising', 'Supports the site through relevant ads.'],
                    ['preferences', 'Preferences', 'Remembers your display choices.'],
                  ] as const
                ).map(([key, label, desc]) => (
                  <label key={key} className="flex items-center justify-between gap-3">
                    <span className="text-sm">
                      <span className="font-medium">{label}</span>
                      <span className="block text-xs text-stone">{desc}</span>
                    </span>
                    <input
                      type="checkbox"
                      disabled={key === 'essential'}
                      checked={consent[key]}
                      onChange={(e) =>
                        setConsent((c) => ({ ...c, [key]: e.target.checked }))
                      }
                      className="h-5 w-5 accent-forest"
                    />
                  </label>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={savePreferences}
                  className="rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
                >
                  Save preferences
                </button>
                <button
                  onClick={acceptAll}
                  className="rounded-lg border border-sand px-4 py-2 text-sm font-semibold text-forest hover:bg-mist"
                >
                  Accept all
                </button>
                <button
                  onClick={rejectNonEssential}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-stone hover:bg-mist"
                >
                  Reject all
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={rejectNonEssential}
          className="shrink-0 text-stone hover:text-ink"
          aria-label="Close cookie banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
