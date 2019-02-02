/*
* Handle request via /itmes
*
*/

// Internal dependancies
const { listItems, queryItems } = require("./query-item");

// Handler container
const items = {};

// GET an item
// Required data none
// Optional data name, id
items.get = (req, res) => {
  // Destructuring query parameters
  const { id, name } = req.params;

  // If query parameters are included then get the related pizza
  if (id || name) {
    res({
      statusCode: 200,
      data: {
        message: "Some items",
        items: queryItems({ id, name })
      }
    });
  } else {
    // If no parameter is defined, return all the pizza in store
    res({
      statusCode: 200,
      data: { message: "All Items", items: listItems() }
    });
  }
};

// Export the handler
module.exports = items;
