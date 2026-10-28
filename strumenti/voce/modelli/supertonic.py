# Supertonic 3 (OpenRAIL-M, ~99M, ONNX su CPU): 31 lingue, voci preimpostate, senza clonazione. Narratore M1, Ada F1.
from supertonic import TTS


def carica():
    return TTS(model='supertonic-3')


def genera(t, testo, chi):
    stile = t.get_voice_style('F1' if chi == 'ADA' else 'M1')
    wav, _ = t.synthesize(testo, voice_style=stile, lang='it')
    return wav, t.sample_rate
