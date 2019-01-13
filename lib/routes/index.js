const badRoutes = require("./bad-routes");
const user = require("../user");

// Generig ping route
const ping = (req, res) => {
  console.log("ping");
  res({ statusCode: 200, data: { message: "Pong" } });
};

// Routing request to the assigned handler
const router = {
  ping: {
    GET: ping
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
  notFound: badRoutes.notFound
};

module.exports = router;
