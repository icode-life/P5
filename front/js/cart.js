// requête à l'api pour placer tous les produit
async function getKanaps() {
  return fetch("http://localhost:3000/api/products")
  .then(function(resultSet) {
    if (resultSet.ok) {
      return resultSet.json();
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}

const products = await getKanaps();

// fetch du panier en localStorage
async function getBasket(){
    let basket = localStorage.getItem('basket');
    if (basket == null){
    return [];
  }else{
    let basketObject = JSON.parse(basket);
    return basketObject;
  }
}

let basket = await getBasket();

//fill in the missing details (imageUrl, altTxt, name and price) received from the API before display cart
//fonction pour ajouter les éléments manquant dans le panier mais nécessaires à l'affichanche
function addingMissingSpecifics(basket){
    for (let item of basket){
        const itemDetails = products.find(p => p._id == item.id);
        if (itemDetails){
            item.imageUrl = itemDetails.imageUrl;
            item.altTxt = itemDetails.altTxt;
            item.name = itemDetails.name;
            item.price = itemDetails.price;
            console.log(item);
        }
    }
}

//appel à la fonction pour combler les données manquantes pour l'affichage
addingMissingSpecifics(basket);

//fonction de construction du markup et affichage
function displayKart(basket){
    for (let kanap of basket){
      //tags creation
      const cartItem = document.createElement('article');
      const imgContainer = document.createElement('div');
      const img = document.createElement('img');
      const cartItemContent = document.createElement('div');
      const cartItemContentDesc = document.createElement('div');
      const h2 = document.createElement('h2');
      const p1 = document.createElement('p');
      const p2 = document.createElement('p');
      const cartItemContentSettings = document.createElement('div');
      const cartItemContentSettingsQty = document.createElement('div');
      const p3Qty = document.createElement('p');
      const inputQty = document.createElement('input');
      const deleteBtn = document.createElement('div');
      const deleteBtnLabel = document.createElement('p');

      // classes and attributes setting and text filling
      cartItem.classList.add('cart__item');
      cartItem.setAttribute("data-id", `${kanap.id}`);
      cartItem.setAttribute("data-color", `${kanap.color}`);
      imgContainer.classList.add('cart__item__img');
      img.setAttribute('src', `${kanap.imageUrl}`);
      img.setAttribute('alt', `alt`);
      cartItemContent.classList.add('cart__item__content');
      cartItemContentDesc.classList.add('cart__item__content__description');
      h2.textContent = kanap.name;
      p1.textContent = kanap.color;
      p2.textContent = `${kanap.price} €`;
      cartItemContentSettings.classList.add('cart__item__content__settings');
      cartItemContentSettingsQty.classList.add('cart__item__content__settings__quantity');
      p3Qty.textContent = `Qté: `;
      inputQty.setAttribute('type', 'number');
      inputQty.classList.add('itemQuantity');
      inputQty.setAttribute('name', 'itemQuantity');
      inputQty.setAttribute('min', '1');
      inputQty.setAttribute('max', '100');
      inputQty.setAttribute('value', `${kanap.qty}`);
      deleteBtn.classList.add('cart__item__content__settings__delete');
      deleteBtnLabel.classList.add('deleteItem');
      deleteBtnLabel.textContent = 'Supprimer';

      //nesting
      cartItem.appendChild(imgContainer);
      imgContainer.appendChild(img);
      cartItem.appendChild(cartItemContent);
      cartItemContent.appendChild(cartItemContentDesc);
      cartItemContentDesc.appendChild(h2);
      cartItemContentDesc.appendChild(p1);
      cartItemContentDesc.appendChild(p2);
      cartItemContent.appendChild(cartItemContentSettings);
      cartItemContentSettings.appendChild(cartItemContentSettingsQty);
      cartItemContentSettingsQty.appendChild(p3Qty);
      cartItemContentSettingsQty.appendChild(inputQty);
      cartItemContentSettings.appendChild(deleteBtn);
      deleteBtn.appendChild(deleteBtnLabel);
        
      //inject into DOM
      document.getElementById('cart__items').appendChild(cartItem);

      //adding event listener
      inputQty.addEventListener('change', e => updateArtQty);
    }
}
//exec affichage du panier
displayKart(basket);
console.log(basket);

//calcul de la somme du panier
let articleCount = 0;
let total = 0;

function totalCheckout(basket){
    for (let i of basket){
        articleCount += i.qty;
        total += (i.qty * i.price);
    }
}

totalCheckout(basket);

const displayArtCnt = document.getElementById('totalQuantity');
displayArtCnt.textContent = articleCount;
const displayTotalPrice = document.getElementById('totalPrice');
displayTotalPrice.textContent = total;

//ajout event listeners updateQty et deleteArt




//possibilité de supprimer un article du panier
function removeItem(item){

}

//const updatedQty = 

//récupération input form user
const firstname = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');

//add event listener
const order = document.getElementById('order');
order.addEventListener('click', placeOrder);

//fct de cmd lors du clic sur le btn commander!
function placeOrder(){
  //creation du client
    const Customer = {
    firstname: firstname.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value
  };
 
}



