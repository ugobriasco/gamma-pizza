/*
* Handling exceptions
*/

const badRoutes = {};

// 4XX
// handling not notfound
badRoutes.notFound = (req, res) => {
  console.log("Not found");
  res({ statusCode: 404, data: { message: "Route not found" } });
};

// handling a bad request
badRoutes.badRequest = (req, res) => {
  console.log("bad request");
  res({ statusCode: 400, data: { message: "Route not found", request } });
};

// 5XX
// handling server errors
badRoutes.serverError = (req, res) => {
  console.log("Server Error", err);
  res({ statusCode: 500, data: { message: "Server Error" } });
};

module.exports = badRoutes;
