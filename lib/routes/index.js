/*
* Request router
* Depending to the path and method, routes the reuest to the assigned handler
*/

// Internal dependancies
const badRoutes = require("./bad-routes");
const user = require("../user");
const items = require("../item");
const cart = require("../cart");
const checkout = require("../checkout");
const auth = require("../auth");

// Routing request to the assigned handler
const router = {
  //path
  item: {
    GET: items.get, //method and related handler
    isPrivate: true //set route as private. It will require auth headers
  },
  cart: {
    POST: cart.postCart,
    GET: cart.getCart,
    PUT: cart.updateCart,
    DELETE: cart.deleteCart,
    isPrivate: true
  },
  checkout: {
    POST: checkout,
    isPrivate: true
  },
  user: {
    GET: user.getUser,
    PUT: user.updateUser,
    DELETE: user.deleteUser,
    isPrivate: true
  },
  signup: {
    POST: user.createUser,
    isPrivate: false
  },
  login: {
    POST: auth.login,
    isPrivate: false
  },
  logout: {
    POST: auth.logout,
    isPrivate: false
  },
  notFound: badRoutes.notFound
};

// Export the router
module.exports = router;
