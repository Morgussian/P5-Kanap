/**
* Ce fichier fait partie du projet KANAP.
*
* Il gère le stockage et la mise à jour du panier en fonction de la page cart.html.
*
* l'utilisateur peut changer la quantité de chaque produit.
*
* @copyright 2022 Morgussian
*/

 /**
* Sauvegarde une liste de produits dans localStorage.
*
* @param listProducts 
*
*/
function saveCart(listProducts){
    localStorage.setItem('listProducts', JSON.stringify(listProducts));
}

 /**
* récupère le panier de localStorage
*
* @return un array vide si panier vide
* @return un array
*
*/
function getCart(){
    let cartStrng = localStorage.getItem('listProducts');
    if(cartStrng == null){
        return [];
    } else {
        return JSON.parse(cartStrng);
    }
}

 /**
* Ajoute un produit au panier.
*
* @param item un produit
* @function saveCart
*
*/ 
function addToCart(item){

    //récupérer le panier
    let listProducts = getCart();

    //vérifier si le produit est déjà dans le panier avec la même couleur
    let colorAlreadyInCart = listProducts.find(p => p.id == item.id && p.color === item.color);

    if (colorAlreadyInCart != undefined){
        colorAlreadyInCart.quantity += item.quantity;
    }else{
        listProducts.push(item);
    }
    saveCart(listProducts);
}

 /**
* retire un produit du panier.
*
* @param btn Bouton "supprimer"
* @param products le contenu du panier
*
* @function updateFullCartPrice
*
*/
function kill(btn, products){

    //confirm affiche un popup avec ok ou annuler
    if( confirm ('Ce produit sera supprimé du panier')){
        let article = btn.closest('.cart__item');
        let id = article.dataset.id;
        let color = article.dataset.color;

        let items = getCart();

        items.forEach((item, index) => {
            if (item.id == id && item.color == color){
                //retire 1 item du array à l'index spécifié.
                items.splice(index, 1);
            }
        });
        //stocker nouveau array
        saveCart(items);

        //retirer l'article du DOM
        article.remove();
        
        //rectifier la quantité totale affichée
        totalQuantity.textContent = totalCartProducts();
        updateFullCartPrice(products);
    }
}

 /**
* Actualise la quantité d'un produit sur la page cart.html
*
* @param e evénement
* @param products le contenu du panier
*
* @function saveCart 
*
* @function updateFullCartPrice
*
*/
function changeQuantity(e, products){

    //renvoie l'élément HTML (on vise ici <input>)
    let input = e.target;
    let value = input.value;
    
    //déclarer l'article correspondant à l'input visé
    let article = input.closest('.cart__item');
    let id = article.dataset.id;
    let color = article.dataset.color;

    //pour mettre à jour le localStorage?
    let items = getCart();

    //actualise la quantité d'un article dans le panier en cherchant par ID et couleur
    items.forEach((item, index) => {
        if(item.id == id && item.color == color){
            items[index].quantity = parseInt(value);
        }
    });

    saveCart(items);
    totalQuantity.textContent = totalCartProducts();
    updateFullCartPrice(products);
}

 /**
* Actualise le prix total
*
* @param products le contenu du panier
*
*/
function updateFullCartPrice(products){

    let totalPrice = document.getElementById('totalPrice');
    let cart = getCart();
    
    let total = 0;
    
    if(cart !== []){
        for (let item of cart){
            products.forEach((product) => {
                if (product._id == item.id){
                    total += product.price * item.quantity;
                }
            });
        }
    }
    totalPrice.innerText = total;
}
