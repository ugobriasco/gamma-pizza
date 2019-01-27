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
const { verifyToken } = require("./auth");

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
  // Parse request data
  parseRequest(req)
    .then(req => {
      // Check if the given path is set as private
      if (
        typeof router[req.path] !== "undefined" &&
        router[req.path].isPrivate
      ) {
        // If this is the case, procede with the verification of the headers
        return verifyToken(req).then(isVerified => ({
          ...req,
          isVerified
        }));
      } else {
        return req;
      }
    })
    .then(req => {
      debug("\x1b[36m%s\x1b[0m", JSON.stringify(req, null, 4));
      // In case of verificaion unsuccesful, return 403
      if (req.isVerified === false) {
        debug(
          "\x1b[33m%s\x1b[0m",
          req.method.toUpperCase() + " /" + req.path + " " + 403
        );
        res.setHeader("Content-Type", "application/json");
        res.writeHead(403);
        res.end(JSON.stringify({ message: "Unauthorized" }));
      } else {
        // Else choose related hanlder
        const chosenHandler =
          typeof router[req.path] !== "undefined" &&
          router[req.path][req.method]
            ? router[req.path][req.method]
            : router.notFound;

        // Execute the selected handler
        chosenHandler(req, response => {
          const { statusCode, data } = response;

          // log response
          if (statusCode < 300) {
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

          //Send response
          res.setHeader("Content-Type", "application/json");
          res.writeHead(statusCode);
          res.end(JSON.stringify(data));
        });
      }
    })
    .catch(err => console.log("\x1b[31m%s\x1b[0m", err));
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
