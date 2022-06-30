

function addProducts(id, price, quantity){
    let listProducts = getProduct();
    listProducts.push[id, price, quantity];
    saveProducts(listProducts);
}
//récupérer les caractéristiques du produit validé sur la page product
function getProduct(){
    let productStrng = localStorage.getItem('usrChoice');
    if(productStrng == null){
        return [];
    } else {
        return (JSON.parse(productStrng));
    }
}
//sauvegarder localement la liste des produits
function saveProducts(listProducts){
    localStorage.setItem(listProducts, JSON.stringify(listProducts));
}
console.log(getProduct());



//créér des éléments dans le DOM comme ce qui est commenté dans cart.html

//article
let article = document.createElement('article');
article.setAttribute('class', 'cart__item');
article.setAttribute('data-id', '${product._id}');
article.setAttribute('data-color', '${product.color}');

//container de la photo
let imgContainer = document.createElement('div');
imgContainer.setAttribute('class', 'cart__item__img');

//ajouter à article
article.appendChild(imgContainer);

//container des infos
let dataContainer = document.createElement('div');
dataContainer.setAttribute('class', 'cart__item__content');

//ajouter à article
article.appendChild(dataContainer);

//description: nom, couleur, prix
let descriptionContainer = document.createElement('div');
descriptionContainer.setAttribute('class', 'cart__item__content__description');

let name = document.createElement('h2');
let color = document.createElement('p');
//afficher la couleur
color.textContent = getProduct().color;
let price = document.createElement('p');
//afficher le prix ça marche pas
price.textContent = getProduct().price;

descriptionContainer.appendChild(name);
descriptionContainer.appendChild(color,);
descriptionContainer.appendChild(price);

//ajouter à dataContainer
dataContainer.appendChild(descriptionContainer);

//container des réglages
let settings = document.createElement('div');
settings.setAttribute('class', 'cart__item__content__settings');

//ajouter à dataContainer
dataContainer.appendChild(settings);

//réglage quantité
let quantity = document.createElement('div');
quantity.setAttribute('class', 'cart__item__content__settings__quantity');

let number = document.createElement('p');
let input = document.createElement('input');
input.setAttribute('type', 'number');
input.setAttribute('class', 'itemQuantity');
input.setAttribute('name', 'itemQuantity');
input.setAttribute('min', '1');
input.setAttribute('max', '100');
input.setAttribute('value', '${quantity}');

quantity.appendChild(number);
quantity.appendChild(input);

//mettre quantity dans réglages
settings.appendChild(quantity);

//suppression de l'item
let suppression = document.createElement('div');
suppression.setAttribute('class', 'cart__item__content__settings__delete');

let deleteButton = document.createElement('p');
deleteButton.setAttribute('class', 'deleteItem');

//insérer le bouton dans son container
suppression.appendChild(deleteButton);

//mettre suppression dans réglages
settings.appendChild(suppression);

//pour voir apparaître l'article généré mais ça marche pas
let cartItems = document.getElementById('cart__items');
cartItems.appendChild(article);

