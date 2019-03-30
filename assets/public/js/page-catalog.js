/*
* Scripts assigned to the page 'catalog'
* Requires dbHelper
*/

document.addEventListener("DOMContentLoaded", () => {
  dbHelper.checkConnectivity();
  getPizzaCatalog();
});

// Fetch catalog of pizza
const getPizzaCatalog = () => {
  return dbHelper
    .fetchCatalog()
    .then(catalog => {
      console.log(catalog);
      fillCatalog(catalog.items);
    })
    .catch(err => console.log(err));
};

const fillCatalog = products => {
  const container = document.getElementById("products-catalog");

  console.log(products);

  products.forEach(product =>
    container.appendChild(createProductHTML(product))
  );
};

const createProductHTML = product => {
  const div = document.createElement("div");
  div.setAttribute(
    "class",
    "product-card darken-pseudo darken-with-text clickable"
  );
  div.setAttribute(
    "style",
    `background-image: url(${product.pic});min-height:${Math.random() *
      (+400 - +180) +
      +180}px `
  );
  div.setAttribute("tabindex", "0");

  div.setAttribute("onclick", `console.log('click')`);

  const h1 = document.createElement("h2");
  h1.innerHTML = product.name;

  const price = document.createElement("p");
  price.setAttribute("class", "price");
  price.innerHTML = product.price ? `${product.price}€` : "";

  div.appendChild(h1);
  div.appendChild(price);

  return div;
};

// Fetch shopping cart

// Fetch pending orders

// Add an item to cart

// Remove an item from the cart

// Checkout
