/*
* Primary file for API
*/

const exec = require("child_process").exec;

// Dependancies
const server = require("./lib/server");

// Declare the main application
const app = {
  init: function() {
    // Initialize directories
    exec("sh ./scripts/init.sh", (error, stdout, stderr) => {
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    });

    // Start the server
    server.start();
  }
};

app.init();

module.exports = app;
