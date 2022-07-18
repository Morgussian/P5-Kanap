// vérification prénom
let firstName = document.querySelector('#firstName');

//ce regexp peut servir pour les noms, adresses et villes
let nameAdressCityReg = new RegExp('^[a-zA-Z-]+$');

//vérifier un champ hors email
function fieldCheck(input){
    let msg = document.querySelector('form p');
    if(!nameAdressCityReg.test(input)) 
        msg.innerText = 'Ce champ ne peut contenir que des lettres et des tirets';
    
}

// appel de la fonction sur le prénom ça marche pas
firstName.addEventListener('Change', function(){
    fieldCheck(this);
    
});
