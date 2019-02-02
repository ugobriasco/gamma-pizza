/*
* Service for loading pizza store
*/

// Internal dependancies
const itemsStore = require("../../assets/items-store");

// Return all the pizza available
// TODO: Fetch data from DB if available
const listItems = () => {
  // Return static data
  return itemsStore;
};

// Returns a pizza fullfilling the given query
// TODO: Fetch data from DB if available
const queryItems = ({ id, name }) => {
  // If ID present in the query, then return the related item
  if (id) {
    return itemsStore.filter(item => item.id == id);
  } else {
    // Otherwise use the name of the item to query similar products
    return itemsStore.filter(item =>
      item.name.toLowerCase().match(name.toLowerCase())
    );
  }
};

// Export the module
module.exports = { listItems, queryItems };
