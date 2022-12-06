//récupération de l'ID du produit àpd l'url
const url = window.location.search;
const params = new URLSearchParams(url);
const productId = params.get('id');

//une fois l'ID récupéré, on va interroger l'API à nouveau pour aller chercher les détails du produit à afficher
async function getProduct(id) {
    return fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(result) {
    if (result.ok) {
      return result.json();
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}

//cette fonction affiche les éléments du produits en générant le html nécessaire
function displayProductSpecs(product){
    //fetch le node par une autre méthode car classname ne renvoie pas l'élément directement.
    //document.querySelector renvoie bien le node
    //picDiv = élément dans lequel je vais insérer le reste
    const picDiv = document.querySelector(".item__img"); //Attention il faut conserver le '.' de la classe avec querySelector
    const pic = document.createElement('img');
    pic.setAttribute('src', `${product.imageUrl}`);
    pic.setAttribute('alt', `${product.altTxt}`);
    picDiv.appendChild(pic);

    document.getElementById("title").textContent = product.name;
    document.getElementById("price").textContent = product.price;
    document.getElementById("description").textContent = product.description;
    for (let color of product.colors){
        const select = document.getElementById("colors");
        const option = document.createElement('option');
        option.text = `${color}`;
        option.value = `${color}`;
        option.id = 'color';
        select.appendChild(option);
    }
}


//différents appels aux fonctions pour garnir la page
let product = await getProduct(productId);//ATTENTION à bien renseigner un type="module" dans le script html
displayProductSpecs(product);

//récupération de l'input de l'utilisateur
  //definitions de variables et fonction eventHandler
let quantity = document.getElementById('quantity');
let color = document.getElementById('colors');

//ajout de l'eventHandler sur le bouton 'ajouter au panier'
const submit = document.getElementById('addToCart');
submit.addEventListener('click', updateCart);

//creation de la sélection
const selection = {
id: productId,
qty: quantity.value,
color: color.value
};

//récupération du panier
function getBasket(){
    let basket = localStorage.getItem('basket');
    if (basket == null){
    return [];
  }else{
    return JSON.parse(basket);
  }
}

//check doublon et ajout de l'article dans le hash js
function checkProduct(product){}

//push de l'article dans le localStorage
function updateCart(){}




//méthodes pour clear localStorage et vérifier qu'il est vide. Attention, il reste indice 1 car il est set à 1 avant l'appel de updateCart
//setTimeout(() => {window.localStorage.clear();}, 5000);
