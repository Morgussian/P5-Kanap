// vérification prénom
let firstName = document.querySelector('#firstName');

//ce regexp peut servir pour les noms, adresses et villes
let nameAdressCityReg = new RegExp('[a-zA-Z-]+');

//vérifier un champ (hors email) ça marche pas
function fieldCheck(input){
    let msg = document.getElementById('firstNameErrorMsg');
    if(nameAdressCityReg.test(input)){
        msg.innerText = 'okay';
    }else{
        msg.innerText = 'Ce champ ne peut contenir que des lettres et des tirets';
    }
    
}

// appel de la fonction sur le prénom ça marche pas
firstName.addEventListener('change', function(){
    fieldCheck(firstName);
    
});
