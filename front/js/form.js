// récupérer les inputs d'après leur ID
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let address = document.querySelector('#address');
let city = document.querySelector('#city');
let email = document.querySelector('#email');

//ce regexp peut servir pour les noms et ville
//entre les parenthèses "'" peut être remplacé par "/"
//chercher comment mettre un nb minimum de caractères.
let nameAdressCityReg = new RegExp('[a-zA-Z-\']+');

//regexp pour l'adresse
let addressReg = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);

//regexp pour le mail
let mailReg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;


function check(input, regEx){
    input.addEventListener('change', function(){
        let wordError = 'Ce champ ne peut contenir que des lettres, des apostrophes et des tirets';
        let mailError = 'Ceci n\'est pas une adresse mail correcte'
        let addressError = 'Ceci n\'est pas une adresse correcte'
        //récupérer l'id sous forme de texte
        let msgId = input.id;

        //récupérer la balise <p> correspondant au champ choisi
        let msg = document.getElementById(msgId+ 'ErrorMsg');
        
        //boucle pour afficher les messages
        if(regEx.test(input.value)){
            msg.innerText = 'Okay';
        } else if (regEx == mailReg){
                msg.innerText = mailError;
        } else if (regEx == nameAdressCityReg){
                    msg.innerText = wordError;
        } else {
                    msg.innerText = addressError;
        }
    });
}

check(firstName, nameAdressCityReg);
check(lastName, nameAdressCityReg);
check(address, addressReg);
check(city, nameAdressCityReg);
check(email, mailReg);