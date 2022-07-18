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

//retirer un produit du panier ça marche pas
function remove(item){
    let listProducts = getCart();
    listProducts = listProducts.filter(p => p.id != item.id);
    saveCart(listProducts);
}