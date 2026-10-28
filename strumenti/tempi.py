"""Controlla il ritmo delle sceneggiature: `python3 strumenti/tempi.py [file…]`.

Per ogni scena (`### id · Nome · m:ss`) somma i caratteri detti dalle voci (le righe `> ` sotto NARRATORE, ADA o CUSTODE)
e verifica che `durata ≥ parlato/12 + 3 s`. Poi verifica che l'episodio non superi i 5 minuti, senza contare la
scena `coda`, che da sola non supera 1 minuto.
Senza argomenti controlla tutte le sceneggiature in `sceneggiatura/`.
"""
import re
import sys
from pathlib import Path

CPS, PAUSA, MASSIMO, MASSIMO_CODA = 12, 3, 300, 60


def controlla(f):
    righe = Path(f).read_text().splitlines()
    scene, cur, voce = [], None, False
    for r in righe:
        m = re.match(r'^### (\S+) · (.+?) · (\d+):(\d\d(?:\.\d)?)\s*$', r)
        if m:
            cur = {'id': m[1], 'nome': m[2], 'dur': int(m[3]) * 60 + float(m[4]), 'detto': ''}
            scene.append(cur)
            voce = False
            continue
        if r.startswith('## '):
            cur = None
        if cur is None:
            continue
        if re.match(r'^\*\*(NARRATORE|ADA|CUSTODE)\.\*\*', r):
            voce = True
        elif r.startswith('**'):
            voce = False
        elif voce and r.startswith('> '):
            cur['detto'] += r[2:].strip() + ' '
    ok, tot, coda = True, 0, 0
    print(f'\n{f}')
    for s in scene:
        n = len(s['detto'].strip())
        serve = n / CPS + PAUSA
        if s['id'] == 'coda': coda += s['dur']
        else: tot += s['dur']
        segno = '✓' if s['dur'] >= serve else '✗'
        ok &= s['dur'] >= serve
        print(f"  {segno} {s['id']:14} {s['dur']:5.1f} s  parlato {n:4d} car  servono {serve:5.1f} s")
    segno = '✓' if tot <= MASSIMO and coda <= MASSIMO_CODA else '✗'
    ok &= tot <= MASSIMO and coda <= MASSIMO_CODA
    print(f'  {segno} storia {int(tot // 60)}:{tot % 60:04.1f}' + (f' · coda {coda:.1f} s' if coda else ''))
    return ok


if __name__ == '__main__':
    files = sys.argv[1:] or sorted(str(p) for p in (Path(__file__).resolve().parent.parent / 'sceneggiatura').glob('[0-9]*.md'))
    risultati = [controlla(f) for f in files]
    sys.exit(0 if all(risultati) else 1)
