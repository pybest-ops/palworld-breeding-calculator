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
      <div className="hud-panel p-12 text-center">
        <p className="text-muted">Loading combo database…</p>
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
    <div className="space-y-4">
      <div className="hud-panel flex flex-col gap-3 p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-cyan-dim" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by parent or child Pal…"
            className="hud-input pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-cyan-dim" size={18} />
          <select
            value={elementFilter}
            onChange={(e) => {
              setElementFilter(e.target.value);
              setPage(1);
            }}
            className="hud-input pr-8"
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
              className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-terra"
            >
              <X size={16} /> Clear
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="hud-panel border-cyan/10 p-8 text-center text-muted">
          <p className="font-medium">No combos found.</p>
          <p className="text-sm">Try a different search term or clear the filters.</p>
          <button
            onClick={resetFilters}
            className="mt-4 hud-btn-primary"
          >
            <X size={16} /> Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="hidden rounded md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-void-panel text-cyan-dim">
                <tr className="border-b border-cyan/30">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Parent 1</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Parent 2</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Child</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Probability</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Incubation</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Conditions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan/10">
                {filtered.map((combo) => (
                  <tr key={`${combo.parentA}-${combo.parentB}`} className="transition-colors hover:bg-cyan/5">
                    <Cell pals={pals} palId={combo.parentA} />
                    <Cell pals={pals} palId={combo.parentB} />
                    <Cell pals={pals} palId={combo.child} />
                    <td className="px-4 py-3 font-mono font-semibold text-cyan">
                      {(combo.probability * 100).toFixed(0)}%
                    </td>
                    <td className="px-4 py-3 text-muted">{combo.incubationMinutes} min</td>
                    <td className="px-4 py-3 text-muted">
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
                  className="hud-panel border-cyan/10 p-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <PalAvatar pal={a} size="sm" />
                    <span className="text-muted">+</span>
                    <PalAvatar pal={b} size="sm" />
                    <span className="text-muted">→</span>
                    <PalAvatar pal={c} size="sm" />
                    <span className="ml-auto font-display font-bold text-ink">{c.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="hud-panel border-cyan/10 bg-cyan-fade p-2">
                      <p className="text-xs text-muted">Probability</p>
                      <p className="font-mono font-semibold text-cyan">{(combo.probability * 100).toFixed(0)}%</p>
                    </div>
                    <div className="hud-panel border-cyan/10 bg-cyan-fade p-2">
                      <p className="text-xs text-muted">Incubation</p>
                      <p className="font-mono font-semibold text-cyan">{combo.incubationMinutes} min</p>
                    </div>
                    <div className="hud-panel border-cyan/10 bg-cyan-fade p-2">
                      <p className="text-xs text-muted">Temp</p>
                      <p className="font-semibold text-ink">{combo.temperature}</p>
                    </div>
                    <div className="hud-panel border-cyan/10 bg-cyan-fade p-2">
                      <p className="text-xs text-muted">Food</p>
                      <p className="font-semibold text-ink">{combo.food}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hud-panel flex flex-col items-center justify-between gap-3 p-4 sm:flex-row">
            <p className="text-sm text-muted">
              Showing <span className="font-semibold text-ink">{filtered.length}</span> of{' '}
              <span className="font-semibold text-ink">{index?.total ?? 0}</span> combos · Page{' '}
              <span className="font-semibold text-ink">{safePage}</span> of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="hud-btn-secondary px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className="hud-btn-secondary px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
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
        <span className="font-medium text-ink">{pal.name}</span>
      </div>
    </td>
  );
}
