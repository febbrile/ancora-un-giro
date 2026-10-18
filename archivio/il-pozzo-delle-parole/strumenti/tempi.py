"""Controlla il ritmo della sceneggiatura.

Per ogni scena (`### N.M · Titolo · m:ss`) conta i caratteri detti dalle voci (le righe `> `)
e quelli del monitor (il blocco ``` dopo **MONITOR.**), e verifica che

    durata ≥ parlato / 12 + monitor / 15 + 3 secondi di sole immagini

Controlla anche che ogni episodio (`## Episodio N · Titolo`) stia sotto i 5 minuti.
Uso: python3 strumenti/tempi.py [sceneggiatura/SCENEGGIATURA.md]
"""
import re
import sys
from pathlib import Path

PARLATO_CPS, MONITOR_CPS, PAUSA, MAX_EPISODIO = 12, 15, 3, 300


def secondi(s):
    m, ss = s.split(':')
    return int(m) * 60 + int(ss)


def leggi(path):
    episodi, ep, scena, in_monitor, dopo_monitor = [], None, None, False, False
    for riga in Path(path).read_text(encoding='utf-8').splitlines():
        if riga.startswith('## Episodio'):
            ep = {'titolo': riga[3:].strip(), 'scene': []}
            episodi.append(ep)
            scena = None
            continue
        if riga.startswith('## '):
            ep = scena = None
            continue
        m = re.match(r'### (\S+) · (.+) · (\d+:\d\d)$', riga)
        if m and ep is not None:
            scena = {'id': m[1], 'titolo': m[2], 'durata': secondi(m[3]), 'parlato': 0, 'monitor': 0}
            ep['scene'].append(scena)
            continue
        if scena is None:
            continue
        if riga.startswith('**MONITOR'):
            dopo_monitor = True
            continue
        if riga.startswith('```'):
            in_monitor = dopo_monitor and not in_monitor
            if not in_monitor:
                dopo_monitor = False
            continue
        if in_monitor:
            scena['monitor'] += len(riga.strip())
        elif riga.startswith('> '):
            scena['parlato'] += len(riga[2:].strip())
    return episodi


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else 'sceneggiatura/SCENEGGIATURA.md'
    errori = 0
    for ep in leggi(path):
        totale = sum(s['durata'] for s in ep['scene'])
        print(f"\n{ep['titolo']}  {totale // 60}:{totale % 60:02d}")
        for s in ep['scene']:
            serve = s['parlato'] / PARLATO_CPS + s['monitor'] / MONITOR_CPS + PAUSA
            parla = s['durata'] - PAUSA - s['monitor'] / MONITOR_CPS
            cps = s['parlato'] / parla if s['parlato'] else 0
            ok = serve <= s['durata']
            errori += not ok
            print(f"  {'ok ' if ok else 'NO '} {s['id']:5} {s['titolo'][:32]:32} {s['durata']:3}s"
                  f"  servono {serve:5.1f}s  parlato {s['parlato']:3}  monitor {s['monitor']:3}  {cps:4.1f} car/s")
        if totale > MAX_EPISODIO:
            errori += 1
            print(f'  NO  episodio oltre i {MAX_EPISODIO // 60} minuti')
    print('\nRitmo rispettato.' if not errori else f'\n{errori} problemi di ritmo.')
    sys.exit(1 if errori else 0)


if __name__ == '__main__':
    main()
