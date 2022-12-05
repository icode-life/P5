//récupération de l'ID du produit àpd l'url
const url = window.location.search;
const params = new URLSearchParams(url);
const productId = params.get('id');

//uen fois l'ID récupéré, on va interroger l'API à nouveau pour aller chercher les détails du produit à afficher
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
let quantitySelected;
let colorOption = document.getElementById('colors');
let colorSelected;

function quantitySetup(){quantitySelected = quantity.value;}
function colorSetup(){colorSelected = colorOption.value;}

  //ajout des listeners
quantity.addEventListener('change', quantitySetup);
colorOption.addEventListener('change', colorSetup);

//setTimeout(() => {  console.log(quantitySelected); }, 5000);
//setTimeout(() => {  console.log(colorSelected); }, 5000);

//creation du panier en localStorage
const submit = document.getElementById('addToCart');
submit.addEventListener('click', updateCart);

function updateCart(){
  //creation de l'objet souhaité
  const selection = {
  id: productId,
  qty: quantitySelected,
  color: colorSelected
  };
  //check si doublon avant insertion panier
  for( let item of localStorage){
    const itemJson = JSON.parse(item);
    if (itemJson.id == selection.id && itemJson.color == selection.color){
      alert('article déjà présent dans le panier!');
    } else {
        article = JSON.stringify(selection);
        localStorage.setItem("obj",article);
    }   
}
}

// check à refaire car il ne suffit pas qu'uen comparaison ne match pas.
// il faut qu'il n'y ait aucune occurence sur tt le localStorage



