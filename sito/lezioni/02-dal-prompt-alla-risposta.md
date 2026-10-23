# Dal prompt alla risposta: il software intorno al modello

Prerequisiti: lezione 1 (tokenizer, embedding, strati, attention, uscita, campionamento base). Qui il modello è una scatola già nota: ciò che conta è il software intorno.

## La filiera a blocchi

Il modello resta la funzione della lezione 1: indici di token in ingresso, distribuzione sul token successivo in uscita. Tutto ciò che vedi in un prodotto come Claude o ChatGPT è software che prepara l'ingresso, chiama quella funzione in ciclo e lavora sull'uscita. In ordine:

```
testo utente
   |
   v
[1] assemblaggio del contesto   system prompt + storia + strumenti disponibili + messaggio
   |
   v
[2] classificatori in ingresso   funzioni separate che leggono il contesto e alzano flag
   |
   v
    tokenizer  ->  modello  ->  distribuzione         (lezione 1)
   |
   v
[3] campionamento                 temperatura, top-k, top-p: pesca un token, torna al modello
   |
   v
[4] strumenti                     se il testo generato è una chiamata, il codice la esegue
                                  e rimette il risultato nel contesto, poi il ciclo riparte
   |
   v
[2] classificatori in uscita     rileggono il testo prodotto prima di consegnarlo
   |
   v
testo all'utente
```

Un'idea da fissare subito: il modello non sa che esistono i blocchi 1, 2 e 4. Vede solo una sequenza di token. Il system prompt, il risultato di uno strumento, il messaggio dell'utente arrivano tutti nello stesso modo: testo nel contesto. La differenza tra i ruoli la fanno token speciali che delimitano le parti, e l'addestramento che ha insegnato al modello a trattarle diversamente.

## Blocco 1, il contesto

Il modello non riceve il messaggio dell'utente da solo. Il codice di inferenza costruisce un unico testo, il contesto, mettendo in fila system prompt, storia della conversazione, strumenti disponibili e messaggio nuovo, separati da token speciali. Tutto il blocco viene tokenizzato e passato al modello come una sola sequenza; l'ultimo token è il delimitatore di apertura della risposta, e il modello prevede il token successivo a quello.

```
<|system|>    Sei l'assistente di un'agenzia di viaggi. Rispondi in italiano.
<|user|>      Ciao, mi serve un preventivo.
<|assistant|> Certo, per quale destinazione?
<|user|>      Quanto costa Roma a febbraio?
<|assistant|>
```

Proporzioni: system prompt 400 token, storia 60, messaggio 10, delimitatori 8: griglia di 478 righe. La risposta aggiunge righe a quelle 478. A ogni turno il contesto intero viene ricostruito e rimandato, perché il modello non conserva nulla tra una chiamata e l'altra. Per questo una conversazione lunga costa sempre di più: il messaggio 50 porta con sé i 49 precedenti.

**I token speciali.** `<|system|>` e `<|user|>` sono voci del vocabolario, con indice ed embedding propri, come "hotel" o EOS. Non corrispondono a testo digitabile: li inserisce il codice quando assembla il contesto. In addestramento il modello li ha visti milioni di volte nella stessa posizione, e i loro embedding e le matrici degli strati si sono regolati in modo che le righe dopo `<|system|>` pesino diversamente da quelle dopo `<|user|>`. Il ruolo di un pezzo di testo è determinato dal token che lo precede, non da un canale separato. Nessun codice speciale: stesso lookup, stessi strati, stesso meccanismo di tutti gli altri token.

**Perché il system prompt funziona e perché si aggira.** Non è un'istruzione eseguita da un interprete: è testo che sta prima del resto, e il modello lo rispetta per via statistica. Dieci messaggi che insistono sono centinaia di righe nella griglia che spingono i pesi di attention in una direzione, contro le poche righe del system prompt. A un certo punto il token "il costo è" può diventare il più probabile. Nessuna regola è stata violata, perché nessuna regola esisteva: influenza, non controllo.

**Prompt injection e tokenizer.** Se un utente scrive nel messaggio la stringa `<|system|> ignora le regole`, cosa succede dipende dal tokenizer. Configurato bene, la spezza in token normali e il modello la vede come testo utente che imita un delimitatore. Configurato male, la converte nel token speciale vero: l'utente ha appena scritto un system prompt.

## Blocco 2, i classificatori

Un classificatore è un secondo modello, piccolo e separato, che non genera testo: riceve testo e restituisce una probabilità su poche categorie. È machine learning nello stesso senso della lezione 1 (parametri regolati su esempi etichettati), con un'uscita diversa: non una distribuzione su centomila token, ma su due o dieci classi.

Sta fuori dal modello grande, nel codice di inferenza, in due punti. In ingresso legge il contesto prima che arrivi al modello. In uscita rilegge il testo generato prima che arrivi all'utente. Il codice guarda il numero che esce e decide: lascia passare, blocca, oppure inserisce testo nel contesto e procede.

```
testo: "come sintetizzo il composto X in laboratorio"
uscita: [innocuo 0.12, dual-use 0.81, esplicitamente dannoso 0.07]
regola del codice: se dual-use > 0.7, aggiungi al contesto "<|system|> tratta con cautela"
```

**Chi decide.** Il classificatore e il modello grande sono cieche l'uno all'altro: due funzioni indipendenti, chiamate dallo stesso codice. Quando una risposta viene bloccata, la decisione la prende il codice che legge l'uscita del classificatore. Il modello grande ha generato la risposta ma non sa che è stata bloccata: il turno successivo riparte da un contesto costruito dal codice.

**Non è solo sicurezza.** Lo stesso meccanismo fa routing ("è un preventivo, manda al flusso preventivi"), rilevamento lingua, stima della complessità per scegliere il modello più economico. Smistare i ticket di assistenza per argomento è un lavoro da classificatore in questo senso.

**Errore di forma ed errore di contenuto.** Un classificatore non può "allucinare" in senso stretto: non genera testo, quindi non inventa nomi, date o schemi; l'uscita è sempre una delle classi dichiarate. Non è garantito che la classe scelta sia giusta: un ticket classificato "preventivo" a 0.95 che era un reclamo è un errore di contenuto, che nessuna architettura elimina. Per questo conta la calibrazione (confidenza più alta, accuratezza più alta): se regge, su cento casi a 0.92 te ne aspetti otto sbagliati, e lo sai in anticipo. È la proprietà che rende un classificatore usabile in un if, ed è da misurare sui propri dati, non da prendere dal vendor.

## Blocco 3, il campionamento

Dalla softmax esce una distribuzione sul vocabolario. La scelta del token da scrivere è fuori dal modello, la fa il codice, ed è il motivo per cui la stessa domanda dà risposte diverse. Esempio di lavoro, contesto "Il modo migliore per visitare Roma è", solo i cinque token più probabili:

```
a piedi    0.40
in bici    0.25
con guida  0.15
in bus     0.12
di notte   0.08
```

**Greedy.** Prendi sempre il più probabile: "a piedi" a ogni esecuzione. Deterministico ma piatto e ripetitivo; il miglior token a ogni passo non costruisce la frase migliore nel complesso. Quasi mai usato per testo libero.

**Campionamento puro.** Estrai a caso con quelle probabilità: un dado a cento facce, 40 dicono "a piedi", 15 "con guida". Su mille lanci "con guida" esce circa 150 volte. Ogni token esce in proporzione alla sua probabilità, non equiprobabile. Il problema è la coda: 99.995 token con probabilità minuscola ciascuno, ma che insieme pesano il 10 per cento. Una volta su dieci esce un token qualsiasi della coda, imprevedibile, e da lì il contesto lo contiene e il modello prosegue coerente con l'assurdità. Conta la somma della coda, non il singolo.

**Temperatura.** Agisce prima della softmax, sui logit: ogni logit diviso T. Non cambia l'ordine, cambia le distanze. Logit A 4.0, B 3.0, C 2.0: con T=1 esce A 0.67, B 0.24, C 0.09; con T=0.5 (divido per 0.5, raddoppio: 8, 6, 4) esce A 0.87, B 0.12, C 0.02; con T=2 (2, 1.5, 1) esce A 0.51, B 0.31, C 0.19. T piccola allarga le distanze e concentra, T grande le comprime e appiattisce. T verso zero diventa greedy, T molto alta tende a uniforme. Errore tipico: moltiplicare per T invece di dividere. T=0 è quasi deterministico, non del tutto: le GPU sommano in virgola mobile in ordine variabile e due logit quasi pari possono scambiarsi.

**Top-k.** Dopo la softmax: tieni i primi k, azzera il resto, rinormalizza (ogni probabilità divisa per la somma dei sopravvissuti, così tornano a 1 e i rapporti restano uguali). Con k=3 su Roma: 0.40/0.80 = 0.50, 0.25/0.80 = 0.31, 0.15/0.80 = 0.19, coda sparita. Limite: k è fisso ma le distribuzioni no. Dove il modello è sicuro ("Roma" 0.95) k=40 tiene 39 irrilevanti, innocuo; dove è incerto (200 continuazioni sensate intorno a 0.005) k=40 ne taglia 160 legittime.

**Top-p (nucleus).** Tieni i token più probabili finché la somma raggiunge o supera p; il token che fa superare la soglia resta dentro. Con p=0.80 su Roma: 0.40, 0.65, 0.80, tre token. Su "Roma" 0.95: un token. Su 200 continuazioni a 0.005: 160 token. La soglia è in probabilità, non in conteggio, quindi si adatta: stretta dove il modello è sicuro, larga dove è incerto. Top-k conta, top-p pesa.

**In pratica.** Sequenza: temperatura sui logit, poi top-k e top-p sulle probabilità, poi il dado. Le API espongono tutte e tre, di solito se ne tocca una. Valori tipici: temperatura 0.7 e top-p 0.9 per testo libero, temperatura 0 per estrazione strutturata. Alzare la temperatura e stringere top-p insieme si contrastano a vicenda.

## Blocco 4, gli strumenti

Il modello non esegue nulla, scrive. Scrive un testo che il codice riconosce come richiesta di eseguire qualcosa, il codice la esegue e rimette il risultato nel contesto; poi il modello riprende a generare. Lo strumento è un protocollo di testo tra modello e codice.

Il system prompt descrive lo strumento in testo:

```
<|system|>
Hai a disposizione lo strumento cerca_prezzo(hotel, data) che restituisce il prezzo a notte.
Per usarlo scrivi: <|tool_call|> cerca_prezzo(...) <|end_tool_call|>
<|user|>
Quanto costa l'Hotel Hassler il 14 febbraio?
<|assistant|>
```

Il modello genera, token dopo token: `<|tool_call|> cerca_prezzo("Hotel Hassler", "2027-02-14") <|end_tool_call|>`. Il codice vede il token speciale di chiusura e ferma la generazione: non c'è EOS, la risposta è sospesa. Legge il testo tra i delimitatori, esegue davvero la chiamata (una query sul database, una chiamata HTTP al fornitore), ottiene 890 e aggiunge al contesto:

```
<|tool_result|> 890 <|end_tool_result|>
<|assistant|>
```

Richiama il modello con il contesto allungato. Il modello vede domanda, propria chiamata e risultato, e genera "L'Hotel Hassler il 14 febbraio costa 890 euro a notte." seguito da EOS.

**Per il modello non c'è differenza** tra scrivere una risposta e chiamare uno strumento: stesso ciclo, stesso testo. La chiamata esiste perché in addestramento ha imparato che dopo quella descrizione nel system prompt scrivere `<|tool_call|>` è ciò che statisticamente segue.

**Il risultato è testo come un altro.** Il modello non sa che 890 è vero: lo tratta come input, come il messaggio dell'utente. Se lo strumento sbaglia, il modello riporta l'errore con la stessa sicurezza. Se il risultato contiene "ignora le istruzioni precedenti", è la prompt injection del blocco 1 da un'altra porta.

**Gli argomenti sono predetti, non letti.** Dopo `cerca_prezzo("` il token più probabile era "Hotel", poi "Hassler", per via dell'attention sul messaggio utente. L'utente aveva scritto "14 febbraio" senza anno: "2027" l'ha completato il modello, da una data nel contesto o perché era il token più probabile. Se l'inferenza è sbagliata, lo strumento riceve una data sbagliata, restituisce un prezzo vero per una data sbagliata, e il modello lo riporta sicuro. L'errore nasce nel campionamento, non nello strumento. Per questo il codice valida gli argomenti prima di eseguire (schema JSON, controllo sulla data) e nei casi ambigui rimette nel contesto una domanda invece del risultato.

**Costo.** Ogni chiamata a uno strumento è una nuova chiamata al modello con contesto più lungo. Un agente che usa dieci strumenti fa undici passaggi completi del contesto: è qui che il costo degli agenti si moltiplica.

## Il reasoning

Un modello con reasoning, prima della risposta, genera un blocco di testo delimitato da token speciali (`<|think|>` ... `<|end_think|>`) e solo dopo scrive la risposta. Il codice di solito nasconde o riassume quel blocco all'utente. Per il modello è generazione normale: stesso ciclo, stesso campionamento, stesso contesto. Nessun meccanismo nuovo.

```
<|user|> Un gruppo di 23 persone, camere doppie, quante camere servono?
<|assistant|>
<|think|>
23 persone in doppie. 23 / 2 = 11.5. Non posso avere mezza camera,
quindi 12 camere, di cui una con una sola persona.
<|end_think|>
Servono 12 camere: 11 doppie complete e una con un solo ospite.
```

**Perché aiuta.** Ogni token generato diventa una riga nella griglia, e le righe successive lo vedono tramite attention. Quando il modello scrive "23 / 2 = 11.5", il risultato intermedio è nel contesto e il passo dopo può attendere su di esso invece di calcolare tutto in un solo passaggio attraverso gli strati. Il reasoning è il modello che usa il proprio contesto come memoria di lavoro: più token di pensiero, più passaggi di calcolo, perché ogni token è un passaggio completo attraverso tutti gli strati.

**Cosa cambia.** La qualità su problemi a più passi (aritmetica, logica, pianificazione di una chiamata a strumento): il modello li spezza in passi espliciti invece di indovinare in un colpo.

**Cosa non cambia.** Il meccanismo. I token di pensiero costano come gli altri, spesso più della risposta: per questo i modelli con reasoning sono più lenti e più cari. Il ragionamento non è un modulo logico, è testo generato che migliora le predizioni successive perché sta nel contesto.

**Gli errori nel pensiero.** Il modello non verifica il blocco, lo vede come contesto, come il risultato di uno strumento. Se c'è scritto "23 / 2 = 12.5", la risposta tenderà a 13 con la stessa sicurezza. A volte si corregge da solo perché in addestramento ha visto "aspetta, ricontrollo" dopo un errore, ma anche quella è predizione. Le pipeline serie mettono un controllo esterno (codice o un secondo modello) sulle uscite che contano.

**Con gli strumenti.** Il modello pensa, chiama uno strumento, riceve il risultato, pensa sul risultato, risponde. Ogni passo è una chiamata al modello con il contesto che cresce. Un agente con reasoning e strumenti è questo ciclo ripetuto.

**Quanto pensare si regola dal codice.** Pippo-low e pippo-high sono gli stessi pesi. La manopola sta nel codice di inferenza, in due forme che spesso coesistono: un budget di token (il codice conta i token dentro il blocco di pensiero e al limite forza `<|end_think|>` nel contesto, come forza `<|tool_result|>` dopo uno strumento) e un segnale nel contesto che il modello è stato addestrato a rispettare ("effort: low/high", visto milioni di volte, quindi molto più affidabile di una frase libera nel system prompt). `reasoning_effort` e `thinking_budget` nelle API sono questo. Condizione: il modello deve essere stato addestrato a pensare; un modello che non ha mai visto `<|think|>` non produce un pensiero utile, ed è per questo che alcuni vendor distribuiscono davvero due modelli con pesi diversi. Budget troppo basso: il pensiero viene troncato a metà, il modello risponde senza conclusione intermedia su cui fare attention, e la risposta sembra ragionata ma non lo è, senza nessun errore visibile. Budget alto: è un tetto, non un obiettivo; il modello chiude il pensiero quando `<|end_think|>` diventa il token più probabile, e paghi quello che genera. Alcuni modelli pensano troppo anche su domande banali: difetto di addestramento, e il budget serve anche a contenerlo.

## Come interagiscono i pezzi: pseudocodice

Tutto quello che non è `modello(...)` è codice scritto dal vendor o da chi integra.

```
funzione rispondi(system_prompt, storia, strumenti, messaggio, config):

    # Blocco 1: assemblaggio del contesto
    contesto = system_prompt + descrizione(strumenti) + storia
    contesto += "<|user|>" + messaggio
    if config.reasoning_effort:
        contesto += segnale(config.reasoning_effort)

    # Blocco 2: classificatore in ingresso
    flag = classificatore_ingresso(contesto)
    if flag.blocca:  return "Non posso aiutarti con questo"
    if flag.cautela: contesto += "<|system|> tratta con cautela"

    contesto += "<|assistant|>"

    # Ciclo esterno: strumenti e reasoning
    while True:

        # Ciclo interno: generazione token per token (lezione 1 + blocco 3)
        generato = ""
        token_pensiero = 0
        loop:
            logit = modello(tokenizza(contesto + generato))   # l'unica chiamata ai pesi
            probs = softmax(logit / config.temperatura)
            probs = top_k(probs, config.k)
            probs = top_p(probs, config.p)
            token = campiona(probs)
            generato += token

            if in_blocco_think(generato):
                token_pensiero += 1
                if token_pensiero >= config.budget_pensiero:
                    generato += "<|end_think|>"            # il codice forza la chiusura

            if token in {EOS, "<|end_tool_call|>"}: break

        contesto += generato

        # Blocco 4: strumenti
        if generato termina con "<|end_tool_call|>":
            chiamata = estrai(generato)
            if not valida(chiamata.argomenti):
                contesto += "<|tool_result|> errore: argomenti non validi <|end_tool_result|>"
            else:
                risultato = esegui(chiamata)                # DB, HTTP, filesystem
                contesto += "<|tool_result|>" + risultato + "<|end_tool_result|>"
            contesto += "<|assistant|>"
            continue                                       # nuova chiamata al modello, contesto più lungo

        break                                              # era EOS: risposta finita

    # Blocco 2: classificatore in uscita
    risposta = rimuovi_pensiero(generato)
    if classificatore_uscita(risposta).blocca:
        return "Non posso mostrare questa risposta"
    return risposta
```

**Da notare.** Il modello compare in una riga sola, `modello(tokenizza(...))`; tutto il resto è codice. Ci sono due cicli uno dentro l'altro: quello interno aggiunge un token alla volta ed è quello della lezione 1; quello esterno riparte ogni volta che il modello chiama uno strumento, e a ogni giro il contesto è più lungo, il costo degli agenti sta in quel `continue`. Il reasoning non ha un ramo suo: è testo generato nel ciclo interno con un contatore che il codice usa per forzare la chiusura, e il reasoning\_effort è una riga in più nel contesto.

**La conclusione della lezione.** Lo stesso modello dietro codice di inferenza diverso dà prodotti diversi. Chat, API e Claude Code sono gli stessi pesi con system prompt, strumenti, classificatori e budget diversi. Un benchmark "modello X fa 85 per cento" dice poco finché non sai con quale codice intorno: confrontare modelli vuol dire confrontarli a parità di codice, sui propri dati. Quando un agente in produzione sbaglia, il primo sospettato è il contesto che il codice gli ha costruito, non il modello: la correzione è quasi sempre nel codice, e costa meno. I pesi sono una funzione, il prodotto è il programma che la chiama.

## Glossario della lezione 2

**Contesto**: l'unico testo che il modello riceve a ogni chiamata, costruito dal codice mettendo in fila system prompt, storia, strumenti e messaggio nuovo. Ricostruito e rimandato a ogni turno.

**Token speciale**: voce del vocabolario con indice ed embedding propri ma senza testo digitabile (`<|system|>`, `<|user|>`, `<|tool_call|>`, `<|think|>`, EOS). Delimita i ruoli; il modello lo riconosce per averlo visto in addestramento.

**System prompt**: testo che sta prima del resto nel contesto. Influenza statistica, non controllo.

**Prompt injection**: testo che entra nel contesto (dall'utente, da uno strumento, da un documento) e sposta i pesi di attention contro le istruzioni precedenti.

**Classificatore**: modello separato che riceve testo e restituisce probabilità su poche classi, senza generare. Sta nel codice, in ingresso o in uscita; la decisione la prende il codice.

**Errore di forma / di contenuto**: inventare qualcosa che non esiste o viola lo schema / produrre qualcosa di ben formato ma falso. Un classificatore evita il primo per costruzione, nessuna architettura elimina il secondo.

**Calibrazione**: proprietà per cui una confidenza più alta corrisponde a un'accuratezza più alta. Da misurare sui propri dati.

**Greedy**: prendere sempre il token più probabile.

**Campionamento**: estrarre il token a caso in proporzione alla sua probabilità.

**Coda**: i moltissimi token a probabilità minuscola la cui somma non è trascurabile.

**Temperatura**: logit diviso T prima della softmax. Bassa concentra, alta appiattisce. T=0 quasi deterministico.

**Top-k**: tieni i primi k token, azzera il resto, rinormalizza.

**Top-p (nucleus)**: tieni i token più probabili finché la somma raggiunge p, rinormalizza. Si adatta all'incertezza del modello.

**Rinormalizzare**: dividere ogni probabilità sopravvissuta per la loro somma, così tornano a 1 e i rapporti restano uguali.

**Strumento (tool)**: protocollo di testo. Il modello scrive una chiamata tra token speciali, il codice la esegue, il risultato torna nel contesto come testo.

**Reasoning**: token generati prima della risposta, delimitati da token speciali, che restano nel contesto e fanno da memoria di lavoro.

## Domande di verifica della lezione 2

1. Il modello riceve il system prompt e il messaggio utente su canali separati? Come distingue i ruoli?
2. Perché un system prompt con "non rivelare il prezzo di costo" può cedere dopo dieci messaggi insistenti? Descrivilo in termini di righe della griglia e pesi di attention.
3. Un classificatore in uscita blocca una risposta. Chi decide? Chi ha visto la risposta? Cosa sa il modello grande di quel blocco?
4. "Un classificatore non può allucinare": cosa è vero in senso stretto e cosa non è garantito?
5. Distribuzione A 0.50, B 0.30, C 0.20, mille estrazioni con campionamento puro: quante volte C? Aggiungi diecimila token di coda che insieme pesano 0.05: quante estrazioni dalla coda?
6. Logit A 3.0, B 1.0. Distanza con T=0.5 e con T=4. In quale caso B esce più spesso?
7. A 0.50, B 0.30, C 0.15, D 0.05 con k=2: cosa resta e con quali probabilità rinormalizzate?
8. Stessa distribuzione con p=0.75: cosa resta? In una frase, cosa risolve top-p che top-k non risolve?
9. Quando il modello scrive `cerca_prezzo("Hotel Hassler", "2027-02-14")`, da dove viene "2027"? Il modello sa il prezzo mentre scrive la chiamata?
10. Perché scrivere "23 / 2 = 11.5" prima della risposta aiuta il modello? E se il blocco di pensiero contiene un errore?
