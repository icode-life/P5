/**
 * 2) onclick -> ajouter au panier
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
    //fetch le node par une autre méthode car classname ne renvoie pas l'élément directement.
    //document.querySelector renvoie bien le node
    const picDiv = document.querySelector(".item__img");
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
        select.appendChild(option);
    }
}

let product = await getProduct(productId);//ATTENTION à bien renseigner un type="module" dans le script html
displayProductSpecs(product);