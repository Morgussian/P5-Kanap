/**
* Ce fichier fait partie du projet KANAP.
*
* Il gère le formulaire
*
* l'utilisateur peut remplir les champs et valider sa commande
*
* @copyright 2022 Morgussian
*/

/**
* La classe user permet de construire un objet contact.
*
*/
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
const mailReg = new RegExp (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);

 /**
* dirige l'utilisateur vers la page confirmation.html
*
* @param id un numéro de commande
*
*/
function RedirectionJavascript(id){
    document.location.href=`../html/confirmation.html?orderId=${id}`
}



/**@addEventListener */
//methode post: envoyer user et panier et récupérer orderId
form.addEventListener('submit', async function(e){
    e.preventDefault()
    user = this.user
    
    //Si aucun produit dans le panier:
    if (totalQuantity.textContent == 0){
        alert ('Votre panier est vide.');
    }else{
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
    .then(function(response){

    return response.json()

    }).then(function(data){
        if(validAllFields()){
            orderId = data.orderId;
            RedirectionJavascript(orderId);
        }else{
            alert('Tous les champs n\'ont pas été correctement saisis'); 
        }
  });
}
});

//'blur' sur un évènement c'est quand le focus se met sur un autre élément...
//pas besoin de parenthèses sur les fonctions???WTF
form.firstName.addEventListener('blur', checkFirstName);
form.lastName.addEventListener('blur', checkLastName);
form.city.addEventListener('blur', checkCity);
form.address.addEventListener('blur', checkAddress);
form.email.addEventListener('blur', checkEmail);

 /**
* valide le prénom par un message d'erreur vide
*
*
*/
function checkFirstName(){
    const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    firstNameErrorMsg.innerText = '';
    
    if(!nameCityReg.test(form.firstName.value)) {
        firstNameErrorMsg.innerText = 'Champ invalide';
    }
}

 /**
* valide le nom par un message d'erreur vide
*
*
*/
function checkLastName(){
    const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    lastNameErrorMsg.innerText = '';
       
    if(!nameCityReg.test(form.lastName.value)) {
        lastNameErrorMsg.innerText = 'Champ invalide';
    }
}

 /**
* valide la ville par un message d'erreur vide
*
*
*/
function checkCity(){
    const cityErrorMsg = document.getElementById('cityErrorMsg');
    cityErrorMsg.innerText = '';
       
    if(!nameCityReg.test(form.city.value)) {
        cityErrorMsg.innerText = 'Champ invalide';
    }
}

 /**
* valide l'adresse par un message d'erreur vide
*
*
*/
function checkAddress(){
    const addressErrorMsg = document.getElementById('addressErrorMsg');
    addressErrorMsg.innerText = '';
      
    if(!addressReg.test(form.address.value)) {
        addressErrorMsg.innerText = 'Champ invalide';
    }
}

 /**
* valide l'email par un message d'erreur vide
*
*
*/
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

/**
* Valide le formulaire
*
* @return boolean
*
*/
function validAllFields() {
    if(firstNameErrorMsg.innerText == '' && lastNameErrorMsg.innerText == '' && cityErrorMsg.innerText == '' && addressErrorMsg.innerText == '' && emailErrorMsg.innerText == ''){
        return true;
    }else{
        return false;
    }
}

