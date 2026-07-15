const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../public/data');
const combos = JSON.parse(fs.readFileSync(path.join(dataDir, 'combos.json'), 'utf-8'));

const CHUNK_SIZE = 1000; // combos per chunk
const PAGE_SIZE = 50;    // combos per page

// 1. Chunked full combo list for /combos table
const combosOutDir = path.join(dataDir, 'chunks', 'combos');
if (!fs.existsSync(combosOutDir)) fs.mkdirSync(combosOutDir, { recursive: true });
const total = combos.length;
const chunkCount = Math.ceil(total / CHUNK_SIZE);
const chunks = [];
for (let i = 0; i < chunkCount; i++) {
  const start = i * CHUNK_SIZE;
  const end = Math.min(start + CHUNK_SIZE, total);
  const slice = combos.slice(start, end);
  const startPage = Math.floor(start / PAGE_SIZE) + 1;
  const endPage = Math.ceil(end / PAGE_SIZE);
  const fileName = `chunk-${String(i + 1).padStart(3, '0')}.json`;
  fs.writeFileSync(path.join(combosOutDir, fileName), JSON.stringify(slice));
  chunks.push({ file: fileName, startPage, endPage, startIndex: start, endIndex: end, count: slice.length });
}
const index = { total, pageSize: PAGE_SIZE, chunkSize: CHUNK_SIZE, chunkCount, chunks };
fs.writeFileSync(path.join(combosOutDir, 'index.json'), JSON.stringify(index));

// 2. Minified lookup by child first letter (for Child → Parents)
// child_id -> [parentA, parentB, child, probability, incubationMinutes, temperature, food][]
const childrenDir = path.join(dataDir, 'chunks', 'children');
if (!fs.existsSync(childrenDir)) fs.mkdirSync(childrenDir, { recursive: true });
const childrenFiles = {};
for (const combo of combos) {
  const first = combo.child[0].toLowerCase();
  if (!childrenFiles[first]) childrenFiles[first] = {};
  if (!childrenFiles[first][combo.child]) childrenFiles[first][combo.child] = [];
  childrenFiles[first][combo.child].push([
    combo.parentA, combo.parentB, combo.child, combo.probability, combo.incubationMinutes, combo.temperature, combo.food,
  ]);
}
for (const [first, data] of Object.entries(childrenFiles)) {
  fs.writeFileSync(path.join(childrenDir, `${first}.json`), JSON.stringify(data));
}

// 3. Minified lookup by pair first letter (for Parents → Child)
// sorted "parentA|parentB" -> [child, probability, incubationMinutes, temperature, food]
const pairsDir = path.join(dataDir, 'chunks', 'pairs');
if (!fs.existsSync(pairsDir)) fs.mkdirSync(pairsDir, { recursive: true });
const pairFiles = {};
for (const combo of combos) {
  const [a, b] = [combo.parentA, combo.parentB].sort();
  const first = a[0].toLowerCase();
  if (!pairFiles[first]) pairFiles[first] = {};
  pairFiles[first][`${a}|${b}`] = [combo.child, combo.probability, combo.incubationMinutes, combo.temperature, combo.food];
}
for (const [first, data] of Object.entries(pairFiles)) {
  fs.writeFileSync(path.join(pairsDir, `${first}.json`), JSON.stringify(data));
}

console.log(`Sliced ${total} combos into ${chunkCount} chunks`);
console.log(`Child lookup files: ${Object.keys(childrenFiles).length} (total ${(fs.readdirSync(childrenDir).reduce((s, f) => s + fs.statSync(path.join(childrenDir, f)).size, 0) / 1024 / 1024).toFixed(2)} MB)`);
console.log(`Pair lookup files: ${Object.keys(pairFiles).length} (total ${(fs.readdirSync(pairsDir).reduce((s, f) => s + fs.statSync(path.join(pairsDir, f)).size, 0) / 1024 / 1024).toFixed(2)} MB)`);
