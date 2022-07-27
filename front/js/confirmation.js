
let idContainer = document.getElementById('orderId');

//récupérer l'id produit dans l'URL lorsque l'utilisateur arrive sur la page produit 
let str = window.location.href;
let url = new URL(str);
let orderId = url.searchParams.get("orderId");

console.log(orderId);
