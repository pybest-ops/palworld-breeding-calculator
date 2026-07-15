export type ElementKey = 'Neutral' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Ice' | 'Dark' | 'Dragon';

export interface Pal {
  id: string;
  name: string;
  elements: ElementKey[];
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
}

export interface Combo {
  parentA: string;
  parentB: string;
  child: string;
  probability: number;
  incubationMinutes: number;
  temperature: string;
  food: string;
}

export const ELEMENT_COLORS: Record<ElementKey, string> = {
  Neutral: 'bg-neutral text-ink',
  Fire: 'bg-fire text-white',
  Water: 'bg-water text-white',
  Grass: 'bg-grass text-white',
  Electric: 'bg-electric text-ink',
  Ice: 'bg-ice text-ink',
  Dark: 'bg-dark text-white',
  Dragon: 'bg-dragon text-white',
};

export const ELEMENT_ICONS: Record<ElementKey, string> = {
  Neutral: '○',
  Fire: '🔥',
  Water: '💧',
  Grass: '🌿',
  Electric: '⚡',
  Ice: '❄️',
  Dark: '🌑',
  Dragon: '🐉',
};

let _pals: Pal[] | null = null;

export async function loadPals(): Promise<Pal[]> {
  if (_pals) return _pals;
  const res = await fetch('/data/pals.json');
  if (!res.ok) throw new Error('Failed to load Pals data');
  _pals = await res.json();
  return _pals!;
}

export async function loadData(): Promise<{ pals: Pal[] }> {
  const pals = await loadPals();
  return { pals };
}

// ---------- Chunked /combos table ----------

export async function loadCombosIndex(): Promise<ComboIndex> {
  const res = await fetch('/data/chunks/combos/index.json');
  if (!res.ok) throw new Error('Failed to load combo index');
  return res.json();
}

export interface ComboIndex {
  total: number;
  pageSize: number;
  chunkSize: number;
  chunkCount: number;
  chunks: Array<{
    file: string;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    count: number;
  }>;
}

const chunkCache: Map<string, Promise<Combo[]>> = new Map();

export async function loadComboChunk(file: string): Promise<Combo[]> {
  const existing = chunkCache.get(file);
  if (existing) return existing;
  const promise = fetch(`/data/chunks/combos/${file}`).then((res) => {
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    return res.json();
  });
  chunkCache.set(file, promise);
  return promise;
}

export async function loadCombosForPage(page: number, index: ComboIndex): Promise<Combo[]> {
  const chunk = index.chunks.find((c) => page >= c.startPage && page <= c.endPage);
  if (!chunk) throw new Error(`No chunk for page ${page}`);
  const data = await loadComboChunk(chunk.file);
  const start = (page - chunk.startPage) * index.pageSize;
  return data.slice(start, start + index.pageSize);
}

// ---------- Parents → Child lookup ----------

type PairEntry = [string, number, number, string, string]; // child, prob, incubation, temp, food
const pairCache: Map<string, Promise<Record<string, PairEntry>>> = new Map();

export async function loadPairLookup(parentA: string): Promise<Record<string, PairEntry>> {
  const first = parentA[0].toLowerCase();
  const existing = pairCache.get(first);
  if (existing) return existing;
  const promise = fetch(`/data/chunks/pairs/${first}.json`).then((res) => {
    if (!res.ok) throw new Error(`Failed to load pair lookup ${first}`);
    return res.json();
  });
  pairCache.set(first, promise);
  return promise;
}

export async function findChildRemote(parentA: string, parentB: string): Promise<Combo | undefined> {
  const [a, b] = [parentA, parentB].sort();
  const lookup = await loadPairLookup(a);
  const entry = lookup[`${a}|${b}`];
  if (!entry) return undefined;
  return {
    parentA,
    parentB,
    child: entry[0],
    probability: entry[1],
    incubationMinutes: entry[2],
    temperature: entry[3],
    food: entry[4],
  };
}

// ---------- Child → Parents lookup ----------

type ParentEntry = [string, string, string, number, number, string, string]; // parentA, parentB, child, prob, incubation, temp, food
const childCache: Map<string, Promise<Record<string, ParentEntry[]>>> = new Map();

export async function loadChildLookup(childId: string): Promise<Record<string, ParentEntry[]>> {
  const first = childId[0].toLowerCase();
  const existing = childCache.get(first);
  if (existing) return existing;
  const promise = fetch(`/data/chunks/children/${first}.json`).then((res) => {
    if (!res.ok) throw new Error(`Failed to load child lookup ${first}`);
    return res.json();
  });
  childCache.set(first, promise);
  return promise;
}

export async function findParentsRemote(childId: string): Promise<Combo[]> {
  const lookup = await loadChildLookup(childId);
  const entries = lookup[childId];
  if (!entries) return [];
  return entries.map((e) => ({
    parentA: e[0],
    parentB: e[1],
    child: e[2],
    probability: e[3],
    incubationMinutes: e[4],
    temperature: e[5],
    food: e[6],
  }));
}

// ---------- Legacy helpers (for /combos table and any client-side work) ----------

export function palById(pals: Pal[], id: string): Pal | undefined {
  return pals.find((p) => p.id === id);
}

export function findChild(combos: Combo[], parentA: string, parentB: string): Combo | undefined {
  return combos.find(
    (c) =>
      (c.parentA === parentA && c.parentB === parentB) ||
      (c.parentA === parentB && c.parentB === parentA)
  );
}

export function findParents(combos: Combo[], childId: string): Combo[] {
  return combos.filter((c) => c.child === childId);
}

export function encodeCalc(parentA?: string, parentB?: string, child?: string): string {
  const obj: { a?: string; b?: string; c?: string } = {};
  if (parentA) obj.a = parentA;
  if (parentB) obj.b = parentB;
  if (child) obj.c = child;
  if (!obj.a && !obj.b && !obj.c) return '';
  try {
    return btoa(encodeURIComponent(JSON.stringify(obj)));
  } catch {
    return '';
  }
}

export function decodeCalc(value: string): { a?: string; b?: string; c?: string } {
  try {
    return JSON.parse(decodeURIComponent(atob(value)));
  } catch {
    return {};
  }
}

// Keep a small compatibility loader for the full combo JSON (only if needed elsewhere)
let _combos: Combo[] | null = null;
export async function loadCombos(): Promise<Combo[]> {
  if (_combos) return _combos;
  const res = await fetch('/data/combos.json');
  if (!res.ok) throw new Error('Failed to load Combos data');
  _combos = await res.json();
  return _combos!;
}

export const SITE_NAME = 'palworldbreedingcalculator.wiki';
export const CONTACT_EMAIL = 'contact@palworldbreedingcalculator.wiki';
