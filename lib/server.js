/*
* The Server
*/

// External Dependancies
const http = require("http");
const https = require("https");
var util = require("util");
var debug = util.debuglog("server");

// Internal Dependancies
const { parseRequest } = require("./helpers/parse-request");
const router = require("./routes");
const { appConfig } = require("./helpers");

// Globals
const PORT = appConfig.httpPort;

// Module container
const server = {};

// http server
server.httpServer = http.createServer((req, res) => {
  server.unifiedServer(req, res);
});

// TODO: https Server
//server.httpsServer = https.createServer((req, res) => {});

//All the server logic for  for both the http and the https server
server.unifiedServer = (req, res) => {
  parseRequest(req).then(req => {
    debug("\x1b[32m%s\x1b[0m", JSON.stringify(req, null, 4));
    const chosenHandler =
      typeof router[req.path] !== "undefined" && router[req.path][req.method]
        ? router[req.path][req.method]
        : router.notFound;

    chosenHandler(req, response => {
      const { statusCode, data } = response;

      if (statusCode == 200) {
        debug(
          "\x1b[32m%s\x1b[0m",
          req.method.toUpperCase() + " /" + req.path + " " + statusCode
        );
      } else {
        debug(
          "\x1b[31m%s\x1b[0m",
          req.method.toUpperCase() + " /" + req.path + " " + statusCode
        );
      }

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(JSON.stringify(data));
    });
  });
};

// Start the server
server.start = function() {
  server.httpServer.listen(PORT, () =>
    console.log(
      "\x1b[36m%s\x1b[0m",
      `Γ🍕 - Gamma Pizza API listening to port ${PORT}`
    )
  );

  //TODO start https server
};

module.exports = server;
