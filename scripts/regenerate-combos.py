import json, requests, os, sys
from collections import defaultdict

# This script regenerates public/data/combos.json from PalCalc's authoritative
# explicit breeding table (https://github.com/tylercamp/palcalc).
# Run it from the repo root, then run `node scripts/slice-combos.js`.

PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(PROJ, 'public/data')

PC_DB = 'https://raw.githubusercontent.com/tylercamp/palcalc/main/PalCalc.Model/db.json'
PC_BREED = 'https://raw.githubusercontent.com/tylercamp/palcalc/main/PalCalc.Model/breeding.json'


def main():
    pals = json.load(open(os.path.join(DATA_DIR, 'pals.json')))
    name_to_id = {p['name'].strip(): p['id'] for p in pals}

    pc_db = requests.get(PC_DB, headers={'User-Agent': 'Mozilla/5.0'}, timeout=60).json()
    pc_breed = requests.get(PC_BREED, headers={'User-Agent': 'Mozilla/5.0'}, timeout=120).json()

    internal_to_ourid = {
        p['InternalName']: name_to_id[p['Name'].strip()]
        for p in pc_db['Pals']
        if p['Name'].strip() in name_to_id
    }

    with open(os.path.join(DATA_DIR, 'combos.json')) as f:
        current = json.load(f)

    key_to_combo = {}
    for c in current:
        a, b = sorted([c['parentA'], c['parentB']])
        key_to_combo[(a, b)] = c

    new_combos = []
    for c in pc_breed['Breeding']:
        a = internal_to_ourid.get(c['Parent1InternalName'])
        b = internal_to_ourid.get(c['Parent2InternalName'])
        child = internal_to_ourid.get(c['ChildInternalName'])
        if not a or not b or not child:
            print(f"Skipping unmapped combo: {c}", file=sys.stderr)
            continue
        key = tuple(sorted([a, b]))
        existing = key_to_combo.get(key)
        if existing:
            new_combos.append({**existing, 'parentA': a, 'parentB': b, 'child': child})
        else:
            new_combos.append({
                'parentA': a, 'parentB': b, 'child': child,
                'probability': 1, 'incubationMinutes': 5,
                'temperature': 'Temperate', 'food': 'Standard',
            })

    with open(os.path.join(DATA_DIR, 'combos.json'), 'w') as f:
        json.dump(new_combos, f)
    print(f'Wrote {len(new_combos)} combos to public/data/combos.json')
    print('Now run: node scripts/slice-combos.js')


if __name__ == '__main__':
    main()
