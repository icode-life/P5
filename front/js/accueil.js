async function getKanaps() {
  return fetch("http://localhost:3000/api/products")
  .then(function(resultSet) {
    if (resultSet.ok) {
      return resultSet.json();
    }
  })
  /*.then(function(value) {
   return value;
  })*/
  .catch(function(err) {
    console.log(err);
  });
}

function displayKanaps(products){
    for (let product of products){
        console.log(product);    
        console.log(product._id);
        document.getElementById("items").innerHTML += `<a href="./product.html?id=${product._id}"><article><img src="${product.imageUrl}" alt="${product.altTxt}"><h3 class="productName">${product.name}</h3><p class="productDescription">${product.description}</p></article></a>`;
    }
}

const products = await getKanaps();
displayKanaps(products);

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