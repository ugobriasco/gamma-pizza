/*
* Cart module public interface
*/

// Import public methods
const getCartByEmail = require("./get-cart");
const deleteCartByEmail = require("./delete-cart");
const cartHandlers = require("./cart-handlers");

// Expose those methods
module.exports = { ...cartHandlers, getCartByEmail, deleteCartByEmail };
