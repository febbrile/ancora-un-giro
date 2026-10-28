"""Scarica la voce libera usata al banco di prova: un segmento italiano di Multilingual LibriSpeech (CC BY 4.0, da LibriVox),
con la sua trascrizione, in librivox.wav e librivox.txt (voce.wav è la voce dell'autore: vedi FONTE.md). `amb/rif/bin/python strumenti/voce/riferimento/scarica.py [indice]`.
"""
import sys
from pathlib import Path
import numpy as np
import soundfile as sf
from datasets import load_dataset, Audio
import io

QUI = Path(__file__).resolve().parent
n = int(sys.argv[1]) if len(sys.argv) > 1 else 0
ds = load_dataset("facebook/multilingual_librispeech", "italian", split="test", streaming=True).cast_column("audio", Audio(decode=False))
for i, r in enumerate(ds):
    if i == n:
        break
a, sr = sf.read(io.BytesIO(r["audio"]["bytes"]))
sf.write(QUI / 'librivox.wav', np.asarray(a, dtype=np.float32), sr)
(QUI / 'librivox.txt').write_text(r['transcript'] + '\n')
print(r['id'], r['speaker_id'], f'{len(a) / sr:.1f} s', sr, r['transcript'])
