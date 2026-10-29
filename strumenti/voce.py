"""La voce narrante: genera una clip per battuta e la mette in audio/tracce.json sul canale «voce».

    strumenti/voce/amb/<modello>/bin/python strumenti/voce.py <episodio> [--modello <nome>] [--rifai]

Le battute e le loro finestre vengono dalle scene (`node strumenti/battute.mjs`). Il modello è uno di `strumenti/voce/modelli/` (quello scelto
dal banco di prova, vedi strumenti/voce/BANCO.md) e va lanciato con il suo ambiente. Le clip finiscono in
`episodi/NN-titolo/audio/voce/<scena>-<n>.wav`; una clip che esiste già non si rigenera, salvo `--rifai`.
Il silenzio in fondo a una clip si taglia. Una clip più lunga della finestra del sottotitolo si rigenera (fino a tre volte,
tenendo la più corta); alla fine segnala quelle rimaste lunghe.
"""
import argparse
import importlib.util
import json
import os
import subprocess
import sys
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
VOCE = RADICE / 'strumenti' / 'voce'
MODELLO = 'chatterbox'      # il modello scelto dal banco di prova
TENTATIVI = 3               # quante volte generare una battuta che non sta nella sua finestra
sys.path.insert(0, str(VOCE))                 # i modelli importano `banco` per la voce di riferimento
os.environ.setdefault('HF_HOME', str(VOCE / 'pesi'))
os.environ.setdefault('HF_HUB_DISABLE_PROGRESS_BARS', '1')
import numpy as np
import soundfile as sf


def senza_coda(wav, sr):
    """Toglie il silenzio che il modello a volte lascia in fondo, tenendone 0,2 s."""
    n = int(sr * 0.05)
    quadri = [np.sqrt((wav[i:i + n] ** 2).mean()) for i in range(0, len(wav) - n, n)]
    soglia = max(quadri) * 0.03
    ultimo = max(i for i, q in enumerate(quadri) if q > soglia)
    return wav[:min(len(wav), (ultimo + 1) * n + int(sr * 0.2))]


def battute(ep):
    return json.loads(subprocess.run(['node', str(RADICE / 'strumenti' / 'battute.mjs'), ep], check=True, capture_output=True, text=True).stdout)


def main():
    p = argparse.ArgumentParser()
    p.add_argument('episodio')
    p.add_argument('--modello', default=MODELLO)
    p.add_argument('--rifai', action='store_true', help='rigenera anche le clip che esistono già')
    a = p.parse_args()
    spec = importlib.util.spec_from_file_location(a.modello, VOCE / 'modelli' / f'{a.modello}.py')
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    m = None
    audio = RADICE / 'episodi' / a.episodio / 'audio'
    (audio / 'voce').mkdir(parents=True, exist_ok=True)
    tracce = json.loads((audio / 'tracce.json').read_text()) if (audio / 'tracce.json').exists() else {}
    clip = [c for c in tracce.get('clip', []) if not str(c.get('file', '')).startswith('voce/')]
    lunghe = []
    for s in battute(a.episodio)['scene']:
        for i, b in enumerate(s['battute'], 1):
            nome = f"voce/{s['id']}-{i}.wav"
            f = audio / nome
            finestra = b['a'] - b['da']
            if a.rifai or not f.exists():
                if m is None:
                    m = mod.carica()
                wav = None
                for tentativo in range(TENTATIVI):          # il modello a volte allunga una frase a caso: si riprova
                    w, sr = mod.genera(m, b['testo'], b['chi'])
                    w = senza_coda(np.asarray(w, dtype=np.float32).squeeze(), sr)
                    if wav is None or len(w) < len(wav):
                        wav = w
                    if len(wav) / sr <= finestra:
                        break
                sf.write(f, wav, sr, subtype='PCM_16')
            durata = sf.info(f).duration
            clip.append({'canale': 'voce', 'file': nome, 'da': b['da']})
            segno = '✗' if durata > finestra else '✓'
            if durata > finestra:
                lunghe.append((nome, durata, finestra))
            print(f"  {segno} {nome:22} {durata:5.1f} s in una finestra di {finestra:5.1f} s  {b['chi']}: {b['testo'][:48]}")
    tracce['clip'] = clip
    tracce.setdefault('volumi', {}).setdefault('voce', 0)
    (audio / 'tracce.json').write_text(json.dumps(tracce, indent=1, ensure_ascii=False) + '\n')
    print(f"\n{len(clip)} clip in {audio / 'tracce.json'}")
    if lunghe:
        print(f"{len(lunghe)} battute più lunghe della loro finestra:")
        for nome, d, w in lunghe:
            print(f"  {nome}: {d:.1f} s, la finestra ne dà {w:.1f} (+{d - w:.1f})")
        sys.exit(1)


if __name__ == '__main__':
    main()
