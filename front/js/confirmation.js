
let idContainer = document.getElementById('orderId');

//récupérer l'id produit dans l'URL lorsque l'utilisateur arrive sur la page produit 
let str = window.location;
let url = new URL(str);
let orderId = url.searchParams.get("orderId");

idContainer.innerText = orderId;

if(orderId = 'undefined'){
    let msg = document.querySelector('.confirmation p');
    msg.innerText = 'Cette commande est déjà effectuée'
}