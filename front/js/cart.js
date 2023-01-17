/**
 * 
 * @returns (Promise) renvoie tous les aticles via requête à l'API
 */
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

/**
 * fetch items in localStorage
 * @returns collection of objects
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
let basket = getBasket();

/**
 * fill in the missing details (imageUrl, altTxt, name and price) received from the API before display cart
 * fonction pour ajouter les éléments manquant dans le panier mais nécessaires à l'affichanche
 * @param  (collection of objects) basket
 */
//
function addingMissingSpecifics(basket){
    for (let item of basket){
        const itemDetails = products.find(p => p._id == item.id);
        if (itemDetails){
            item.imageUrl = itemDetails.imageUrl;
            item.altTxt = itemDetails.altTxt;
            item.name = itemDetails.name;
            item.price = itemDetails.price;
        }
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

//function call
addingMissingSpecifics(basket);

/**
 * tags creation/tags' properties setting/nesting/injection into DOM/+Event listeners creation in a loop
 * @param (collection of objects) basket 
 */
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

      //adding event listeners
      inputQty.addEventListener('change', e => updateArtQty(e));
      deleteBtnLabel.addEventListener('click', e => removeItem(e));
    }
}
//function call for content creation and display
displayKart(basket);

let articleCount;
let total;
const displayArtCnt = document.getElementById('totalQuantity');
const displayTotalPrice = document.getElementById('totalPrice');

/**
 * This function go fetch a product details to be passed to function totalCheckout
 * in order to display and do the math with cart articles count and total price
 * @param {object of products returned by API} i 
 * @returns (hash) product details
 */
const getPrice = async (i) => {
    return fetch(`http://localhost:3000/api/products/${i.id}`)
    .then(function(resultSet) {
        if (resultSet.ok) {
        return resultSet.json();
        }
    })
    .catch(function(err) {
        console.log(err);
    }); 
}
/**
 * does the math in order to display the number of items in the cart as well as teh total price tag 
 * @param (collection of objects) basket
 * @returns items number in cart and total price
 */
async function totalCheckout(basket){
    articleCount = 0;
    total = 0;
    for (const i of basket){
        articleCount += +i.qty;
        const kanap = await getPrice(i);
        total += (+i.qty * +kanap.price);
    }
    displayArtCnt.textContent = articleCount;
    displayTotalPrice.textContent = total;
}
//function call
totalCheckout(basket);



/**
 * function that listens to modification of quantity by user while double checking his cart items
 * update the item quantity if necessary and update localStorage too.
 * totalCheckout is invoked anew to perform the math on the updated cart.
 * @param (object:event) event
 * @returns listens to quantity change and update localStorage accordingly
 */
const updateArtQty =  event => {
    //fetch new quantity selected by user
    const newQty = event.target.value;
    //crawl up to get to Id and color that come alongside the updated quantity
    const article = event.target.closest('.cart__item');
    const dataId = article.dataset.id;
    const dataColor = article.dataset.color;
    //update basket with new quantity selected(live - not yet in localStorage)
    for (let item of basket){
        if (item.id == dataId && item.color == dataColor) {
            if (newQty + item.qty < 101){
            item.qty = newQty;
            }else{
                alert("la quantité présente dans le panier ne permet pas d'ajouter ce nombre d'articles")
            }
        }
    }
    //push to localStorage
    priceStikeOut(basket);
    localStorage.setItem('basket', JSON.stringify(basket));
    
    //new call of totalCheckout to display the updated price tag 
    articleCount = 0;
    total = 0;
    totalCheckout(basket);
}

//cart item deletion
function removeItem(event){
    //recherche de l'id et couleur liée à l'event
    const okay = confirm("êtes-vous certain de vouloir supprimer l'article?");
    if (okay){
        const article = event.target.closest('.cart__item');
        const dataId = article.dataset.id;
        const dataColor = article.dataset.color;

        //trash recherche et selectionne l'item dans basket qui matche la selection à supprimer
        const trash = basket.filter( art => (art.id === dataId && art.color === dataColor));
        for (const item of basket){
            if(trash[0].id === item.id && trash[0].color === item.color){
                const index = basket.indexOf(item);
                basket.splice(index, 1);
            }
        } 
        priceStikeOut(basket);
        localStorage.setItem('basket', JSON.stringify(basket));//update localStorage
        window.location.reload();//refresh
    }
}

//Regexs definition
let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let textRegex = /^[a-zA-Z\u00C0-\u00FF\-]*$/;
let addressRegex = /^[a-zA-Z\u00C0-\u00FF0-9\s\,\''\-]*$/;

// contact object init. object name's first letter not capitalized because of the API requirements
let contact = {}; //init. fill-ins will be executed by listeners' callbacks

/**
 * fetch input from user and UX form helper
 * event listeners will make the field light up green if success (regex matched)
 * then assign the value of input to the customer object
 * if regex match returns false, css is injected to lit up the text field in red
 */
const firstName = document.getElementById('firstName');
firstName.addEventListener('keyup', event => {
    if (event.target.value.match(textRegex)){
        event.target.setAttribute('style', 'background-color: lightgreen;');
        contact.firstName = event.target.value;
        document.getElementById('firstNameErrorMsg').textContent = '';
    }else{
        event.target.setAttribute('style', 'background-color: red');
        document.getElementById('firstNameErrorMsg').textContent = 'Veuillez vérifier que la donnée introduite dans le champ respecte bien les critères';
    }});
const lastName = document.getElementById('lastName');
lastName.addEventListener('keyup', event => {
    if (event.target.value.match(textRegex)){
        event.target.setAttribute('style', 'background-color: lightgreen;');
        contact.lastName = event.target.value;
        document.getElementById('lastNameErrorMsg').textContent = '';
    }else{
        event.target.setAttribute('style', 'background-color: red');
        document.getElementById('lastNameErrorMsg').textContent = 'Veuillez vérifier que la donnée introduite dans le champ respecte bien les critères';
    }});
const address = document.getElementById('address');
address.addEventListener('keyup', event => {
    if (event.target.value.match(addressRegex)){
        event.target.setAttribute('style', 'background-color: lightgreen;');
        contact.address = event.target.value;
        document.getElementById('addressErrorMsg').textContent = '';
    }else{
        event.target.setAttribute('style', 'background-color: red');
        document.getElementById('addressErrorMsg').textContent = 'Veuillez vérifier que la donnée introduite dans le champ respecte bien les critères';
    }});
const city = document.getElementById('city');
city.addEventListener('keyup', event => {
    if (event.target.value.match(textRegex)){
        event.target.setAttribute('style', 'background-color: lightgreen;');
        contact.city = event.target.value;
        document.getElementById('cityErrorMsg').textContent = '';
    }else{
        event.target.setAttribute('style', 'background-color: red');
        document.getElementById('cityErrorMsg').textContent = 'Veuillez vérifier que la donnée introduite dans le champ respecte bien les critères';
    }});
const email = document.getElementById('email');
email.addEventListener('keyup', event => {
    if (event.target.value.match(emailRegex)){
        event.target.setAttribute('style', 'background-color: lightgreen;');
        contact.email = event.target.value;
        document.getElementById('emailErrorMsg').textContent = '';
    }else{
        event.target.setAttribute('style', 'background-color: red');
        document.getElementById('emailErrorMsg').textContent = 'Veuillez vérifier que la donnée introduite dans le champ respecte bien les critères';
    }});
    console.log(contact);

/**
 * function preps the product array of IDs compliant with API requirements
 * checks if all fields of contact object are present
 * prepares the post request with expected data then sends it over to the API
 * then redirects to confirmation.html with orderID passed thru the url
 * @param {event: click submit} event 
 * @returns response from API with order number generation
 */
const placeOrder = (event) => {
    event.preventDefault(); //avoid auto reload due to type submit
    //reconstruction des IDs du basket dans l'array panier
    let products = [];
    for (let article of basket){
        products.push(article.id);
    }
    //préparation des data à envouer à l'API
    if (contact.firstName !== undefined && contact.firstName.length > 0 && contact.lastName !== undefined && contact.lastName.length > 0 && contact.address !== undefined && contact.address.length > 0 && contact.city !== undefined && contact.city.length > 0 && contact.email !== undefined){
        let data = {contact, products};
        fetch('http://localhost:3000/api/products/order', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
            document.location.href=`./confirmation.html?orderId=${data.orderId}`
        })
    }else{
        alert("Les champs du formulaire ne sont pas valablement remplis. Il est nécessaire d'avoir au moins un caractère dans les champs");
    }
}

//add event listener call to action
const order = document.getElementById('order');
order.addEventListener('click', placeOrder);