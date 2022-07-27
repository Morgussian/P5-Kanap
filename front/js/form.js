//'use strict'; Non, ça invalide le bouton submit

/**@class User */
// construire une class user avec les inputs du formulaire
class User {
    constructor(firstName, lastName, email, address, city) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.address = address
        this.city = city
    }
}

var user = new User();

//le formulaire élément
const form = document.querySelector('form');

//l'ensemble des messages <p>
let fields = document.querySelectorAll('.cart__order__form__question p');

//le bouton commander!
let orderBtn = document.querySelector('.cart__order__form__submit #order');

/**@regexp trois regex */

//ce regexp peut servir pour les noms et la ville
//entre les parenthèses "'" peut être remplacé par "/"?
//chercher comment mettre un nb minimum de caractères.
const nameCityReg = new RegExp('[a-z-\']+' , 'i');

//regexp pour l'adresse
const addressReg = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);

//regexp pour le mail
const mailReg = new RegExp (/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);

//redirection vers la page confirmation.
function RedirectionJavascript(id){
    document.location.href=`../html/confirmation.html?orderId=${id}`
}



/**@addEventListener */
//methode post envoyer user et panier et récupérer orderId
form.addEventListener('submit', async function(e){
    e.preventDefault()
    user = this.user
    let response = await fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            contact: user,
            products: getCart().map(function(product){ 
                return product.id;
            })
        })
    })

    //récupérer un orderId en réponse
    //pas la peine de refaire un fetch:
    //let fetchOrderId = fetch('http://localhost:3000/api/products/order')
    .then(function(response){

    return response.json()

    }).then(function(data){

        orderId = data.orderId;
       
        RedirectionJavascript(orderId);
  });   
});

//'blur' sur un évènement c'est quand le focus se met sur un autre élément...
//pas besoin de parenthèses???WTF
form.firstName.addEventListener('blur', checkFirstName);
form.lastName.addEventListener('blur', checkLastName);
form.city.addEventListener('blur', checkCity);
form.address.addEventListener('blur', checkAddress);
form.email.addEventListener('blur', checkEmail);

//valider le prénom
/**@function checkFirstName */
function checkFirstName(){
    const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    firstNameErrorMsg.innerText = '';
        
    if(!nameCityReg.test(form.firstName.value)) {
        firstNameErrorMsg.innerText = 'Champ invalide';
    }
}

//valider le nom
/**@function checkLastName */
function checkLastName(){
    const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    lastNameErrorMsg.innerText = '';
        
    if(!nameCityReg.test(form.lastName.value)) {
        lastNameErrorMsg.innerText = 'Champ invalide';
    }
}

//valider la ville
/**@function checkCity */
function checkCity(){
    const cityErrorMsg = document.getElementById('cityErrorMsg');
    cityErrorMsg.innerText = '';
        
    if(!nameCityReg.test(form.city.value)) {
        cityErrorMsg.innerText = 'Champ invalide';
    }
}

//valider l'adresse
/**@function checkAddress */
function checkAddress(){
    const addressErrorMsg = document.getElementById('addressErrorMsg');
    addressErrorMsg.innerText = '';
        
    if(!addressReg.test(form.address.value)) {
        addressErrorMsg.innerText = 'Champ invalide';
    }
}

//valider l'email
/**@function checkEmail */
function checkEmail(){
    const emailErrorMsg = document.getElementById('emailErrorMsg');
    emailErrorMsg.innerText = '';
        
    if(!mailReg.test(form.email.value)) {
        emailErrorMsg.innerText = 'Champ invalide';
    }
}

//on met à jour le user à chaque changement sur le formulaire.
form.addEventListener('change', function() {
    this.user = new User(
        form.firstName.value,
        form.lastName.value,
        form.email.value,
        form.address.value,
        form.city.value,
    )
})


function validAllFields() {
    if(checkFirstName() && checkLastName() && checkCity() && checkAddress() && checkEmail()){
        return true;
    }else{
        return false;
    }
}
