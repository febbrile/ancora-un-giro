# Il pozzo delle parole

Un piccolo cartone animato in tre episodi che racconta come un LLM sceglie il prossimo token.
Si legge su due livelli: per un bambino è la fiaba di Emma che cade in un pozzo e attraversa stanze strane;
per un adulto è il viaggio di un vettore attraverso gli strati di un Transformer giocattolo, con numeri veri.

Due frasi, un esperimento: **«Al mare Emma…»** e **«Al parco Emma…»**. Emma parte uguale in entrambe,
la scienziata Ada legge le coordinate, gli strati la spostano, e in fondo al pozzo nasce la parola dopo.

Tratto dalla lezione *Come funziona un LLM: dal testo alla distribuzione di probabilità*
([appunti](https://claude.ai/artifact/8895nMYp1Dtj2HpaDCuuJE)).

## Episodi

> La bozza 3 della sceneggiatura riorganizza il racconto in quattro episodi più lenti
> (Al mare Emma · Al parco Emma · Fino alla Fine · Mille semi). L'episodio 1 è già ricostruito;
> gli episodi 2 e 3 qui sotto sono ancora quelli della bozza 2.

| # | Titolo | Durata | Cosa spiega | Guarda |
|---|---|---|---|---|
| 1 | Al mare Emma *(bozza 3)* | 4:46 | il viaggio intero: tokenizer, carte senza nome, partita a carte, discesa a botole, campane, secchio, pesca | [apri](https://claude.ai/artifact/2SYUjC4462ypdANocGCEoq) |
| 2 | Il primo sguardo | 3:06 | attention come partita a carte (prodotto scalare), softmax, strati, logit, temperatura, campionamento | [apri](https://claude.ai/artifact/PRKqd9xxxzQpEKizCuVcpb) |
| 3 | Due cieli | 2:00 | la frase del parco, il ciclo autoregressivo, EOS e max_tokens, riepilogo | [apri](https://claude.ai/artifact/TjUNodB3pgkpZvFnSpgCNL) |

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
- Ogni episodio ha il suo `shared.js`: gli episodi 2 e 3 condividono la stessa versione (con carte e gettoni),
  l'episodio 1 ha la versione precedente.
- I sottotitoli si spezzano da soli in pezzi di 18–48 caratteri, senza mai chiudere un pezzo su un articolo,
  una preposizione o una congiunzione.

## Regole scientifiche

Il pozzo non decide: calcola. Le stanze sono letture (logit lens), non tappe obbligate. Tokenizer e
campionamento stanno fuori dal modello. L'elenco completo è nella sezione 5 della sceneggiatura.
