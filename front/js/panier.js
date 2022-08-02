/**@function saveCart */
//sauvegarder localement la liste des produits
function saveCart(listProducts){
    localStorage.setItem('listProducts', JSON.stringify(listProducts));
}

/**@function getCart */
//récupérer le panier
function getCart(){
    let cartStrng = localStorage.getItem('listProducts');
    if(cartStrng == null){
        return [];
    } else {
        return JSON.parse(cartStrng);
    }
}
/**@function saveToCart */
//ajoute un produit au panier 
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
/**@param function btn */
//retirer un produit du panier 
function kill(btn){

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
    }
}

/**@function changeQuantity */
//update le nombre d'articles si la quantité change.
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

    //chercher ce que ça veut dire
    items.forEach((item, index) => {
        if(item.id == id && item.color == color){
            items[index].quantity = parseInt(value);
        }
    });

    //recharger la page pour Update le prix panier
    //window.location.reload();
    
    saveCart(items);
    totalQuantity.textContent = totalCartProducts();
    updateFullCartPrice(products);
}

/**@function pour update le prix panier*/
function updateFullCartPrice(products){
    
    let cart = getCart();
    let total = 0;

    for (let item of cart){

       

        products.forEach((product) => {

            if (product._id == item.id){
                let itemPrice = product.price * item.quantity;
                total += itemPrice;
            }
            
            let totalPrice = document.getElementById('totalPrice');
            totalPrice.innerText = total;
        });
    }
}
/**@function pour appeler le prix d'un produit mais ça marche pas */
function getAPrice(productId){
    let price;
    fetch("http://localhost:3000/api/products/" + productId)
        .then (data => data.json())
        .then (jsonProduct => {
            let product = new Product(jsonProduct);
            price = product.price;
        })
        
        return price;
}