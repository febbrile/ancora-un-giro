# Kokoro 82M (Apache 2.0): voci italiane pronte, senza clonazione. Narratore im_nicola, Ada if_sara.
# Per l'italiano serve espeak-ng: quello del pacchetto espeakng-loader si rompe su questo Mac, si usa quello di Homebrew.
import numpy as np
from misaki import espeak                                   # noqa: imposta la libreria del loader, poi la sostituiamo
from phonemizer.backend.espeak.wrapper import EspeakWrapper
EspeakWrapper.set_library('/opt/homebrew/lib/libespeak-ng.dylib')
EspeakWrapper.set_data_path('/opt/homebrew/share/espeak-ng-data')
from kokoro import KPipeline


def carica():
    return KPipeline(lang_code='i', repo_id='hexgrad/Kokoro-82M')


def genera(p, testo, chi):
    voce = 'if_sara' if chi == 'ADA' else 'im_nicola'
    pezzi = [np.asarray(a) for _, _, a in p(testo, voice=voce)]
    return np.concatenate(pezzi), 24000
