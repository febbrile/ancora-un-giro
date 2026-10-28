# Chatterbox Multilingual (MIT, 0.5B): 23 lingue, clona dalla voce di riferimento. Il pacchetto PyPI (0.1.7) carica i pesi v2.
# Su MPS la memoria esplode (ucciso dal sistema a 18 GB): gira sulla CPU.
import torch
from chatterbox.mtl_tts import ChatterboxMultilingualTTS
from banco import RIF_WAV


def carica():
    return ChatterboxMultilingualTTS.from_pretrained(device='cpu')


def genera(m, testo, chi):
    wav = m.generate(testo, language_id='it', audio_prompt_path=str(RIF_WAV))
    return wav.squeeze().cpu().numpy(), m.sr
