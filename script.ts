let listaProdotti: Prodotti[] = [];

class Prodotti {
    static count = 1;
    id: number;
    nome: string;
    img: string;
    prezzo: number;
    descrizione: string;

    constructor(nome: string, img: string, prezzo: number, descrizione: string) {
        this.id = Prodotti.count++;
        this.nome = nome;
        this.img = img;
        this.prezzo = prezzo;
        this.descrizione = descrizione;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let localstrg = localStorage.getItem('prodotti');
    if (localstrg) {
        listaProdotti = JSON.parse(localstrg);
    }
    printTable();
    printProduct();

    let addBtn = document.querySelector('#inputIscrizione button');
    addBtn?.addEventListener('click', aggiungi);
    console.log(listaProdotti);
})

//Aggiungi utente [Admin Page]

function aggiungi() {
    let inputId = <HTMLInputElement>document.querySelector('#inputIscrizione input[Type=hidden]');
    let inputNome = <HTMLInputElement>document.querySelector('#inputIscrizione input:nth-child(2)');
    let inputImg = <HTMLInputElement>document.querySelector('#inputIscrizione input:nth-child(3)');
    let inputPrezzo = <HTMLInputElement>document.querySelector('#inputIscrizione input:nth-child(4)');
    let inputDescrizione = <HTMLInputElement>document.querySelector('#inputIscrizione textarea');
    if (!inputId.value) {
        let obj = new Prodotti(inputNome.value, inputImg.value, +inputPrezzo.value, inputDescrizione.value);
        let numeri = /^\d+$/;
        if (inputNome.value == '' || inputImg.value == '' || inputPrezzo.value == '' || inputDescrizione.value == '' || inputNome.value.match(numeri) || inputImg.value.match(numeri) || inputDescrizione.value.match(numeri)) {
            let errore = <Element>document.querySelector('#errore');
            errore.innerHTML = 'Devi compilare tutti i campi e scrivere solo testo!!'
            return;
        }
        listaProdotti.push(obj);
    } else {
        let prodotti = listaProdotti.find(el => el.id === +inputId.value)
        if (prodotti) {
            prodotti.nome = inputNome.value;
            prodotti.img = inputImg.value;
            prodotti.prezzo = +inputPrezzo.value;
            prodotti.descrizione = inputDescrizione.value;
        }

    }
    let errore = <Element>document.querySelector('#errore');
    errore.innerHTML = ''
    localStorage.setItem('prodotti', JSON.stringify(listaProdotti));
    pulisci(inputId, inputNome, inputImg, inputPrezzo, inputDescrizione)
    printTable()
}

//Pulisci campi [Admin Page]

function pulisci(inputId: HTMLInputElement, inputNome: HTMLInputElement, inputImg: HTMLInputElement, inputPrezzo: HTMLInputElement, inputdescrizione: HTMLInputElement) {
    inputId.value = '';
    inputNome.value = '';
    inputImg.value = '';
    inputPrezzo.value = '';
    inputdescrizione.value = '';
}

//Rimuovi button [Admin Page]

let rimuovi = (id: number) => {
    listaProdotti = listaProdotti.filter(el => el.id !== id);
    localStorage.setItem('prodotti', JSON.stringify(listaProdotti));
    printTable()
}

//Modifica button [Admin Page]

let modifica = (id: number) => {
    let prodotti = listaProdotti.find(cerca => cerca.id === id);
    let inputId = <HTMLInputElement>document.querySelector('#inputIscrizione input[Type=hidden]');
    let inputNome = <HTMLInputElement>document.querySelector('#inputIscrizione input:nth-child(2)');
    let inputImg = <HTMLInputElement>document.querySelector('#inputIscrizione input:nth-child(3)');
    let inputPrezzo = <HTMLInputElement>document.querySelector('#inputIscrizione input:nth-child(4)');
    let inputDescrizione = <HTMLInputElement>document.querySelector('#inputIscrizione textarea');
    if (prodotti) {
        inputNome.value = prodotti.nome;
        inputImg.value = prodotti.img;
        inputPrezzo.value = prodotti.prezzo.toString();
        inputDescrizione.value = prodotti.descrizione;
        inputId.value = prodotti.id.toString();
    }

}

//Stampa a video [Admin Page]

let printTable = () => {
    let table = document.querySelector('#tabella');
    if (table) { table.innerHTML = ''; }
    listaProdotti.forEach(input => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${input.id}</td> 
                        <td>${input.nome}</td> 
                        <td>${input.img}</td> 
                        <td>${input.prezzo}</td> 
                        <tr>
                        <td>${input.descrizione}</td>
                        <tr>
                        <button type="button" class="btn btn-sm mx-1 float-end" onclick="rimuovi(${input.id})">
                        <i class="bi bi-trash2-fill"></i>
                        </button>
                        <button type="button" class="btn btn-warning btn-sm mx-1 float-end" onclick="modifica(${input.id})">
                        <i class="bi bi-pencil"></i>
                        </button>`
        table?.appendChild(tr);
    });
}

//Stampa a video cards [Product Page]
let printProduct = () => {
    let prodotti = document.querySelector('#addProducts');
    if (prodotti) {
        listaProdotti.forEach(el => {
            let div = document.createElement('div');
            div.className = 'card cardStyle';
            div.innerHTML = `
            <img class="card-img-top" src="${el.img}" alt="Card image cap"> 
            <div class="card-body">
            <h5 class="card-title text-center">${el.nome}</h5>
            <p class="card-text">${el.descrizione}</p>
            <p>Prezzo: <span class="text-success">${el.prezzo}</span></p>
            <a onclick="aggiungiAlCarrello(${el.id})" class="btn btn-primary">Aggiungi al carrello <i class="bi bi-cart-plus"></i></a>
            </div>`
            prodotti?.appendChild(div);
        });
    }
}

//Aggiungi prodotto al carrello [Product Page]
let aggiungiAlCarrello = (id: number) => {
    let cerca2 = listaProdotti.find(cerca2 => cerca2.id === id);
    if (cerca2) {
        let obj = new Carrello(cerca2.nome, cerca2.prezzo)
        arrCarrello.push(obj);
    }
    localStorage.setItem('carrello', JSON.stringify(arrCarrello));
}