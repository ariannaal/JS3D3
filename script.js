// https://striveschool-api.herokuapp.com/books

window.addEventListener("DOMContentLoaded", () => {
// avvio della fetch al caricamento della pagina
    fetchBooks()
})

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
            col.classList.add("col-lg-3", "col-md-4", "col-sm-6")
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
        title.classList.add("card-title")
        title.textContent = book.title;

        // creo l'elemento per il prezzo
        const price = document.createElement("div");
        price.classList.add("card-price");
        price.textContent = book.price + "$";
        
        //creo l'elemento per il bottone
        const buttonScarta = document.createElement("button");
        buttonScarta.classList.add("btn", "btn-danger");
        buttonScarta.textContent = "Scarta";
        buttonScarta.addEventListener('click', () => {
                    card.remove();
        });
            
     // creo il bottone per il carrello
            const cartButton = document.createElement("button");
            cartButton.classList.add("btn", "btn-primary", "mt-1");
            cartButton.textContent = "Compra ora";
            cartButton.addEventListener("click", () => {
            addToCart(book);
            });
            
            
        col.appendChild(card);
        row.appendChild(col);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(buttonScarta);
         cardBody.appendChild(cartButton);  

    })

     
})
};

//dichiara una funzione chiamata addToCart che prende un parametro book, che rappresenta il libro da aggiungere al carrello.
const addToCart = (book) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    cart.push(book);
    localStorage.setItem("cart", JSON.stringify(cart)); // aggiorna l'array del carrello nello storage locale
    showCart();
};

//questa funzione recupera il contenuto del carrello dallo storage locale, lo mostra nell'interfaccia utente sotto forma di ul, e per ogni elemento nel carrello, mostra il titolo dell'elemento come elemento della lista
const showCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const cartList = document.getElementById("carrello");
    cartList.innerHTML = "";
    cartItems.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.title;
        li.classList.add("list-group-item");
        cartList.appendChild(li);

    });
};


