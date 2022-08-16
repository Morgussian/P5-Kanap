/**
* Ce fichier fait partie du projet KANAP.
*
* Il construit une class contenant tous les paramètres d'un produit.
*
* @copyright 2022 Morgussian
*/

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
  };