'use client';

import { useEffect, useMemo, useState } from 'react';
import { loadPals, loadCombosIndex, loadCombosForPage, palById, type Combo, type Pal, type ComboIndex } from '@/lib/data';
import PalAvatar from './PalAvatar';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ELEMENTS = ['All', 'Neutral', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Dark', 'Dragon'];
const PAGE_SIZE = 50;

export default function ComboTable() {
  const [pals, setPals] = useState<Pal[]>([]);
  const [index, setIndex] = useState<ComboIndex | null>(null);
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [elementFilter, setElementFilter] = useState('All');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([loadPals(), loadCombosIndex()])
      .then(([palsData, idx]) => {
        if (cancelled) return;
        setPals(palsData);
        setIndex(idx);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Failed to load data');
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  // Load the chunk for the current page
  useEffect(() => {
    if (!index || page < 1 || page > Math.ceil(index.total / PAGE_SIZE)) return;
    let cancelled = false;
    loadCombosForPage(page, index)
      .then((slice) => {
        if (cancelled) return;
        setCombos(slice);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Failed to load page');
      });
    return () => { cancelled = true; };
  }, [index, page]);

  const filtered = useMemo(() => {
    if (!pals.length) return [];
    const q = query.trim().toLowerCase();
    return combos.filter((combo) => {
      const a = palById(pals, combo.parentA);
      const b = palById(pals, combo.parentB);
      const c = palById(pals, combo.child);
      if (!a || !b || !c) return false;
      const matchElement =
        elementFilter === 'All' || c.elements.includes(elementFilter as any);
      const matchQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        b.name.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q);
      return matchElement && matchQuery;
    });
  }, [query, elementFilter, combos, pals]);

  const totalPages = Math.max(1, Math.ceil((index?.total ?? 0) / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const resetFilters = () => {
    setQuery('');
    setElementFilter('All');
    setPage(1);
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-sand bg-paper p-12 text-center">
        <p className="text-stone">Loading combo database…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-terra bg-cream p-8 text-center">
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
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-sand bg-paper p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-stone" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by parent or child Pal…"
            className="w-full rounded-lg border border-sand py-2 pl-10 pr-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/30"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-stone" size={18} />
          <select
            value={elementFilter}
            onChange={(e) => {
              setElementFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-sand bg-paper py-2 pl-3 pr-8 text-sm focus:border-forest focus:outline-none"
          >
            {ELEMENTS.map((e) => (
              <option key={e} value={e}>
                {e === 'All' ? 'Element: All' : e}
              </option>
            ))}
          </select>

          {(query || elementFilter !== 'All') && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-sm text-stone hover:text-terra"
            >
              <X size={16} /> Clear
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-sand bg-paper p-8 text-center text-stone">
          <p className="font-medium">No combos found.</p>
          <p className="text-sm">Try a different search term or clear the filters.</p>
          <button
            onClick={resetFilters}
            className="mt-4 inline-flex items-center gap-1 rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
          >
            <X size={16} /> Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="hidden rounded-xl border border-sand bg-paper shadow md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-mist">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-stone">Parent 1</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-stone">Parent 2</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-stone">Child</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-stone">Probability</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-stone">Incubation</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-stone">Conditions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {filtered.map((combo) => (
                  <tr key={`${combo.parentA}-${combo.parentB}`} className="hover:bg-mist/50">
                    <Cell pals={pals} palId={combo.parentA} />
                    <Cell pals={pals} palId={combo.parentB} />
                    <Cell pals={pals} palId={combo.child} />
                    <td className="px-4 py-3 font-mono font-semibold">
                      {(combo.probability * 100).toFixed(0)}%
                    </td>
                    <td className="px-4 py-3">{combo.incubationMinutes} min</td>
                    <td className="px-4 py-3 text-stone">
                      {combo.temperature} · {combo.food}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {filtered.map((combo) => {
              const a = palById(pals, combo.parentA)!;
              const b = palById(pals, combo.parentB)!;
              const c = palById(pals, combo.child)!;
              return (
                <div
                  key={`${combo.parentA}-${combo.parentB}`}
                  className="rounded-xl border border-sand bg-paper p-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <PalAvatar pal={a} size="sm" />
                    <span className="text-stone">+</span>
                    <PalAvatar pal={b} size="sm" />
                    <span className="text-stone">→</span>
                    <PalAvatar pal={c} size="sm" />
                    <span className="ml-auto font-display font-bold">{c.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded bg-cream p-2">
                      <p className="text-xs text-stone">Probability</p>
                      <p className="font-mono font-semibold">{(combo.probability * 100).toFixed(0)}%</p>
                    </div>
                    <div className="rounded bg-cream p-2">
                      <p className="text-xs text-stone">Incubation</p>
                      <p className="font-mono font-semibold">{combo.incubationMinutes} min</p>
                    </div>
                    <div className="rounded bg-cream p-2">
                      <p className="text-xs text-stone">Temp</p>
                      <p className="font-semibold">{combo.temperature}</p>
                    </div>
                    <div className="rounded bg-cream p-2">
                      <p className="text-xs text-stone">Food</p>
                      <p className="font-semibold">{combo.food}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-sand bg-paper p-4 sm:flex-row">
            <p className="text-sm text-stone">
              Showing <span className="font-semibold text-ink">{filtered.length}</span> of{' '}
              <span className="font-semibold text-ink">{index?.total ?? 0}</span> combos · Page{' '}
              <span className="font-semibold text-ink">{safePage}</span> of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="inline-flex items-center gap-1 rounded-lg border border-sand bg-cream px-3 py-2 text-sm font-semibold text-ink hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className="inline-flex items-center gap-1 rounded-lg border border-sand bg-cream px-3 py-2 text-sm font-semibold text-ink hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Cell({ pals, palId }: { pals: Pal[]; palId: string }) {
  const pal = palById(pals, palId);
  if (!pal) return <td />;
  return (
    <td className="px-4 py-3">
      <div className="flex items-center gap-2">
        <PalAvatar pal={pal} size="sm" />
        <span className="font-medium">{pal.name}</span>
      </div>
    </td>
  );
}
