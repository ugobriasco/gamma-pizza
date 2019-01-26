const badRoutes = require("./bad-routes");
const user = require("../user");
const pizza = require("../pizza");
const cart = require("../cart");
const checkout = require("../checkout");
const auth = require("../auth");

// Routing request to the assigned handler
const router = {
  pizza: {
    GET: pizza.get
  },
  cart: {
    POST: cart.postCart,
    GET: cart.getCart,
    PUT: cart.updateCart,
    DELETE: cart.deleteCart
  },
  checkout: {
    POST: checkout
  },
  user: {
    GET: user.getUser,
    POST: user.createUser,
    PUT: user.updateUser,
    DELETE: user.deleteUser
  },
  "user/all": {
    GET: user.listUsers
  },
  login: {
    POST: auth.login
  },
  logout: {
    POST: auth.logout
  },
  notFound: badRoutes.notFound
};

module.exports = router;
