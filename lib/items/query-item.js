/*
* Service for loading pizza store
*/

const itemsStore = require("../../assets/items-store");

// Return all the pizza available
// TODO: Fetch data from DB if available
const listItems = () => {
  return itemsStore;
};

// Returns a pizza fullfilling the given query
// TODO: Fetch data from DB if available
const queryItems = ({ id, name }) => {
  if (id) {
    return itemsStore.filter(item => item.id == id);
  } else {
    return itemsStore.filter(item =>
      item.name.toLowerCase().match(name.toLowerCase())
    );
  }
};

module.exports = { listItems, queryItems };
