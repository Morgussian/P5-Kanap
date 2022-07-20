//fonction pour ajouter les éléments couleurs dans le menu déroulant
function addOption(selectbox, text, value){
    let optn = document.createElement("option");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);
}
//récupérer l'id produit dans l'URL lorsque l'utilisateur arrive sur la page produit 
let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("_id");

//récupérer la couleur sélectionnée
function getColor(){
    //cibler l'élément de selection colors
    let colorSelectionList = document.getElementById('colors');

    //liste des options
    let colorList = colorSelectionList.options;

    //couleur sélectionnée, retourne un numéro d'index
    let selectedColorIndex = colorList.selectedIndex;

    //valeur de la couleur sélectionnée
    let colorToSend = colorList[selectedColorIndex].value;
    return colorToSend;
}

//récupérer le produit et insertion des données
fetch("http://localhost:3000/api/products/" + id)
.then (data => data.json())
.then (jsonProduct => {
    let product = new Product(jsonProduct);
    
    //insérer le nom du produit dans h1 et dans <title> sans utiliser innerText

    //cibler le h1
    let h1 = document.querySelector('.item__content h1');
    let text = document.createTextNode(product.name);
    //attribuer name
    h1.appendChild(text);

    //cibler le <title>
    let title = document.querySelector('title');
    //attribuer (appendChild text ça marche pas).
    title.textContent = product.name;
    
    //cibler la balise prix (appenchild ça marche pas laisse tomber)
    let priceTag = document.getElementById('price');
    //attribuer
    priceTag.textContent = product.price + ' ';
    

    //cibler la balise description
    let descriptionTag = document.getElementById('description');
    descriptionTag.textContent = product.description;

    //créer un élément image du produit avec ses attributs src et alt
    let imageProduct = document.createElement('img');
    imageProduct.setAttribute('src', product.imageUrl);
    imageProduct.setAttribute('alt', product.altTxt);
    
    //cibler le parent de l'image produit et coller l'image dedans
    let imageContainer = document.querySelector('article .item__img');
    imageContainer.appendChild(imageProduct);

    //ajouter le array de couleurs sous forme d'<option>
    for (let i=0; i < product.colors.length; i++){
        addOption(document.getElementById('colors'), product.colors[i], product.colors[i]);
    }
})
.catch(function(err) {
  // Une erreur est survenue
});

//ecouter l'évènement clic sur "ajouter au panier" et envoyer les données au localStorage
let addButton = document.querySelector("#addToCart");
addButton.addEventListener('click', function(){

    //variables qui constitueront l'objet choice
    let choice = {};
    //la couleur est renvoyée par une fonction
    let color = getColor();
    
    //quantity est transformé en entiers naturels
    let quantity = parseInt(document.getElementById('quantity').value);

    choice = {
        //id est déjà défini ligne 11 avec searchParams
        'id' : id,
        'quantity' : quantity,
        'color'  : color
    };
    if(choice.quantity == 0){
        alert ('Sélectionnez une quantité.');
        return;
    }
    if(choice.color == ""){
        alert ('Sélectionnez une couleur.');
        return;
    }else{
    addToCart(choice);
    alert ('Sélection enregistrée.');
    
    }
});



