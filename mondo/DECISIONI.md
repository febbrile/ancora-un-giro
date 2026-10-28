# Ancora un giro · Le decisioni prese

Decisioni già prese ma non ancora realizzate, ognuna con il suo perché e con cosa serve per chiuderla.
Quando una è realizzata, si toglie da qui e finisce nelle regole (CLAUDE.md, soggetto) o nel README.

## La voce narrante, con un modello aperto di sintesi vocale · 28 ottobre 2026

**La decisione.** I film hanno una voce narrante vera, generata da un modello aperto di sintesi vocale (TTS) a
partire dai testi delle battute. I sottotitoli restano come accompagnamento. Si fa solo l'italiano, così com'è.

**Il perché.** Il §2 del soggetto dice che la serie è per un adulto curioso; senza voce il narratore è un testo da
leggere a dodici caratteri al secondo, e il cartone non è un cartone. La voce cambia anche il ritmo: oggi le finestre
dei sottotitoli sono dimensionate per leggere, domani il vincolo è la durata dell'audio.

**Cosa comporta.**
1. **I testi in un file per lingua.** Oggi le battute stanno dentro le scene, come chiamate a `G.sottotitolo` nei
   `scene-*.js` (329 in tutto), e la sceneggiatura le ripete. Vanno in `episodi/NN-titolo/testi/it.json`: per ogni
   scena, le battute con chi parla e la finestra di tempo. Le scene, `strumenti/tempi.py` e `strumenti/controlla.mjs`
   leggono da lì.
2. **Uno script `strumenti/voce.py`** che genera una clip per battuta, ne misura la durata, la mette in
   `audio/tracce.json` sul canale `voce` all'istante giusto, e segnala le battute che non stanno nella loro finestra.
3. **La voce di riferimento**, se il modello clona: una registrazione nostra o con licenza libera, mai di un attore.

**Le altre lingue.** Non si prepara nessuna struttura multilingua adesso. Se un giorno serve un'altra lingua, un
episodio in quella lingua è un rifacimento completo: si riscrivono i testi, le frasi di esempio e la voce, e si rifanno
le nostre considerazioni da capo, tenendo le animazioni e tutto il resto. Il parco giocattolo parla italiano: «Al mare
Emma» funziona perché Emma è l'ultimo biglietto e la parola dopo è un verbo; in un'altra lingua frase, biglietti e
vocabolario del modellino si ripensano, non si traducono. Quale strada prendere si decide allora.

**L'epica: il banco di prova dei modelli.** Prima di scegliere, si provano i candidati sulle stesse battute
dell'episodio 1 (narratore e Ada, cinque battute), si ascoltano alla cieca e si dà un voto. Criteri, in ordine:
qualità dell'italiano (prosodia, doppie, vocali aperte e chiuse), licenza (libera anche per uso pubblico), clonazione
(per avere la voce che vogliamo noi), tempo e peso su questo Mac, facilità di installazione.
Candidati di partenza, da verificare sulle schede ufficiali:
- Qwen3-TTS (Apache 2.0, dieci lingue con l'italiano, clonazione);
- Chatterbox Multilingual di Resemble (MIT, clonazione);
- Kokoro (Apache 2.0, leggerissimo, voci italiane pronte, senza clonazione);
- KittenTTS, https://github.com/KittenML/KittenTTS (piccolissimo, da verificare se parla italiano);
- Coqui TTS / XTTS v2, https://github.com/coqui-ai/tts (italiano e clonazione; progetto fermo, esiste un fork
  mantenuto; licenza del modello XTTS non libera per uso commerciale: da verificare);
- altri che emergono dallo scouting.
Risultato dell'epica: il modello scelto, con il perché, e `strumenti/voce.py` che lo usa. Si realizza in una sessione
a parte.
