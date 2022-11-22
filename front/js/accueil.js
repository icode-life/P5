function getKanaps() {
  fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    document
        .getElementById("items")
        .innerText = value.queryString.greetings;
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
}

document
  .getElementById("ask-hello")
  .addEventListener("click", askHello);


/**
 * onload:
 * 1) fetch les données via l'API à stocker dans un array ou une collection
 * 2) traiter la collection pour la rendre utilisable JSON -> JS
 * 3) boucle for (collection.length-1) pour insertion dans html
 */