const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../lib/data.ts');
const data = fs.readFileSync(dataPath, 'utf-8');

function extractArray(name) {
  // Match 'export const NAME: Type[] = [ ... ];'
  const regex = new RegExp(`export\\s+const\\s+${name}\\s*:[^=]+=\\s*(\\[[\\s\\S]*?\\]);\\s*`, 'i');
  const match = data.match(regex);
  if (!match) throw new Error(`Could not find ${name} array`);
  let body = match[1]
    .replace(/as\s+(?:any|string|number|ElementKey)\b/g, '')
    .replace(/satisfies\s+[^;]+/g, '');
  const code = `(function(){ return (${body}); })()`;
  return Function('"use strict"; ' + code)();
}

const pals = extractArray('PALS');
const combos = extractArray('COMBOS');

console.log(`Extracted ${pals.length} Pals and ${combos.length} Combos`);

const outDir = path.join(__dirname, '../public/data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, 'pals.json'), JSON.stringify(pals, null, 2));
fs.writeFileSync(path.join(outDir, 'combos.json'), JSON.stringify(combos));

console.log('Wrote public/data/pals.json and public/data/combos.json');

const comboSize = fs.statSync(path.join(outDir, 'combos.json')).size;
const palSize = fs.statSync(path.join(outDir, 'pals.json')).size;
console.log(`pals.json: ${(palSize / 1024).toFixed(1)} KB`);
console.log(`combos.json: ${(comboSize / 1024 / 1024).toFixed(2)} MB`);
