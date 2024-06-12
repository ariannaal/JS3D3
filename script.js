// https://striveschool-api.herokuapp.com/books

const fetchBooks = () => {
    // chiamare fetch farà inviare una richiesta HTTP di tipo GET (default) all'indirizzo specificato
    // essendo che fetch contiene una Promise, dobbiamo aspettare che si risolva, positivamente o negativamente
    // tramite il metodo .then(), se si risolve positivamente, otteniamo i dati dentro ad un oggetto Response 
    fetch("https://striveschool-api.herokuapp.com/books")
        // ogni fetch ritorna nel primo step un oggetto response
        .then((response) => {
            console.log(response)
            // la risposta è positiva tramite la lettura della proprietà .ok
            if (response.ok) {
                // se la richiesta va a buon fine possiamo restituire una nuova Promise che è l'operazione svolta dal .json()
                // questo valore di ritorno lo ritroveremo nel parametro del prossimo .then(), in un tempo che può variare
                return response.json()
            } else {
                // per far in modo che il programma salti il prossimo .then() quando la response non è ok, andando a finire nel .catch()
                // dovremo lanciare un errore custom 
            } throw new Error("Errore")
            // questo crea un nuovo oggetto di errore con messaggio "Errore"
            // che leggeremo dalla nostra funzione del .catch()
        })
    
    .then(books => {
    // !!!!!! qui dentro possiamo avere l'assoluta certezza di essere sincronizzati con l'arrivo del dato,
    // perché questo .then() scatterà solo dopo la risoluzione del .json() precedente
    // a questo punto possiamo usare il dato contenuto nel parametro (bookObj)  
    console.log("books", books);
    const row = document.getElementById("card-container");
    // utilizziamo il dato come di consueto, dentro books.data c'è un semplice array che
        books.forEach(book => {
            const col = document.createElement("div")
            col.classList.add("col-lg-3", "col-md-4")
            const card = document.createElement("div")
            card.classList.add("card")

              // creo l'elemento img
        const img = document.createElement("img");
        img.src = book.img;
        img.classList.add("card-image-top");

        //creo l'elemento div per il corpo della card
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        //creo l'elemento h5 per il titolo della card
        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = book.title;

        // creo l'elemento per il prezzo
        const price = document.createElement("div");
        price.classList.add("card-price");
        price.textContent = book.price + "$";
            
        col.appendChild(card);
        row.appendChild(col);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(price);
          

    })

      
        
})
};







        window.addEventListener("DOMContentLoaded", () => {
            // avvio della fetch al caricamento della pagina
            fetchBooks()
        })

