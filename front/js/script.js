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

//récupérer le array des produits

fetch("http://localhost:3000/api/products")
.then (data => data.json())
.then (jsonListProduct => {
    for (let jsonProduct of jsonListProduct){
    let product = new Product(jsonProduct);
    document.querySelector(".items").innerHTML +=  `<a href="./product.html?_id=${product._id}">
                                                      <article>
                                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                        <h3 class="productName">${product.name}</h3>
                                                        <p class="productDescription">"${product.description}"</p>
                                                      </article>
                                                    </a>` 
    }
})
.catch(function(err) {
  // Une erreur est survenue
});
  
  
