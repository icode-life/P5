/**
 * this function fetches all products from API 
 * @returns a collection comprised of all the items available from the API
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

/**
 * this function generates needed html tags, attributes, nests tags where they belong and injects into DOM
 * @param {collection of objects} products 
 */
function displayKanaps(products){
  for (let product of products){
    //tags creation
    const clicableItem = document.createElement('a');
    const article = document.createElement('article');
    const image = document.createElement('img');
    const itemTitle = document.createElement('h3');
    const parag = document.createElement('p');

    //attributes and class setting
    image.setAttribute(`src`, `${product.imageUrl}`);
    image.setAttribute(`alt`, `${product.altTxt}`);
    clicableItem.setAttribute(`href`, `./product.html?id=${product._id}`);
    itemTitle.classList.add(`productName`);
    
    //fill-ins
    itemTitle.textContent = product.name;
    parag.textContent = product.description;

    //nesting
    clicableItem.appendChild(article);
    article.appendChild(image);
    article.appendChild(itemTitle);
    article.appendChild(parag);

    //import into DOM
    document.getElementById('items').appendChild(clicableItem);
  }
}

const products = await getKanaps();
displayKanaps(products);

