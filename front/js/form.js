//récupérer l'élément formulaire
let form = document.querySelector('form');
form.method = 'post';

// récupérer les inputs d'après leur attribut name
let firstName = form.firstName;
let lastName = form.lastName;
let address = form.address;
let city = form.city;
let email = form.email;

//l'ensemble des messages <p>
let fields = document.querySelectorAll('.cart__order__form__question p');

//le bouton commander!
let orderBtn = document.querySelector('.cart__order__form__submit #order');


//ce regexp peut servir pour les noms et la ville
//entre les parenthèses "'" peut être remplacé par "/"?
//chercher comment mettre un nb minimum de caractères.
let nameCityReg = new RegExp('[a-zA-Z-\']+');

//regexp pour l'adresse
let addressReg = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);

//regexp pour le mail
let mailReg = new RegExp (/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);

//objet user
let user = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value
}

//methode post envoyer user et panier
orderBtn.addEventListener('submit', async function(e){
    
    
    let cart = getCart();
    let response = await fetch('http://localhost:3000/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user), 
    body: JSON.stringify(cart)
    });

    //ajouter un lien vers la page confirmation ça marche pas.
    orderBtn.setAttribute('href', '../html/confirmation.html');
    let result = await response.json();
    alert(result.message);
});

//validation des champs pour le user 
function check(input, regEx){
    input.addEventListener('change', function(){
        let wordError = 'Ce champ ne peut contenir que des lettres, des apostrophes et des tirets';
        let mailError = 'Ceci n\'est pas une adresse mail correcte';
        let addressError = 'Ceci n\'est pas une adresse correcte';
        let successMsg = 'Okay';

        //récupérer l'id sous forme de texte
        let msgId = input.id;
        
        //récupérer la balise <p> correspondant au champ choisi
        let msg = input.nextElementSibling//document.getElementById(msgId+ 'ErrorMsg');
        
        //boucle pour afficher les messages
        if(regEx.test(input.value)){
            msg.innerText = successMsg;
            msg.style.color = 'limeGreen';
            return true;
        } else if (regEx == mailReg){
                msg.innerText = mailError;
                return false;
        } else if (regEx == nameCityReg){
                    msg.innerText = wordError;
                    return false;
        } else {
                    msg.innerText = addressError;
                    return false;
        }
    });
}

check(firstName, nameCityReg);
check(lastName, nameCityReg);
check(address, addressReg);
check(city, nameCityReg);
check(email, mailReg);

function validAllFields() {
    if(check(firstName, nameCityReg) && check(lastName, nameCityReg) && check(address, addressReg) && check(city, nameCityReg) && check(email, mailReg) == true){
    return true;
}else{
    return false;
}
}
