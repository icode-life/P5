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

//creation du panier en localStorage
//ajout de l'eventHandler sur le bouton 'ajouter au panier'
const submit = document.getElementById('addToCart');
submit.addEventListener('click', updateCart);

let i = 1; //pour incrémenter un indice de stockage dans localStorage

function updateCart(){
  //creation de l'objet souhaité
  const selection = {
  id: productId,
  qty: quantitySelected,
  color: colorSelected
  };

  let doublon = 0; //pour checker si un article est déjà présent dans le localStorage
  //valeur reset à zéro à chaque appel de updateCart
  
  //check si doublon avant insertion panier
  //récupération du local storage dans un array
  let currentStorage = [];
  for (let i = 0; i<localStorage.length; i++){
    let clef = localStorage.key(i);
    currentStorage += localStorage.getItem(clef);
    console.log(currentStorage);
  }
  //currentStorage.shift(); //removes null value at the beginning of the array due to variable init on blank

  //comparaison de la selection contre l'array récupéré
  if (currentStorage == !null){
    for (let item of currentStorage){
      let itemJson = JSON.parse(item);
      if (itemJson.id == selection.id && itemJson.color == selection.color){
        doublon ++;
      }   
    }
  }

  //si doublon est false -> not 1 (la valeur ne peut être que de 0 ou 1), il n'y a pas de doublon donc on push dans el local storage
  if (!doublon){
      let article = JSON.stringify(selection);
      localStorage.setItem(i, article);
      console.log(localStorage.getItem(i));
      i++;
    }else{
      alert(`L'article choisi est déjà présent dans votre panier, vous venez d'ajouter ${doublon} exemplaire au panier`);
      //ici il faut incrémenter le nombre d'article dans le localStorage
    }   
}

//méthodes pour clear localStorage et vérifier qu'il est vide. Attention, il reste indice 1 car il est set à 1 avant l'appel de updateCart
//setTimeout(() => {window.localStorage.clear();}, 5000);


