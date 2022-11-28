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

async function getProduct () {
    return fetch(`http://localhost:3000/api/products/${product}`)
    .then(function(result) {
    if (result.ok) {
      return result.json();
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}

