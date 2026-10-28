"""Scarica una voce di riferimento libera: un segmento italiano di Multilingual LibriSpeech (CC BY 4.0, da LibriVox),
con la sua trascrizione. `amb/rif/bin/python strumenti/voce/riferimento/scarica.py [indice]`.
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
sf.write(QUI / 'voce.wav', np.asarray(a, dtype=np.float32), sr)
(QUI / 'voce.txt').write_text(r['transcript'] + '\n')
(QUI / 'FONTE.md').write_text(
    '# La voce di riferimento\n\n'
    f'Segmento `{r["id"]}` (lettore {r["speaker_id"]}) del set di test italiano di '
    '[Multilingual LibriSpeech](https://huggingface.co/datasets/facebook/multilingual_librispeech), '
    'registrazioni LibriVox pubblicate con licenza CC BY 4.0. Serve solo al banco di prova: la voce dei film sarà '
    "quella dell'autore, registrata apposta.\n\n"
    f'Durata {len(a) / sr:.1f} s a {sr} Hz. Testo:\n\n> {r["transcript"]}\n')
print(r['id'], r['speaker_id'], f'{len(a) / sr:.1f} s', sr, r['transcript'])
