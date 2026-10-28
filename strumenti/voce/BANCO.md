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

## Le misure

Cinque battute, 37–52 secondi di audio in tutto. Tempi misurati con `banco.py` su questo Mac, un modello alla volta
(`prove/<modello>/misure.json`). «Calcolo per secondo di audio» è il tempo di generazione diviso la durata della clip.

| Modello | Dove gira | Caricamento | Calcolo per secondo di audio | Pesi su disco | Ambiente Python |
|---|---|---|---|---|---|
| Kokoro | CPU | 2 s | 0,2 s | 630 MB (tutte le voci) | 820 MB |
| Supertonic 3 | CPU (ONNX) | 8 s | 0,2 s | 390 MB | 120 MB |
| XTTS v2 | GPU (MPS) | 24 s | 1,7 s | 3,5 GB | 890 MB |
| Qwen3-TTS 1.7B | GPU (MPS), float32 | 78 s | 3,6 s | 8,5 GB | 1,1 GB |
| Chatterbox | CPU (su MPS la memoria esplode) | 14 s | 3,7 s | 6 GB (pesi v2 e v3) | 980 MB |

Un episodio ha circa 25 battute e 3 minuti di parlato: con i modelli lenti sono 10–12 minuti di calcolo, con quelli
leggeri meno di un minuto. Le clip si generano una volta e restano nel repository, quindi il tempo conta poco.

## Il verdetto

I criteri di `DECISIONI.md`, nell'ordine: qualità dell'italiano (prosodia, doppie, vocali aperte e chiuse), licenza,
clonazione (per avere la voce che vogliamo noi: quella dell'autore), tempo e peso su questo Mac, facilità di
installazione. La qualità dell'italiano la vota l'autore all'ascolto, alla cieca:

    CIECO=1 sh strumenti/voce/ascolta.sh          # battuta per battuta, i modelli mescolati e chiamati A, B, C, D, E
    cat strumenti/voce/prove/cieco.txt            # la soluzione, da leggere dopo

Senza `CIECO=1` dice il nome del modello prima di ogni clip; `sh strumenti/voce/ascolta.sh uscita ada` ascolta
solo alcune battute.

| | Italiano (voto all'ascolto) | Licenza | Clonazione | Tempo e peso | Installazione |
|---|---|---|---|---|---|
| **Qwen3-TTS 1.7B** | _da votare_ | Apache 2.0 ✓ | ✓ da 3 s, con trascrizione | lento, 8,5 GB | `pip install qwen-tts`, gira su MPS senza ritocchi |
| **Chatterbox** | _da votare_ | MIT ✓ | ✓ | lento, 6 GB | `pip install chatterbox-tts` + `setuptools<80`; solo CPU; i pesi v3 solo da sorgente |
| **XTTS v2** | _da votare_ | CPML: solo non commerciale ✗ | ✓ da 6 s | medio, 3,5 GB | `pip install coqui-tts` con torch 2.8 (il 2.9 vuole ffmpeg) |
| **Kokoro** | _da votare_ | Apache 2.0 ✓ | ✗ (2 voci italiane fisse, voto C sulla scheda) | leggerissimo | `pip install kokoro` + espeak-ng da Homebrew |
| **Supertonic 3** | _da votare_ | OpenRAIL-M ✓ (con restrizioni d'uso) | ✗ (voci fisse, senza italiano dedicato) | leggerissimo | `pip install supertonic`, zero problemi; progetto archiviato |

**Giudizio per modello**, a parte l'ascolto:
- **Qwen3-TTS**: l'unico con tutto: licenza libera, clonazione, italiano tra le dieci lingue dichiarate, gira sulla GPU
  del Mac. Il più pesante e il più lento a caricare. Vuole la trascrizione della voce di riferimento (o perde qualità).
- **Chatterbox**: licenza libera e clonazione, ma su questo Mac va solo sulla CPU, e il pacchetto PyPI è indietro
  rispetto ai pesi v3 dichiarati sulla scheda.
- **XTTS v2**: comodo e collaudato, ma la licenza vieta ogni uso commerciale, e il progetto originale è fermo: una
  scelta che vincola il progetto per sempre. Da tenere solo come termine di paragone.
- **Kokoro**: velocissimo e minuscolo, ma senza clonazione la voce non sarà mai la nostra, e le due voci italiane hanno
  poca cura (meno di cento minuti di addestramento ciascuna, voto C sulla scheda ufficiale).
- **Supertonic 3**: velocissimo, installazione perfetta, ma niente clonazione, voci pensate per l'inglese e il coreano,
  e il repository è archiviato: nessun aggiornamento.

**La proposta**, in attesa del voto sull'italiano: **Qwen3-TTS 1.7B Base**. È l'unico che soddisfa i tre criteri che
vengono subito dopo l'ascolto (licenza libera, clonazione, gira su questo Mac); la lentezza non pesa, perché le clip si
generano una volta sola. Se all'ascolto l'italiano di Qwen3-TTS dovesse deludere, la riserva è Chatterbox (stesse
licenza e clonazione, solo CPU). Kokoro e Supertonic restano le scelte giuste solo se la clonazione venisse lasciata
cadere.

**Prossimo passo dopo la scelta**: registrare la voce dell'autore (15–20 secondi di italiano letto, stanza silenziosa),
metterla in `riferimento/voce.wav` con la trascrizione esatta in `riferimento/voce.txt`, rigenerare le clip con
`banco.py` e poi l'episodio 1 con `strumenti/voce.py`.
