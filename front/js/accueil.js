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

