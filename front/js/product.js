//retrieve the product ID in the url
const url = window.location.search;
const params = new URLSearchParams(url);
const productId = params.get('id');

//with the ID fetched from url, call the API to get the specifics of the product
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

/**
 * this function genrates the html, proceed to nesting and then returns the tags created as well as
 * product details on the dedicated webpage.
 * @param {object} product
 * @returns display the product details in product.html 
 */
function displayProductSpecs(product){
    //ajout du nom de produit dans l'onglet du navigateur
    document.title = product.name;
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


//function calls
let product = await getProduct(productId);//ATTENTION à bien renseigner un type="module" dans le script html
displayProductSpecs(product);
//****************************************************************************************
//****************************************************************************************


//part 2: envoi du form kanap
//get user input
let quantity = document.getElementById('quantity');
let color = document.getElementById('colors');


//add eventHandler on 'ajouter au panier'
const submit = document.getElementById('addToCart');
submit.addEventListener('click', checkProduct);

/**
 * this function fetch basket in localStorage
 * @returns empty array if basket empty or collection of objects (canapé)
 */
function getBasket(){
    let basket = localStorage.getItem('basket');
    if (basket == null){
    return [];
  }else{
    let basketObject = JSON.parse(basket);
    return basketObject;
  }
}

/**
 * this function strips the price from the basket.
 * the purpose is for the function to be called before updating localStorage so that the user cannot alter the price.
 * @param {collection of object} basket 
 */
function priceStikeOut(basket){
    for (let item of basket){
        delete item.price;
    }
}
/**
 * this function pushes the updated basket of items to localStorage
 * @param {collection of objects} basket 
 */
function updateCart(basket){localStorage.setItem('basket', JSON.stringify(basket));}

/**
 * this function calls getBasket to fetch basket in localStorage
 * then creates an object with id, quantity and color of the selected product
 * if the item is properly set, it checks whether the user has already selected the same id and color previously
 * if the user did pick the item already, function updates quantity in basket rather than creating twice or more of the same item
 * if it the first time, the item is pushed as a new entry in basket
 * finally, it saves the new basket to localStorage by calling updateCart()
 */
function checkProduct(){
  let basket = getBasket();
  //creation de la sélection
  const article = {
    id: productId,
    qty: quantity.value,
    color: color.value
  };

  if (article.qty !=='0' && article.color !== ""){
    let pickedAlready = basket.find(item => item.id == article.id && item.color == article.color);
    if (pickedAlready !== undefined){
      //gestion des quantités -> conversion des strings reçues en type Number : var temp
      //afin d'éviter les concaténations de chaines au lieu d'opération arithmétique sur les quantités
      //re-cast en string (je pense optionnel mais par sécurité je l'ai fait)
      let result = +pickedAlready.qty + +article.qty;
      pickedAlready.qty = result;
      pickedAlready.qty.toString();
    }else{
      basket.push(article);
    }
    priceStikeOut(basket);
    updateCart(basket);
  }
}
