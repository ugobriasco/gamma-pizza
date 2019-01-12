/*
* Routing the requests to the right handler
*/

//const Router = require("./Router");

// let router = new Router();
//
// router
//   .setRoute("/")
//   .get(middleware, handler1)
//   .post(middleware, handler2);

// Handlers
const middleware = req =>
  new Promise(resolve => {
    console.log("I am the middleware");
    resolve(req);
  });

const handler1 = req => {
  console.log("I am the handler 1");
  return { statusCode: 200, data: { message: "Here a slice of pizza" } };
};

const handler2 = (req, res) => {
  console.log("I am the handler2");
  return { statusCode: 200, data: { message: "Here another slice of pizza" } };
};

const notFound = () => {
  console.log("Not found");
  return { statusCode: 404, data: { message: "Route not found" } };
};

// Routing request to the related handler
const router = req => {
  if (req.path === "") {
    if (req.method === "GET") {
      return middleware(req).then(req => handler1(req));
    }
  }

  if (req.path == "two") {
    if (req.method === "GET") {
      return handler2(req);
    }
  }

  return notFound();
};

module.exports = router;
