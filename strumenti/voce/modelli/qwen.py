# Qwen3-TTS 1.7B Base (Apache 2.0): 10 lingue, clona da 3 s di riferimento (con trascrizione). Su MPS in float32.
import torch
from qwen_tts import Qwen3TTSModel
from banco import RIF_WAV, RIF_TXT


def carica():
    dev = 'mps' if torch.backends.mps.is_available() else 'cpu'
    return Qwen3TTSModel.from_pretrained('Qwen/Qwen3-TTS-12Hz-1.7B-Base', device_map=dev, dtype=torch.float32)


def genera(m, testo, chi):
    wavs, sr = m.generate_voice_clone(text=testo, language='Italian', ref_audio=str(RIF_WAV), ref_text=RIF_TXT.read_text().strip())
    return wavs[0], sr
