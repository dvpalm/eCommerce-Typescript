"use strict";
let arrCarrello = [];
class Carrello {
    constructor(nome, prezzo) {
        this.id = Carrello.count++;
        this.nome = nome;
        this.prezzo = prezzo;
    }
}
Carrello.count = 1;
document.addEventListener('DOMContentLoaded', () => {
    let localstrg2 = localStorage.getItem('carrello');
    if (localstrg2) {
        arrCarrello = JSON.parse(localstrg2);
    }
    printCarrello();
    let itemCount = arrCarrello.length;
    let itemCountNav = document.querySelector('#itemCountNav');
    if (itemCountNav) {
        if (itemCount == 0) {
            itemCountNav.innerHTML = '';
        }
        else {
            itemCountNav.innerHTML = ' ' + itemCount;
        }
    }
});
//Rimuovi dal carrello
let rimuoviCarrello = (id) => {
    // console.log(arrCarrello)
    arrCarrello = arrCarrello.filter(item => item.id !== id);
    localStorage.setItem('carrello', JSON.stringify(arrCarrello));
    printCarrello();
};
//Stampa a video carrello
let printCarrello = () => {
    let mioCarrello = document.querySelector('#mioCarrello');
    if (mioCarrello) {
        mioCarrello.innerHTML = '';
    }
    arrCarrello.forEach(el => {
        let li = document.createElement('li');
        li.className = ('list-group-item list-group-item-success');
        li.innerHTML = `${el.nome}
                            <span style="" class="text-primary">${el.prezzo}€</span>
                            <button type="button" class="btn btn-sm mx-1 float-end" onclick="rimuoviCarrello(${el.id})">
                            <i class="bi bi-trash2-fill"></i>
                            </button>`;
        mioCarrello === null || mioCarrello === void 0 ? void 0 : mioCarrello.appendChild(li);
    });
    itemCount();
    totalCount();
};
//Conteggio item nel carrello
let itemCount = () => {
    let itemCount = arrCarrello.length;
    let itemCountHtml = document.querySelector('#itemCount');
    let itemCountNav = document.querySelector('#itemCountNav');
    if (itemCountHtml && itemCountNav) {
        itemCountHtml.innerHTML = 'Oggetti:' + ' ' + itemCount;
        if (itemCount == 0) {
            itemCountNav.innerHTML = '';
        }
        else {
            itemCountNav.innerHTML = ' ' + itemCount;
        }
    }
};
// Prezzo totale + spedizione extra
function spedizione() {
    let totalCount = document.querySelector('#totalCount');
    let express = document.querySelector('#express');
    if (totalCount && arrCarrello.length != 0) {
        if (express.selected && arrCarrello.length != 0) {
            let somma = arrCarrello.map(item => +item.prezzo).reduce((prev, curr) => prev + curr, 5);
            totalCount.innerHTML = somma.toString();
        }
        else {
            let somma = arrCarrello.map(item => +item.prezzo).reduce((prev, curr) => prev + curr);
            totalCount.innerHTML = somma.toString();
        }
    }
}
// Prezzo totale da pagare
let totalCount = () => {
    let totalCount = document.querySelector('#totalCount');
    if (totalCount) {
        if (arrCarrello.length != 0) {
            let somma = arrCarrello.map(item => +item.prezzo).reduce((prev, curr) => prev + curr);
            totalCount.innerHTML = somma.toString();
        }
        else {
            totalCount.innerHTML = '';
        }
    }
};
// Btn compra
let compra = () => {
    localStorage.removeItem("carrello");
    let mioCarrello = document.querySelector('#mioCarrello');
    let itemCountHtml = document.querySelector('#itemCount');
    let itemCountNav = document.querySelector('#itemCountNav');
    let totalCount = document.querySelector('#totalCount');
    if (mioCarrello && itemCountHtml && itemCountNav && totalCount) {
        mioCarrello.innerHTML = '';
        itemCountHtml.innerHTML = '';
        itemCountNav.innerHTML = '';
        totalCount.innerHTML = '';
    }
};
