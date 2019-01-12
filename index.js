/*
* Primary file for API
*/

// Dependancies
const server = require("./lib/server");

// Declare the main application
const app = {
  init: function() {
    // Start the server
    server.start();
  }
};

app.init();

module.exports = app;
