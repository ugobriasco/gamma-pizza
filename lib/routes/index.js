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
const ui = require("../ui");

// Routing API v1.0 requests to the assigned handler
const apiV1Routes = {
  //path
  "api/v1.0/item": {
    GET: items.get, //method and related handler
    isPrivate: true //set route as private. It will require auth headers
  },
  "api/v1.0/cart": {
    POST: cart.postCart,
    GET: cart.getCart,
    PUT: cart.updateCart,
    DELETE: cart.deleteCart,
    isPrivate: true
  },
  "api/v1.0/checkout": {
    POST: checkout,
    isPrivate: true
  },
  "api/v1.0/user": {
    GET: user.getUser,
    PUT: user.updateUser,
    DELETE: user.deleteUser,
    isPrivate: true
  },
  "api/v1.0/signup": {
    POST: user.createUser,
    isPrivate: false
  },
  "api/v1.0/login": {
    POST: auth.login,
    isPrivate: false
  },
  "api/v1.0/logout": {
    POST: auth.logout,
    isPrivate: false
  },
  notFound: ui.notFound
};

//Routing html request to the assigned handlder
const htmlRoutes = {
  "": {
    GET: ui.index,
    isPrivate: false
  },
  "/assets": {
    GET: ui.assets,
    isPrivate: false
  },
  "/login": {
    GET: ui.login,
    isPrivate: false
  },
  "/signup": {
    GET: ui.signup,
    isPrivate: false
  },
  "me/catalog": {
    GET: ui.catalog,
    isPrivate: false
  },
  "me/cart": {
    GET: ui.cart,
    isPrivate: false
  },
  "me/checkout": {
    GET: ui.checkout,
    isPrivate: false
  }
};

// Expose public interface
const router = { ...apiV1Routes, ...htmlRoutes };

// Export the router
module.exports = router;
