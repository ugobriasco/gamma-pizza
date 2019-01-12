/*
* Lite version of the express router
*/

class Router {
  constructor(_route) {
    this.route = _route || "";
  }

  set setRoute(myRoute) {
    this.route = myRoute;
  }

  get getCurrentRoute() {
    return this.route;
  }

  get(req, res, func) {
    if (req.method != "GET") {
      return handleWrongRequest();
    } else {
      return func;
    }
  }
}

function handleWrongRequest() {
  return { statusCode: 404, data: { message: "Route not found." } };
}

module.exports = Router;
