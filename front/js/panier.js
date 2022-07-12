//sauvegarder localement la liste des produits
function saveCart(listProducts){
    localStorage.setItem('listProducts', JSON.stringify(listProducts));
}

//récupérer le panier
function getCart(){
    let cartStrng = localStorage.getItem('listProducts');
    if(cartStrng == null){
        return [];
    } else {
        return JSON.parse(cartStrng);
    }
}

//ajoute un produit au panier
function addToCart(item){

    //récupérer le panier
    let listProducts = getCart();

    //vérifier si le produit est déjà dans le panier
    let alreadyInCart = listProducts.find(p => p.id == item.id);
    
    //avec la même couleur
    let colorAlreadyInCart = listProducts.find(p => p.color == item.color);
    if (alreadyInCart != undefined && colorAlreadyInCart != undefined){
        alreadyInCart.quantity = alreadyInCart.quantity + item.quantity;
    }else{
        listProducts.push(item);
    }
    saveCart(listProducts);
}


//prix d'un produit par sa quantité
function itemPrice(product){
    return product.price * product.quantity;
}

//prix total du panier
function cartPrice(){
    let listProducts = getCart();
    let total = 0;
    for (let product of listProducts){
        total += itemPrice(product);
    }
    return total;
}
//retirer un produit du panier
function remove(item){
    let listProducts = getCart();
    listProducts = listProducts.filter(p => p.id != item.id);
    saveCart(listProducts);
}