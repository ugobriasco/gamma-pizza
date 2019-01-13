/*
* Service for loading pizza store
*/

const pizzaStore = require("../../assets/pizza-store");

// Return all the pizza available
// TODO: Fetch data from DB if available
const listPizza = () => {
  return pizzaStore;
};

// Returns a pizza fullfilling the given query
// TODO: Fetch data from DB if available
const queryPizza = ({ id, name }) => {
  if (id) {
    return pizzaStore.filter(pizza => pizza.id == id);
  } else {
    return pizzaStore.filter(pizza =>
      pizza.name.toLowerCase().match(name.toLowerCase())
    );
  }
};

module.exports = { listPizza, queryPizza };
