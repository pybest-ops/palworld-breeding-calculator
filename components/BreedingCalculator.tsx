'use client';

import { useEffect, useState } from 'react';
import {
  loadPals,
  findChildRemote,
  findParentsRemote,
  encodeCalc,
  decodeCalc,
  palById,
  type Pal,
  type Combo,
} from '@/lib/data';
import PalAvatar from './PalAvatar';
import { ArrowRightLeft, Share2, RotateCcw } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function BreedingCalculator() {
  const searchParams = useSearchParams();
  const [pals, setPals] = useState<Pal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [mode, setMode] = useState<'parents' | 'child'>('parents');
  const [parentA, setParentA] = useState('');
  const [parentB, setParentB] = useState('');
  const [child, setChild] = useState('');

  const [result, setResult] = useState<Combo | undefined>(undefined);
  const [parentResults, setParentResults] = useState<Combo[]>([]);
  const [resultLoading, setResultLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadPals()
      .then((palsData) => {
        if (cancelled) return;
        setPals(palsData);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Failed to load data');
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      const decoded = decodeCalc(q);
      if (decoded.a || decoded.b) {
        setMode('parents');
        setParentA(decoded.a || '');
        setParentB(decoded.b || '');
      } else if (decoded.c) {
        setMode('child');
        setChild(decoded.c || '');
      }
    }
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    setResultLoading(true);
    if (mode === 'parents' && parentA && parentB) {
      findChildRemote(parentA, parentB)
        .then((combo) => {
          if (cancelled) return;
          setResult(combo);
          setParentResults([]);
          setResultLoading(false);
        })
        .catch((err) => {
          if (cancelled) return;
          setError(err.message || 'Failed to find combo');
          setResultLoading(false);
        });
    } else if (mode === 'child' && child) {
      findParentsRemote(child)
        .then((combos) => {
          if (cancelled) return;
          setResult(undefined);
          setParentResults(combos);
          setResultLoading(false);
        })
        .catch((err) => {
          if (cancelled) return;
          setError(err.message || 'Failed to find parents');
          setResultLoading(false);
        });
    } else {
      setResult(undefined);
      setParentResults([]);
      setResultLoading(false);
    }
    return () => { cancelled = true; };
  }, [mode, parentA, parentB, child]);

  const selectedA = palById(pals, parentA);
  const selectedB = palById(pals, parentB);
  const selectedC = palById(pals, child);

  const updateUrl = (a?: string, b?: string, c?: string) => {
    if (typeof window === 'undefined') return;
    const encoded = encodeCalc(a, b, c);
    const url = new URL(window.location.href);
    if (encoded) url.searchParams.set('q', encoded);
    else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
  };

  const reset = () => {
    setParentA('');
    setParentB('');
    setChild('');
    setResult(undefined);
    setParentResults([]);
    updateUrl();
  };

  const share = async () => {
    if (typeof window === 'undefined') return;
    const encoded = encodeCalc(parentA, parentB, mode === 'child' ? child : undefined);
    if (!encoded) return;
    const url = `${window.location.origin}${window.location.pathname}?q=${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-sand bg-paper p-8 text-center">
        <p className="text-stone">Loading breeding data…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-terra bg-cream p-8 text-center">
        <p className="font-medium text-terra">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-sand bg-paper p-6 shadow-sm md:p-8">
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => { setMode('parents'); reset(); }}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            mode === 'parents'
              ? 'bg-forest text-white'
              : 'border border-sand bg-cream text-ink hover:bg-mist'
          }`}
        >
          Parents → Child
        </button>
        <button
          onClick={() => { setMode('child'); reset(); }}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            mode === 'child'
              ? 'bg-forest text-white'
              : 'border border-sand bg-cream text-ink hover:bg-mist'
          }`}
        >
          Child → Parents
        </button>
        <button
          onClick={reset}
          className="ml-auto inline-flex items-center gap-1 rounded-lg border border-sand bg-cream px-3 py-2 text-sm font-semibold text-stone hover:bg-mist"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      {mode === 'parents' ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Picker
              label="Parent 1"
              value={parentA}
              onSelect={(id) => {
                setParentA(id);
                updateUrl(id, parentB);
              }}
              pals={pals}
            />
            <Picker
              label="Parent 2"
              value={parentB}
              onSelect={(id) => {
                setParentB(id);
                updateUrl(parentA, id);
              }}
              pals={pals}
            />
          </div>

          {resultLoading ? (
            <div className="rounded-xl border border-sand bg-cream p-6 text-center">
              <p className="text-stone">Looking up combo…</p>
            </div>
          ) : result ? (
            <ResultCard combo={result} pals={pals} />
          ) : parentA && parentB ? (
            <div className="rounded-xl border border-sand bg-cream p-6 text-center">
              <p className="font-medium text-stone">No known combo for this pair.</p>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="space-y-4">
          <Picker
            label="Target Child"
            value={child}
            onSelect={(id) => {
              setChild(id);
              updateUrl(undefined, undefined, id);
            }}
            pals={pals}
          />

          {resultLoading ? (
            <div className="rounded-xl border border-sand bg-cream p-6 text-center">
              <p className="text-stone">Looking up parents…</p>
            </div>
          ) : child && parentResults.length > 0 ? (
            <div className="rounded-xl border border-sand bg-cream p-4">
              <div className="mb-3 flex items-center gap-2">
                <PalAvatar pal={selectedC} size="lg" />
                <div>
                  <p className="font-display text-xl font-bold">{selectedC?.name}</p>
                  <p className="text-sm text-stone">Found {parentResults.length} compatible parent pair{parentResults.length === 1 ? '' : 's'}:</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {parentResults.map((combo) => (
                  <div key={`${combo.parentA}-${combo.parentB}`} className="rounded-lg bg-paper p-3">
                    <div className="flex items-center gap-2">
                      <PalAvatar pal={palById(pals, combo.parentA)} size="sm" />
                      <span className="font-medium">{palById(pals, combo.parentA)?.name}</span>
                      <span className="text-stone">+</span>
                      <PalAvatar pal={palById(pals, combo.parentB)} size="sm" />
                      <span className="font-medium">{palById(pals, combo.parentB)?.name}</span>
                    </div>
                    <p className="mt-2 font-mono text-sm font-semibold">{(combo.probability * 100).toFixed(0)}%</p>
                  </div>
                ))}
              </div>
            </div>
          ) : child ? (
            <div className="rounded-xl border border-sand bg-cream p-6 text-center">
              <p className="font-medium text-stone">No compatible parent pairs found in the current dataset.</p>
            </div>
          ) : null}
        </div>
      )}

      {(parentA || parentB || child) && (
        <button
          onClick={share}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-forest px-5 py-3 font-semibold text-white hover:bg-ink"
        >
          <Share2 size={18} /> Share this result
        </button>
      )}
    </div>
  );
}

function Picker({
  label,
  value,
  onSelect,
  pals,
}: {
  label: string;
  value: string;
  onSelect: (id: string) => void;
  pals: Pal[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const selected = pals.find((p) => p.id === value);
  const filtered = pals.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="relative">
      <label className="mb-2 block text-sm font-semibold text-ink">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border border-sand bg-cream px-3 py-2.5 text-left hover:border-forest focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/30"
      >
        <span className="flex items-center gap-2">
          {selected ? (
            <>
              <PalAvatar pal={selected} size="sm" />
              <span className="font-medium">{selected.name}</span>
            </>
          ) : (
            <span className="text-stone">Select a Pal…</span>
          )}
        </span>
        <span className="text-stone">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-lg border border-sand bg-paper shadow-lg">
          <div className="border-b border-sand p-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Pals…"
              className="w-full rounded-md border border-sand px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/30"
              autoFocus
            />
          </div>
          <ul className="max-h-60 overflow-auto py-1">
            {filtered.map((pal) => (
              <li key={pal.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(pal.id);
                    setOpen(false);
                    setQuery('');
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-mist"
                >
                  <PalAvatar pal={pal} size="sm" />
                  <span className="text-sm font-medium">{pal.name}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-stone">No matches.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

function ResultCard({ combo, pals }: { combo: Combo; pals: Pal[] }) {
  const a = palById(pals, combo.parentA);
  const b = palById(pals, combo.parentB);
  const c = palById(pals, combo.child);

  return (
    <div className="rounded-xl border border-sand bg-cream p-4">
      <div className="mb-3 flex items-center gap-3">
        <PalAvatar pal={a} size="md" />
        <span className="text-stone">+</span>
        <PalAvatar pal={b} size="md" />
        <ArrowRightLeft className="text-stone" size={20} />
        <PalAvatar pal={c} size="lg" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-paper p-3">
          <p className="text-xs text-stone">Child</p>
          <p className="font-display text-lg font-bold">{c?.name}</p>
        </div>
        <div className="rounded-lg bg-paper p-3">
          <p className="text-xs text-stone">Probability</p>
          <p className="font-mono text-lg font-bold">{(combo.probability * 100).toFixed(0)}%</p>
        </div>
        <div className="rounded-lg bg-paper p-3">
          <p className="text-xs text-stone">Incubation</p>
          <p className="font-mono text-lg font-bold">{combo.incubationMinutes} min</p>
        </div>
      </div>
      <div className="mt-3 text-sm text-stone">
        Conditions: {combo.temperature} · {combo.food}
      </div>
    </div>
  );
}
