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

## La coda «Sotto il luna park» a fine episodio · 28 ottobre 2026

**La decisione.** Ogni episodio finisce, dopo il cartello Fine, con una coda da trenta a quarantacinque secondi sul
quaderno di Ada: gli schizzi a matita di quello che l'episodio ha mostrato e, accanto a ognuno, il suo nome vero
scritto a mano, detto dal narratore con la stessa voce. Nel player è un capitolo a sé, che chi vuole solo la storia
salta. È la forma scelta tra tre: la coda nel film, una pagina sul sito, o tutte e due da una fonte sola.

**Il perché.** È l'unica forma che arriva a chi guarda il film e basta: all'adulto del §2 del soggetto manca proprio il
passo tra il film, senza parole tecniche, e le lezioni, con i numeri.

**Le regole della coda.**
- Nomina solo quello che l'episodio ha mostrato, una cosa per volta; niente concetti in anticipo.
- I nomi veri sì; formule e numeri no: restano nelle lezioni.
- Le scritte stanno sul quaderno, mai nel luna park: la regola «niente scritte» resta vera per la storia.
- Sta fuori dal conto dei cinque minuti, con un suo tetto di un minuto.
- Non corregge la storia: se la coda deve spiegare quello che il film non ha fatto capire, si riscrive il film.

**Cosa comporta.** Fatti: il pilota, la scena `coda` dell'episodio 1; le regole in CLAUDE.md e nel §6 del soggetto;
`tempi.py` e `controlla.mjs` che contano la coda a parte; il prologo rifatto per intero nel formato nuovo (parte
dalla domanda di chi scrive, dichiara subito il parco giocattolo, ha la sua coda: prompt, token, modello di
linguaggio, probabilità). Restano: le code degli altri quattordici episodi; la coda dell'episodio 1, che ripete
«modello di linguaggio» e si accorcia; l'episodio 9, dove «parco giocattolo» diventa un richiamo e dei quattro nomi
resta suo solo «addestramento»; la riga della scaletta «9 … dà i nomi veri». Il piano episodio per episodio, con i
nomi di ogni coda, è in [PIANO-FORMATO.md](PIANO-FORMATO.md): i nomi veri stanno solo nelle code, anche nel 9 e nel 15.

