# Il pozzo delle parole

Un piccolo cartone animato in quattro episodi che racconta come un LLM sceglie il prossimo token.
Si legge su due livelli: per un bambino è la fiaba di Emma che cade in un pozzo e attraversa stanze strane;
per un adulto è il viaggio di un vettore attraverso gli strati di un Transformer giocattolo, con numeri veri.

Due frasi, un esperimento: **«Al mare Emma…»** e **«Al parco Emma…»**. Emma parte uguale in entrambe,
la scienziata Ada legge le coordinate, gli strati la spostano, e in fondo al pozzo nasce la parola dopo.

**Guardalo online: https://febbrile.github.io/il-pozzo-delle-parole/**

Tratto dalla lezione *Come funziona un LLM: dal testo alla distribuzione di probabilità*
([appunti](https://claude.ai/artifact/8895nMYp1Dtj2HpaDCuuJE)).

## Episodi

Tutti e quattro gli episodi seguono la bozza 3 della sceneggiatura. Si guardano in due modi: come artifact Motion
su claude.ai (link nella tabella) o nel **sito**, con il player nostro (vedi sotto).

| # | Titolo | Durata | Cosa spiega | Guarda |
|---|---|---|---|---|
| 1 | Al mare Emma | 4:46 | il viaggio intero: tokenizer, carte senza nome, partita a carte, discesa a botole, campane, secchio, pesca | [apri](https://claude.ai/artifact/2SYUjC4462ypdANocGCEoq) |
| 2 | Al parco Emma | 4:04 | stessa carta, periscopio, partita con Parco, un'altra strada, due cieli | [apri](https://claude.ai/artifact/PRKqd9xxxzQpEKizCuVcpb) |
| 3 | Fino alla Fine | 4:37 | termostato, stesso secchio e pesca diversa, il ciclo con Corre, Felice e Punto, EOS, max_tokens, riepilogo | [apri](https://claude.ai/artifact/TjUNodB3pgkpZvFnSpgCNL) |
| 4 | Mille semi | 3:01 | tre semi = tre direzioni, il quarto seme non ci sta sul foglio, cinque semi, il rotolo da 4.096 semi dei modelli veri, righe senza nome | [apri](https://claude.ai/artifact/X1MPgtVBoagTTNe7LhzCHB) |

Personaggi e oggetti: [tela di design](https://claude.ai/artifact/4aR8fDLy9S866GTJU1Y6L3).

## Struttura

```
sceneggiatura/SCENEGGIATURA.md   la sceneggiatura completa: scene, voci, grammatica visiva, numeri, regole scientifiche
episodi/NN-titolo/               il sorgente di ogni episodio (film Motion)
  meta.json                      titolo del film
  cut.js                         il montaggio: window.CUT = kit.scenes();
  modules/scenes.json            elenco scene, durate, palette, font
  modules/shared.js              personaggi in SVG, carte, gettoni, sottotitoli a scorrimento
  modules/scene-*.js             una scena per file: init() e render(t)
  modules/score.js               la colonna sonora
  modules/base.css               stile comune
  modules/fetched-fonts.json     elenco font gestito dal player: non modificarlo a mano
sito/                            il sito statico: elenco episodi e player nostro che legge episodi/*/modules
  index.html, guarda.html        le due pagine (guarda.html?ep=01-al-mare-emma)
  motore/kit.js                  le funzioni del kit di Motion che usano le scene, scritte da noi
  motore/suono.js                il sintetizzatore Web Audio che suona score.js
  motore/anni90.js               riarrangia score.js come la musica di un videogioco anni 90
  motore/player.js               palco, barra del tempo, capitoli, tastiera
  episodi.json                   l'elenco degli episodi del sito
personaggi/                      la tela di design: Emma, Ada, i compagni, gli oggetti, due fotogrammi di prova
strumenti/numeri.py              il modellino giocattolo della bozza 3: unica fonte di tutti i numeri
strumenti/numeri_bozza2.py       i numeri dei film attuali (bozza 2), finché non sono ricostruiti
strumenti/tempi.py               controlla il ritmo della sceneggiatura (12 car/s, pause, 5 minuti)
strumenti/progetto_numeri/       come sono stati trovati i numeri della bozza 3
strumenti/sottotitoli.js         prototipo del taglio dei sottotitoli (mai finire su articolo o preposizione)
```

## Il modellino

Tutti i numeri sono giocattolo ma i calcoli sono quelli veri: embedding a 3 dimensioni, attention con
query e key, connessione residua `x = x + Δ`, logit come prodotto scalare con le righe di U, softmax con temperatura.

```bash
python3 strumenti/numeri.py
```

Stampa i due viaggi (mare e parco) e si ferma se un numero non torna con quelli dei film.

## Come si lavora sugli episodi

Gli episodi vivono come artifact **Motion** su claude.ai: la versione pubblicata è quella nello store dell'artifact.
Questa cartella ne è la copia di sorgente, esportata il 18 ottobre 2026.

- Per modificare una scena si aggiorna il documento corrispondente nello store dell'artifact
  (`modules/<file>`), poi si riallinea il file qui e si fa commit.
- Tutti gli episodi hanno lo stesso `shared.js`.
- I sottotitoli si spezzano da soli in pezzi di 18–48 caratteri, senza mai chiudere un pezzo su un articolo,
  una preposizione o una congiunzione.

## Il sito

Il sito fa girare gli stessi file di `episodi/` nel browser, senza Motion: le scene non si copiano e non si
riscrivono. Il player nostro (`sito/motore/`) offre le stesse funzioni del kit (`kit.scene`, `kit.h`, `kit.rng`,
`kit.typist`, `TextFx`, le curve `seg`, `eo`, `eio`, …) e suona `score.js` con un sintetizzatore suo:
le immagini sono identiche a Motion, la musica è simile ma non uguale.

La musica ha due stili, che si scelgono col pulsante ♪ (o il tasto S) e restano memorizzati:
- **Anni 90** (quello di partenza): la stessa partitura riarrangiata da `motore/anni90.js` con voci da console.
  Sugli accordi di `score.js` nascono arpeggi veloci, un basso che salta d'ottava, una batteria e una melodia;
  i cambi di scena e i rumori restano quelli.
- **Calma**: la partitura com'è, come nei film Motion.

Per provarlo in locale, dalla cartella del repository:

```bash
python3 -m http.server 8765
```

poi si apre http://localhost:8765/sito/. Serve un server (anche questo): aprendo il file con doppio clic il
browser non lascia leggere i moduli. `guarda.html?ep=01-al-mare-emma&t=40` apre il film fermo al secondo 40.

Il sito è pubblicato con GitHub Pages dalla radice del ramo `main` di
[febbrile/il-pozzo-delle-parole](https://github.com/febbrile/il-pozzo-delle-parole): ogni push su `main` lo aggiorna.
Il sito legge i moduli da `../episodi/`.

## Regole scientifiche

Il pozzo non decide: calcola. Le stanze sono letture (logit lens), non tappe obbligate. Tokenizer e
campionamento stanno fuori dal modello. L'elenco completo è nella sezione 5 della sceneggiatura.
