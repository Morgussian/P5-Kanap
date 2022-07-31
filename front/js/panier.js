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
//si la quantité change mais ça marche pas
function changeQuantity(e){

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
    updateFullCartPrice()
}

function updateFullCartPrice(){
    
    let cart = getCart();
    for (let product of cart){
        
        let total = 0;
        let quantity = product.quantity;
        
        fetch("http://localhost:3000/api/products/" + product.id)
        .then (data => data.json())
        .then (jsonProduct => {
            product = new Product(jsonProduct);
            console.log(product.at(5)); 
            let price = product.price;
            
        });

            
            total += price * quantity;
            
            let totalPrice = document.getElementById('totalPrice');
            totalPrice.innerText = total;
        
    }
}

function getAPrice(productId){
    let price;
    fetch("http://localhost:3000/api/products/" + productId)
        .then (data => data.json())
        .then (jsonProduct => {
            product = new Product(jsonProduct);
            price = product.price;
        })
        
        return price;
}