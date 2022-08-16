/**
* Ce fichier fait partie du projet KANAP.
*
* Il récupère l'ensemble des produits de l'API et insère leurs paramètres dans des cards.
*
* Chaque card est un lien vers une fiche produit individuelle.
*
* @copyright 2022 Morgussian
*/

//récupérer le array des produits

fetch("http://localhost:3000/api/products")
.then (data => data.json())
.then (jsonListProduct => {
    for (let jsonProduct of jsonListProduct){
      let product = new Product(jsonProduct);
      
      //création d'un lien <a>
      let link = document.createElement('a');
      link.setAttribute('href', './product.html?_id='+ product._id);
      
      //création d'un <article>
      let article = document.createElement('article');
      
      //une <img> avec son URL et son ALt
      let img = document.createElement('img');
      img.setAttribute('src', product.imageUrl);
      img.setAttribute('alt', product.altTxt);
      
      //un titre <h3> nom du produit
      let h3 = document.createElement('h3');
      h3.setAttribute('class', 'productName');
      h3.innerText = product.name;
      
      //description du produit
      let p = document.createElement('p');
      p.setAttribute('class', 'productDescription');
      p.textContent = product.description;
      
      article.appendChild(img);
      article.appendChild(h3);
      article.appendChild(p);
      link.appendChild(article);

      document.querySelector("#items").appendChild(link);
    }
})
.catch(function(err) {
  // Une erreur est survenue
});
  
  
