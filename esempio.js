// https://api.disneyapi.dev/character

        const fetchCaracters = () => {

            // chiamare fetch farà inviare una richiesta HTTP di tipo GET (default) all'indirizzo specificato

            // come leggo il valore di ritorno della fetch?
            // essendo che fetch contiene una Promise, dobbiamo aspettare che si risolva, positivamente o negativamente
            // tramite il metodo .then(), se si risolve positivamente, otteniamo i dati dentro ad un oggetto Response 
            fetch("https://api.disneyapi.dev/character")
                // ogni fetch ritorna nel primo step un oggetto response
                .then((responseObj) => {
                    console.log("RESPONSE OBJECT", responseObj)
                    // controlliamo che la risposta sia positiva tramite la lettura della proprietà .ok
                    if (responseObj.ok) {
                        // se la richiesta va a buon fine possiamo restituire una nuova Promise che è l'operazione svolta dal .json()
                        // questo valore di ritorno lo ritroveremo nel parametro del prossimo .then(), in un tempo che può variare
                        return responseObj.json()
                    } else {
                        // per far in modo che il programma salti il prossimo .then() quando la response non è ok, andando a finire nel .catch()
                        // dovremo lanciare un errore custom
                        throw new Error("Errore nel reperimento dei dati")
                        // questo crea un nuovo oggetto di errore con messaggio "Errore nel reperimento dei dati"
                        // che leggeremo dalla nostra funzione del .catch()
                    }
                })
                .then(disneyObj => {
                    // qui dentro possiamo avere l'assoluta certezza di essere sincronizzati con l'arrivo del dato, 
                    // perché questo .then() scatterà solo dopo la risoluzione del .json() precedente

                    // a questo punto possiamo usare il dato contenuto nel parametro (in questo caso chiamato disneyObj) come ci pare!
                    // es. DOM MANIPULATION!

                    console.log("disneyObj", disneyObj)
                    // qui dentro avremo sicuramente ricevuto il dato, e lo possiamo usare come abbiamo sempre fatto

                    const row = document.getElementById("card-container")
                    // utilizziamo il dato come di consueto, dentro dicneyObj.data c'è un semplice array che
                    //  possiamo ciclare per generare elementi nel DOM
                    disneyObj.data.forEach(char => {
                        const col = document.createElement("div")
                        col.classList.add("col")
                        const card = document.createElement("div")
                        card.classList.add("card")

                        card.innerHTML = `
                        <img src=${char.imageUrl} class="card-img-top" alt=${char.name}>
                        <div class="card-body">
                            <h5 class="card-title">${char.name}</h5>
                            
                            <a href=${char.sourceUrl} class="btn btn-primary">Go to ${char.name}</a>
                        </div>
                        `

                        col.appendChild(card)
                        row.appendChild(col)
                    })
                })
                .catch((err) => console.log(err))

        }

        window.addEventListener("DOMContentLoaded", () => {

            // avvio della fetch al caricamento della pagina
            fetchCaracters()
        })
