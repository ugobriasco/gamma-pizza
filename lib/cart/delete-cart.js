/*
* Deletes cart given the email
*
*/

// Internal dependancies
const _data = require("../data");
const getCart = require("./get-cart");

// Main function
const deleteCart = email =>
  // Get the cart
  getCart(email)
    // If no cart found return error
    .catch(err => res(err))
    // If the cart is found, unlink it
    .then(cart => _data.pDelete("carts", email));

module.exports = deleteCart;
