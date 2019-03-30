/*
* Handling exceptions
*/

// Container
const defaultRoutes = {};

//2xx
defaultRoutes.status = (req, res) => res({ statusCode: 200 });

// 4XX
// handling not notfound
defaultRoutes.notFound = (req, res) => {
  console.log("Not found");
  res({ statusCode: 404, data: { message: "Route not found" } });
};

// handling a bad request
defaultRoutes.badRequest = (req, res) => {
  console.log("bad request");
  res({ statusCode: 400, data: { message: "Route not found", request } });
};

// 5XX
// handling server errors
defaultRoutes.serverError = (req, res) => {
  console.log("Server Error", err);
  res({ statusCode: 500, data: { message: "Server Error" } });
};

// Export bad routes
module.exports = defaultRoutes;
