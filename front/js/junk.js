/** fichier form.js */

/**@function check */
//validation de tous les champs pour le user 
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
        if(regEx.test(input.value)) {
            msg.innerText = successMsg;
            msg.style.color = 'limeGreen';
            return true;
        } else if (regEx == mailReg) {
            msg.innerText = mailError;
            return false;
        } else if (regEx == nameCityReg) {
            msg.innerText = wordError;
            return false;
        } else {
            msg.innerText = addressError;
            return false;
        }
    });
}

//appelle la fonction check sur chaque champ
function addRegexListenerToFormInputs() {
    check(form.firstName, nameCityReg);
    check(form.lastName, nameCityReg);
    check(form.address, addressReg);
    check(form.city, nameCityReg);
    check(form.email, mailReg);
}
addRegexListenerToFormInputs()
