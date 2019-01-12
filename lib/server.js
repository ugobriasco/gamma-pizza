/*
* The Server
*/

// External Dependancies
const http = require("http");
const https = require("https");

// Internal Dependancies
const { parseRequest } = require("./util/parse-request");
const PORT = 3000;

// http server
const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

// https Server
//server.httpsServer = https.createServer((req, res) => {});

//All the server logic for  for both the http and the https server
const unifiedServer = (req, res) => {
  parseRequest(req)
    .then(req => {
      // TODO: route the request to the related handler
      console.log(req);
      return { statusCode: 200, data: { message: "Here a slice of pizza" } };
    })
    .then(({ statusCode, data }) => {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(JSON.stringify(data));
    });
};

// Start the server
const start = function() {
  httpServer.listen(PORT, () =>
    console.log(
      "\x1b[36m%s\x1b[0m",
      `Γ🍕 - Gamma Pizza API listening to port ${PORT}`
    )
  );
};

module.exports = { start };
