/** fichier form.js */

//ancien email regexp:
/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i


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


/**fichier panier.js */


/**@function pour update le prix panier mais ça marche pas */
function updateFullCartPrice(){
    
    let cart = getCart();
    for (let product of cart){
        
        let total = 0;
        let quantity = product.quantity;
        
        fetch("http://localhost:3000/api/products/" + product.id)
        .then (data => data.json())
        .then (jsonProduct => {
            product = new Product(jsonProduct);
            let price = product.price;
        });
        total += price * quantity;
        
        let totalPrice = document.getElementById('totalPrice');
        totalPrice.innerText = total;
        
    }
}

/**@function pour update le prix panier mais ça marche pas */
function updateFullCartPrice(products){
    
    let cart = getCart();

    for (let item of cart){
        var itemPrice = 0;
        products.forEach((product) => {

            if (product._id == item.id){
                var total = 0;
                let quantity = item.quantity;
                let price = product.price;
                
                total += price * quantity;
                
            }
            console.log(total);
            let totalPrice = document.getElementById('totalPrice');
            totalPrice.innerText = total;
        });
    }
}


/**fichier script.js */

//récupérer le array des produits

fetch("http://localhost:3000/api/products")
.then (data => data.json())
.then (jsonListProduct => {
    for (let jsonProduct of jsonListProduct){
      let product = new Product(jsonProduct);
      // document.querySelector(".items").innerHTML +=  `<a href="./product.html?_id=${product._id}">
      //                                                   <article>
      //                                                     <img src="${product.imageUrl}" alt="${product.altTxt}">
      //                                                     <h3 class="productName">${product.name}</h3>
      //                                                     <p class="productDescription">"${product.description}"</p>
      //                                                   </article>
      //                                                 </a>`
    }
})
.catch(function(err) {
  // Une erreur est survenue
});