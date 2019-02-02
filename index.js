/*
* Primary file for API
*/

// External Dependancies
const exec = require("child_process").exec;

// Internal Dependancies
const server = require("./lib/server");

// Declare the main application
const app = {
  start: () => {
    // Setup application (init directories, genreate keys)
    exec("sh ./scripts/init.sh", (error, stdout, stderr) => {
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    });

    // Start the server
    server.start();
  }
};

// Start the application
app.start();

// Export the application
module.exports = app;
