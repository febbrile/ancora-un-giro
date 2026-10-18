# Come sono nati i numeri della bozza 3

I valori in `strumenti/numeri.py` sono stati trovati in due passi, ripetibili:

```bash
cd strumenti/progetto_numeri
python3 1_progetta.py 1
python3 2_ruota.py
```

1. **`1_progetta.py`**: lavora in una base interna "di progetto", dove è comodo pensare a direzioni di mare,
   di parco e di nome.
   - Parte dai valori della bozza 2 e toglie *stira*.
   - Aggiunge *felice*, *.* e *Fine*.
   - Con una discesa del gradiente sposta di poco le righe di U e trova le righe finali dei giri
     dell'episodio 3, in modo che secchi e stanze siano quelli voluti.
   - Il risultato va in `progetto.json`.
2. **`2_ruota.py`**: cerca una rotazione dello spazio per cui **nessun vettore mostrato sia allineato a un asse**.
   - Ruota tutto: E, U, gli spostamenti e le righe dei giri.
   - Arrotonda a due decimali e controlla che stanze e campane restino giuste.
   - Il risultato va in `ruotato.json`.

   Una rotazione non cambia nessun prodotto scalare. Per questo partite a carte, campane e secchi restano
   gli stessi, mentre le coordinate perdono ogni "significato" leggibile. È esattamente ciò che succede nei
   modelli veri.

Dopo la rotazione è stato fatto **un solo ritocco a mano**: *nuota* da ♠ −0.79 a ♠ −0.80. Serve perché la somma
delle pastiglie mostrate (1.98 + 1.31 − 0.01) dia proprio il gettone mostrato (3.28).

Lanterna e cartelli del piano 1 vivono in uno spazio a parte (quello delle lenti) e restano quelli della bozza 2.

Da qui in poi l'unica fonte è `strumenti/numeri.py`: se un numero cambia, si cambia lì.
