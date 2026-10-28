"""Banco di prova delle voci: genera le battute di prova con un modello e ne misura tempi e pesi.

    amb/<modello>/bin/python strumenti/voce/banco.py <modello>

`modelli/<modello>.py` espone `carica()` (restituisce un oggetto) e `genera(m, testo, chi)` che restituisce
`(campioni float32 mono, frequenza)`. Le clip finiscono in `prove/<modello>/<id>.wav`, le misure in `prove/<modello>/misure.json`.
La voce di riferimento, per chi clona, è `riferimento/voce.wav` con il testo in `riferimento/voce.txt`.
"""
import importlib.util
import json
import os
import sys
import time
from pathlib import Path

QUI = Path(__file__).resolve().parent
os.environ.setdefault('HF_HOME', str(QUI / 'pesi'))       # i pesi stanno qui, fuori da git
os.environ.setdefault('HF_HUB_DISABLE_PROGRESS_BARS', '1')
import numpy as np
import soundfile as sf

RIF_WAV = QUI / 'riferimento' / 'voce.wav'
RIF_TXT = QUI / 'riferimento' / 'voce.txt'


def main(nome):
    spec = importlib.util.spec_from_file_location(nome, QUI / 'modelli' / f'{nome}.py')
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    out = QUI / 'prove' / nome
    out.mkdir(parents=True, exist_ok=True)
    battute = json.loads((QUI / 'battute.json').read_text())
    t0 = time.perf_counter()
    m = mod.carica()
    misure = {'caricamento_s': round(time.perf_counter() - t0, 1), 'battute': {}}
    for b in battute:
        t0 = time.perf_counter()
        wav, sr = mod.genera(m, b['testo'], b['chi'])
        dt = time.perf_counter() - t0
        wav = np.asarray(wav, dtype=np.float32).squeeze()
        f = out / f"{b['id']}.wav"
        sf.write(f, wav, sr)
        durata = len(wav) / sr
        misure['battute'][b['id']] = {'generazione_s': round(dt, 1), 'durata_s': round(durata, 1), 'kB': f.stat().st_size // 1000,
                                     'rtf': round(dt / durata, 2)}
        print(f"{nome:12} {b['id']:10} {dt:5.1f} s per {durata:4.1f} s di audio")
    (out / 'misure.json').write_text(json.dumps(misure, indent=1, ensure_ascii=False))


if __name__ == '__main__':
    main(sys.argv[1])
