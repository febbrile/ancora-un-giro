"""Copia i moduli comuni (episodi/comune/shared.js e base.css) in ogni episodio: `python3 strumenti/allinea.py`.

Con `--controlla` non copia niente: si ferma se un episodio ha una copia diversa dalla fonte.
"""
import sys
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
COMUNE = RADICE / 'episodi' / 'comune'
diversi = []
for ep in sorted(p for p in (RADICE / 'episodi').iterdir() if p.is_dir() and p.name[:2].isdigit()):
    for nome in ('shared.js', 'base.css'):
        fonte, copia = COMUNE / nome, ep / 'modules' / nome
        if copia.exists() and copia.read_text() == fonte.read_text():
            continue
        if '--controlla' in sys.argv:
            diversi.append(str(copia))
        else:
            copia.parent.mkdir(parents=True, exist_ok=True)
            copia.write_text(fonte.read_text())
            print('copiato', copia.relative_to(RADICE))
if diversi:
    sys.exit('Diversi dalla fonte:\n  ' + '\n  '.join(diversi))
