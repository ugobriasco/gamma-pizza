/*
* Get a shopping cart given an email
*/

// Internal dependancies
const _data = require("../data");

// Main function
const getCart = email =>
  _data
    // find a card having assigned to the given email
    .pRead("carts", email)
    .then(storedData => {
      // If cart is found, return it
      const message = "Cart Found!";
      return { statusCode: 200, data: { message, storedData } };
    })
    .catch(() => {
      // If no cart is found, return 404
      const message = "No cart found with the given Email";
      return { statusCode: 404, data: { message } };
    });

// Export the function
module.exports = getCart;
