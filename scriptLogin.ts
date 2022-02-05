document.addEventListener('DOMContentLoaded', () => {
    let login = document.querySelector('form button')
    login?.addEventListener('click', logga);
});

let logga = () => {
    let username = <HTMLInputElement>document.querySelector('form input');
    let password = <HTMLInputElement>document.querySelector('form input[type=password]');
    if (username.value == 'admin' && password.value == 'admin') {
        location.href = 'admin.html'
    }else {
        let errore = document.querySelector('form h4');
        if (errore){
            errore.innerHTML = 'Account Inesistente';
        }
    }
}