"use strict";
document.addEventListener('DOMContentLoaded', () => {
    let login = document.querySelector('form button');
    login === null || login === void 0 ? void 0 : login.addEventListener('click', logga);
});
let logga = () => {
    let username = document.querySelector('form input');
    let password = document.querySelector('form input[type=password]');
    if (username.value == 'admin' && password.value == 'admin') {
        location.href = 'admin.html';
    }
    else {
        let errore = document.querySelector('form h4');
        if (errore) {
            errore.innerHTML = 'Account Inesistente';
        }
    }
};
