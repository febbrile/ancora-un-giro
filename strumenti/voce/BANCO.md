# Il banco di prova delle voci

Quale modello aperto di sintesi vocale dà la voce narrante dei film (decisione in `mondo/DECISIONI.md`, «La voce
narrante»). I film si fanno solo in italiano: un'altra lingua sarebbe un rifacimento completo, da valutare allora. Le battute di prova sono cinque dell'episodio 1 (`battute.json`): quattro del narratore e una di Ada,
le stesse per tutti. Mac: Apple M3 Pro, 18 GB, macOS 27; i modelli girano sulla GPU (MPS) o sulla CPU.

## Lo scouting

Scheda ufficiale (Hugging Face o GitHub) di ogni candidato, letta il 28 ottobre 2026. Scartati subito quelli
senza italiano o con una licenza che non permette l'uso pubblico sul sito.

| Modello | Licenza pesi | Italiano | Clona | Peso | Esito |
|---|---|---|---|---|---|
| **Qwen3-TTS 1.7B Base** (Alibaba) | Apache 2.0 | sì, 10 lingue | sì, da 3 s con trascrizione | 1,7 B · ~3,5 GB | al banco |
| **Chatterbox Multilingual** (Resemble) | MIT | sì, 23 lingue | sì | 0,5 B · ~3,2 GB | al banco (dal pacchetto PyPI, pesi v2; v3 solo da sorgente) |
| **Kokoro 82M** (hexgrad) | Apache 2.0 | sì, 2 voci (if_sara, im_nicola, voto C) | no | 82 M · 330 MB | al banco |
| **Supertonic 3** (Supertone) | OpenRAIL-M (uso libero con restrizioni d'uso) | sì, 31 lingue | no (voci preimpostate) | 99 M ONNX · 250 MB | al banco; repo archiviato |
| **XTTS v2** (Coqui, fork idiap `coqui-tts`) | Coqui Public Model License: **solo uso non commerciale** | sì, 17 lingue | sì, da 6 s | ~1,9 GB | al banco con riserva: licenza non libera |
| KittenTTS 2 (Stellon Labs) | Stellon Labs Community License: gratis sotto 1 M$ di ricavi, attribuzione obbligatoria, revocabile | sì, 16 lingue | sì | 1,7 B · ~1 GB | scartato: licenza non libera |
| KugelAudio-0-open | MIT | sì, 23 lingue | no | 7 B · ~19 GB di VRAM | scartato: non sta in questo Mac |
| Magpie TTS Multilingual (NVIDIA) | NVIDIA Open Model License | sì, 12 lingue | no, 5 voci inglesi | 364 M | scartato: NeMo su CUDA, niente voci italiane |
| CosyVoice 3 (Alibaba FunAudioLLM) | Apache 2.0 | sì, 9 lingue | sì | 0,5 B | scartato: installazione solo Linux (conda, ttsfrd, Docker CUDA), nessun supporto Mac dichiarato |
| F5-TTS | CC BY-NC 4.0 | solo con fine-tune di terzi | sì | | scartato: non commerciale |
| Fish Speech / OpenAudio | CC BY-NC-SA | sì | sì | | scartato: non commerciale |
| KittenTTS 1 (ONNX) | Apache 2.0 | **no**, solo inglese | no | 25–80 MB | scartato: niente italiano |
| Orpheus, Dia, Parler, MeloTTS, VibeVoice | varie | **no** | | | scartati: niente italiano |

Fonti: github.com/QwenLM/Qwen3-TTS e huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base · github.com/resemble-ai/chatterbox e
huggingface.co/ResembleAI/chatterbox · huggingface.co/hexgrad/Kokoro-82M (VOICES.md) · huggingface.co/Supertone/supertonic-3 e
github.com/supertone-inc/supertonic · huggingface.co/coqui/XTTS-v2 e github.com/idiap/coqui-ai-TTS · github.com/KittenML/KittenTTS e
huggingface.co/KittenML/kitten-tts-2 · huggingface.co/kugelaudio/kugelaudio-0-open · huggingface.co/nvidia/magpie_tts_multilingual_357m ·
github.com/FunAudioLLM/CosyVoice.

## La voce di riferimento

Per i modelli che clonano (Qwen3-TTS, Chatterbox, XTTS) la voce è la stessa: un segmento di 17 secondi del set di test
italiano di Multilingual LibriSpeech (LibriVox, CC BY 4.0), scaricato da `riferimento/scarica.py` con la sua
trascrizione; i dettagli in `riferimento/FONTE.md`. Serve solo al confronto: la voce dei film sarà quella dell'autore, che ha
proposto di clonare la propria, e con una sua registrazione le clip dei modelli che clonano si rigenerano così com'è (`banco.py`).
