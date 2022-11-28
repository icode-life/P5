/**
 * 1) fetch product detail via API sur base de l'ID
 * 2) onclick -> ajouter au panier
 */

/** 
resultSet = array of maps. Here's Array[0]
{
    "colors":["Blue","White","Black"],
    "_id":"107fb5b75607497b96722bda5b504926",
    "name":"Kanap Sinopé",
    "price":1849,
    "imageUrl":"http://localhost:3000/images/kanap01.jpeg",
    "description":"Excepteur sint occaecat cupidatat non proident.",
    "altTxt":"Photo d'un canapé bleu, deux places"
}
*/

const url = window.location.search;
const params = new URLSearchParams(url);
const productId = params.get('id');

async function getProduct(id) {
    console.log(id);
    return fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(result) {
    if (result.ok) {
        console.log(result);
      return result.json();
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}

function displayProductSpecs(product){
    document.getElementsByClassName("item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
    console.log(product.imageUrl);
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;
    for (let color of product.colors){
        
        
        let option = document.createElement('option');
        option.text = `${color}`;
        option.value = `${color}`;
        let select = document.getElementsByTagName("select");
        select.appendChild(option);
        
        
        //document.getElementsByTagName("select").innerHTML += `<option value="${color}">${color}</option>`;
        let test = document.getElementsByTagName("select");
        console.log(test);
    }
}

let product = await getProduct(productId);//ATTENTION à bien renseigner un type="module" dans le script html
displayProductSpecs(product);