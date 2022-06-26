
//représentation d'un produit
class Product {
    constructor(jsonProduct){
        this.colors = jsonProduct.colors;
        this._id = jsonProduct._id;
        this.name = jsonProduct.name;
        this.price = jsonProduct.price;
        this.imageUrl = jsonProduct.imageUrl;
        this.description = jsonProduct.description;
        this.altTxt = jsonProduct.altTxt;
    }
}

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


//récupérer le produit et insertion des données
fetch("http://localhost:3000/api/products/" + id)
.then (data => data.json())
.then (jsonProduct => {
    let product = new Product(jsonProduct);
    //voir si on peut pas refactoriser les deux lignes suivantes:
    document.querySelector('h1').innerText = product.name;
    document.querySelector('title').innerText = product.name;

    document.getElementById('price').innerText = product.price;
    document.getElementById('description').innerText = product.description;
    document.querySelector('article div').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
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
    const choices = {
        'id' : id,
        'quantity' : document.getElementById('quantity').value,
        'color'  : document.getElementById('colors').options[document.getElementById('colors').selectedIndex].value
    }
    let choicesStrng = JSON.stringify(choices);
    localStorage.setItem('usrChoice', choicesStrng);
    console.log(choicesJSON);
})

let check = localStorage.getItem('usrChoice');
let choicesJSON = JSON.parse(check);
