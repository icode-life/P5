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
//****************************************************************************************
//****************************************************************************************


//partie 2: envoi du form kanap
//récupération de l'input de l'utilisateur
let quantity = document.getElementById('quantity');
let color = document.getElementById('colors');





//ajout de l'eventHandler sur le bouton 'ajouter au panier'
const submit = document.getElementById('addToCart');
submit.addEventListener('click', checkProduct);

//definition de fonction de récupération du panier
function getBasket(){
    let basket = localStorage.getItem('basket');
    console.log(basket);
    if (basket == null){
    return [];
  }else{
    let basketObject = JSON.parse(basket);
    return basketObject;
  }
}

//definition de la fonction push de l'article dans le localStorage
function updateCart(basket){localStorage.setItem('basket', JSON.stringify(basket));}

//check doublon et ajout de l'article dans le hash js
function checkProduct(){
  let basket = getBasket();
  //creation de la sélection
  const article = {
    id: productId,
    qty: quantity.value,
    color: color.value
  };

  if (article){
    let pickedAlready = basket.find(item => item.id == article.id && item.color == article.color);
    if (pickedAlready != undefined){
      //gestion des quantités -> conversion des strings reçues en type Number : var temp
      //afin d'éviter les concaténations de chaines au lieu d'opération arithmétique sur les quantités
      //re-cast en string (je pense optionnel mais par sécurité je l'ai fait)
      let temp1 = Number(pickedAlready.qty);
      let temp2 = Number(article.qty);
      let result = temp1 + temp2;
      pickedAlready.qty = result;
      pickedAlready.qty.toString();
    }else{
      basket.push(article);
    }
    updateCart(basket);
  }
}
