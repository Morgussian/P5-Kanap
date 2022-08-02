
//var totalPrice = 0;


//appel de tous les produits dans l'API. product = objet de l'API
fetch("http://localhost:3000/api/products")
.then (data => data.json())
.then ( products => {

    //première mise à jour du prix panier
    updateFullCartPrice(products);

    //appel du panier. item = objet du panier
    getCart().forEach(item => {

        
        products.forEach((product) => {
            if (product._id == item.id){
                
                
                
                // DOM
                
                //récupération des éléments "item.X" provenant du panier: couleur, quantité

                //article
                let article = document.createElement('article');
                article.setAttribute('class', 'cart__item');
                article.setAttribute('data-id', item.id);
                article.setAttribute('data-color', item.color);

                //Quantité dans l'input
                let input = document.createElement('input');
                
                input.setAttribute('type', 'number');
                input.setAttribute('class', 'itemQuantity');
                input.setAttribute('name', 'itemQuantity');
                input.setAttribute('min', '1');
                input.setAttribute('max', '100');
                input.setAttribute('value', item.quantity);

                //calcul prix total
                //totalPrice += product.price * item.quantity;
                
                //updater la quantité.
                //surtout pas de parenthèses à la fonction ça casse tout.
                input.addEventListener('change', function(e) {
                    changeQuantity(e, products); 
                });

                //couleur choisie
                let color = document.createElement('p');
                color.textContent += item.color;
                               

                ////récupération des éléments "product.X" provenant du localStorage: imageUrl, name, altTxt, price
                
                //container de la photo
                let imgContainer = document.createElement('div');
                imgContainer.setAttribute('class', 'cart__item__img');
                
                //photo
                let img = document.createElement('img');
                img.setAttribute('src', product.imageUrl);
                img.setAttribute('alt', product.altTxt);
                
                //ajouter au container
                imgContainer.appendChild(img);
                
                let name = document.createElement('h2');
                name.textContent += product.name;
                
                let price = document.createElement('p');
                price.textContent = product.price + ' \u20AC';
                
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

                descriptionContainer.appendChild(name);
                descriptionContainer.appendChild(color);
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
                number.textContent = 'Qté : '

                quantity.appendChild(number);
                quantity.appendChild(input);

                //mettre quantity dans réglages
                settings.appendChild(quantity);
                
                //suppression de l'item
                let suppression = document.createElement('div');
                suppression.setAttribute('class', 'cart__item__content__settings__delete');

                let deleteButton = document.createElement('p');
                deleteButton.textContent = 'Supprimer';
                deleteButton.setAttribute('class', 'deleteItem');
                
                //ecouter le btn
                deleteButton.addEventListener('click', function(){
                kill(deleteButton);
                });

                //insérer le bouton dans son container
                suppression.appendChild(deleteButton);

                //mettre suppression dans réglages
                settings.appendChild(suppression);

                //insérer l'article généré dans la section cart_items
                let cartItems = document.getElementById('cart__items');
                cartItems.appendChild(article);

                
            }
        });

    });

    

})

.catch(function(err) {
  // Une erreur est survenue
});



// /**@function insertToCart */
// //créér des éléments dans le DOM comme ce qui est commenté dans cart.html
// function insertToCart(){
//     let cart = getCart();

//     //prix total du panier
//     let fullCartPrice = 0;
     
//     for (let product of cart){
        
        

        
//         //récupération des éléments "product.X" provenant du localStorage: imageUrl, name, altTxt, price
//         fetch("http://localhost:3000/api/products/" + product.id)
//         .then (data => data.json())
//         .then (jsonProduct => {
//             product = new Product(jsonProduct);

            
//         });
        
//     }
// }



//insertToCart();


/**@function totalCartProducts */
//quantité d'articles dans le panier mais pas si on modifie les inputs dans la page cart.html
function totalCartProducts(){
    let cart = getCart();
    let total = 0;
    for(let product of cart){
        total += product.quantity;
    }
    return total;
}

       
let totalQuantity = document.getElementById('totalQuantity');
totalQuantity.textContent = totalCartProducts();





