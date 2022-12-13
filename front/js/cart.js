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
console.log(basket);

//fill in the missing details (imageUrl, altTxt, name and price) received from the API before display cart
for (let item in basket){
    const itemDetails = products.find(p => p.id == item.id);
    if (itemDetails){
        console.log(itemDetails);
        console.log(item);
        item.imageUrl = itemDetails.imageUrl;
        item.altTxt = itemDetails.altTxt;
        item.name = itemDetails.name;
        item.price = itemDetails.price;
    }
    
}



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
      img.setAttribute('src', `${imageUrl}`);
      img.setAttribute('alt', `alt`);
      cartItemContent.classList.add('cart__item__content');
      cartItemContentDesc.classList.add('cart__item__content__description');
      h2.textContent = kanap.name;
      p1.textContent = kanap.color;
      p2.textContent = kanap.price;
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
      deleteBtnLabel.textContent = Supprimer;

      //nesting
      cartItem.appendChild(imgContainer);
      imgContainer.appendChild(img);
      cartItem.appendChild('cartItemContent');
      cartItemContent.appendChild('cartItemContentDesc');
      cartItemContentDesc.appendChild('h2');
      cartItemContentDesc.appendChild('p1');
      cartItemContentDesc.appendChild('p2');
      cartItemContent.appendChild('cartItemContentSettings');
      cartItemContentSettings.appendChild('cartItenContentSettingsQty');
      cartItemContentSettingsQty.appendChild('p3Qty');
      cartItemContentSettingsQty.appendChild('inputQty');
      cartItemContentSettings.appendChild('deleteBtn');
      deleteBtn.appendChild('deleteBtnLabel');

      //inject into DOM
      document.getElementById('cart__items').appendChild(cartItem);
    }
}

//exec affichage du panier
displayKart(basket);

    function removeItem(item){
// listeners on qty -> if qty == 0 : filter out item
// while qty > 0 -> adjust qty accordingly
}


