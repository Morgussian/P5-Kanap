

/**@function insertToCart */
//créér des éléments dans le DOM comme ce qui est commenté dans cart.html
function insertToCart(){
    let cart = getCart();

    //prix total du panier
    let fullCartPrice = 0;
     
    for (let product of cart){
        
        //récupération des éléments "product.X" provenant du panier: couleur, quantité

        //article
        let article = document.createElement('article');
        article.setAttribute('class', 'cart__item');
        article.setAttribute('data-id', product.id);
        article.setAttribute('data-color', product.color);

        

        //Quantité dans l'input
        let input = document.createElement('input');
        
        input.setAttribute('type', 'number');
        input.setAttribute('class', 'itemQuantity');
        input.setAttribute('name', 'itemQuantity');
        input.setAttribute('min', '1');
        input.setAttribute('max', '100');
        input.setAttribute('value', product.quantity);

        //surtout pas de parenthèses à la fonction ça casse tout. de toutes façons ça marche pas
        input.addEventListener('change', changeQuantity);

        //couleur choisie
        let color = document.createElement('p');
        color.textContent += product.color;

        
        //récupération des éléments "product.X" provenant du localStorage: imageUrl, name, altTxt, price
        fetch("http://localhost:3000/api/products/" + product.id)
        .then (data => data.json())
        .then (jsonProduct => {
            product = new Product(jsonProduct);

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

            //mettre le produit quantité par prix mais il refuse de sortir la valeur
            fullCartPrice += input.value * product.price;
            console.log(fullCartPrice);
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

        });
        //insérer l'article généré dans la section cart_items
        let cartItems = document.getElementById('cart__items');
        cartItems.appendChild(article);
        
        //insérer le prix total mais ça marche pas
        let totalPrice = document.getElementById('totalPrice');
        //il refuse de mettre autre chose que zero alors que la valeur est bonne.
        totalPrice.innerText = fullCartPrice;
    }
    
    
}



insertToCart();


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

/**@function produit */
function priceByQuantity(num1, num2){
    return num1 * num2;
}
        
/**@function cartPrice */
//prix total du panier ça marche pas
function cartPrice(quantity, price){
    let fullcartPrice;
    fullcartPrice += quantity * price;
    return fullcartPrice;
}


let totalQuantity = document.getElementById('totalQuantity');
totalQuantity.textContent = totalCartProducts();

//attention! si cartPrice est placé plus haut totalCartProducts ne marche plus
//cartPrice();



