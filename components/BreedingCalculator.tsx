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
      <div className="hud-panel p-8 text-center">
        <p className="text-muted">Loading breeding data…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hud-panel border-terra/40 p-8 text-center">
        <p className="font-medium text-terra">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 hud-btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="hud-panel p-6 shadow-cyan-glow md:p-8">
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => { setMode('parents'); reset(); }}
          className={`px-4 py-2 text-sm font-semibold transition-all ${
            mode === 'parents'
              ? 'hud-btn-primary'
              : 'hud-btn-ghost'
          }`}
        >
          Parents → Child
        </button>
        <button
          onClick={() => { setMode('child'); reset(); }}
          className={`px-4 py-2 text-sm font-semibold transition-all ${
            mode === 'child'
              ? 'hud-btn-primary'
              : 'hud-btn-ghost'
          }`}
        >
          Child → Parents
        </button>
        <button
          onClick={reset}
          className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-muted transition-colors hover:text-cyan"
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
            <div className="hud-panel bg-cyan-fade p-6 text-center">
              <p className="text-muted">Looking up combo…</p>
            </div>
          ) : result ? (
            <ResultCard combo={result} pals={pals} />
          ) : parentA && parentB ? (
            <div className="hud-panel border-cyan/10 bg-cyan-fade p-6 text-center">
              <p className="font-medium text-muted">No known combo for this pair.</p>
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
            <div className="hud-panel bg-cyan-fade p-6 text-center">
              <p className="text-muted">Looking up parents…</p>
            </div>
          ) : child && parentResults.length > 0 ? (
            <div className="hud-panel p-4">
              <div className="mb-3 flex items-center gap-3">
                <PalAvatar pal={selectedC} size="lg" />
                <div>
                  <p className="font-display text-xl font-bold text-ink">{selectedC?.name}</p>
                  <p className="text-sm text-muted">Found {parentResults.length} compatible parent pair{parentResults.length === 1 ? '' : 's'}:</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {parentResults.map((combo) => (
                  <div key={`${combo.parentA}-${combo.parentB}`} className="hud-panel border-cyan/10 bg-cyan-fade p-3">
                    <div className="flex items-center gap-2">
                      <PalAvatar pal={palById(pals, combo.parentA)} size="sm" />
                      <span className="font-medium text-ink">{palById(pals, combo.parentA)?.name}</span>
                      <span className="text-muted">+</span>
                      <PalAvatar pal={palById(pals, combo.parentB)} size="sm" />
                      <span className="font-medium text-ink">{palById(pals, combo.parentB)?.name}</span>
                    </div>
                    <p className="mt-2 font-mono text-sm font-semibold text-cyan">{(combo.probability * 100).toFixed(0)}%</p>
                  </div>
                ))}
              </div>
            </div>
          ) : child ? (
            <div className="hud-panel border-cyan/10 bg-cyan-fade p-6 text-center">
              <p className="font-medium text-muted">No compatible parent pairs found in the current dataset.</p>
            </div>
          ) : null}
        </div>
      )}

      {(parentA || parentB || child) && (
        <button
          onClick={share}
          className="mt-6 inline-flex items-center gap-2 hud-btn-primary"
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
      <label className="mb-2 block text-sm font-semibold text-cyan-dim uppercase tracking-wider">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="hud-input flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-2">
          {selected ? (
            <>
              <PalAvatar pal={selected} size="sm" />
              <span className="font-medium text-ink">{selected.name}</span>
            </>
          ) : (
            <span className="text-muted-dark">Select a Pal…</span>
          )}
        </span>
        <span className="text-muted">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full hud-panel border-cyan/30">
          <div className="border-b border-cyan/10 p-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Pals…"
              className="hud-input"
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
                  className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-cyan/10"
                >
                  <PalAvatar pal={pal} size="sm" />
                  <span className="text-sm font-medium text-ink">{pal.name}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted">No matches.</li>
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
    <div className="hud-panel border-cyan/30 p-4">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <PalAvatar pal={a} size="md" />
        <span className="text-muted">+</span>
        <PalAvatar pal={b} size="md" />
        <ArrowRightLeft className="text-cyan" size={20} />
        <PalAvatar pal={c} size="lg" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="hud-panel border-cyan/10 bg-cyan-fade p-3">
          <p className="text-xs text-muted uppercase tracking-wider">Child</p>
          <p className="font-display text-lg font-bold text-ink">{c?.name}</p>
        </div>
        <div className="hud-panel border-cyan/10 bg-cyan-fade p-3">
          <p className="text-xs text-muted uppercase tracking-wider">Probability</p>
          <p className="font-mono text-lg font-bold text-cyan">{(combo.probability * 100).toFixed(0)}%</p>
        </div>
        <div className="hud-panel border-cyan/10 bg-cyan-fade p-3">
          <p className="text-xs text-muted uppercase tracking-wider">Incubation</p>
          <p className="font-mono text-lg font-bold text-cyan">{combo.incubationMinutes} min</p>
        </div>
      </div>
      <div className="mt-3 text-sm text-muted">
        <span className="text-cyan-dim">Conditions:</span> {combo.temperature} · {combo.food}
      </div>
    </div>
  );
}
