# XTTS v2 (Coqui Public Model License, solo uso non commerciale): 17 lingue, clona da 6 s di riferimento.
import os
os.environ['COQUI_TOS_AGREED'] = '1'
import torch
from TTS.api import TTS
from banco import RIF_WAV


def carica():
    return TTS('tts_models/multilingual/multi-dataset/xtts_v2').to('mps' if torch.backends.mps.is_available() else 'cpu')


def genera(t, testo, chi):
    return t.tts(text=testo, speaker_wav=str(RIF_WAV), language='it'), 24000
