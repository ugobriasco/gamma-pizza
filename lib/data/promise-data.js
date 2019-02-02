/*
* Library for storing and editing data
* Using promises
*/

// External dependancies
const fs = require("fs");
const path = require("path");
const util = require("util");

// Internal dependancies
const helpers = require("../helpers");

// Polyfill async filesystem for node <11.0
const open = util.promisify(fs.open);
const writeFile = util.promisify(fs.writeFile);
const close = util.promisify(fs.close);
const readFile = util.promisify(fs.readFile);
const truncate = util.promisify(fs.ftruncate);
const unlink = util.promisify(fs.unlink);
const readdir = util.promisify(fs.readdir);

//Define container
const lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname, "/../../.data/");

// Write data to a file using Promises
lib.pCreate = (dir, file, data) =>
  open(lib.baseDir + dir + "/" + file + ".json", "wx")
    .then(fileDescriptor => {
      // Convert data to string
      const stringData = JSON.stringify(data);

      // Write to file
      writeFile(fileDescriptor, stringData);
      return fileDescriptor;
    })
    .then(fileDescriptor =>
      // Close file
      close(fileDescriptor)
    );

// Read data from a file using promises
lib.pRead = (dir, file) =>
  readFile(lib.baseDir + dir + "/" + file + ".json", "utf8").then(data =>
    helpers.parseJsonToObject(data)
  );

// Update data in a file asyncronously
lib.pUpdate = (dir, file, data) =>
  open(lib.baseDir + dir + "/" + file + ".json", "r+")
    .then(fileDescriptor => {
      truncate(fileDescriptor);
      return fileDescriptor;
    })
    .then(fileDescriptor => {
      // Convert data to string
      const stringData = JSON.stringify(data);
      // Write to file
      writeFile(fileDescriptor, stringData);
      return fileDescriptor;
    })
    .then(fileDescriptor =>
      // Close file
      close(fileDescriptor)
    );

// Delete file using Promises
lib.pDelete = (dir, file) =>
  unlink(lib.baseDir + dir + "/" + file + ".json").catch(
    err => dir + file + "not found"
  );

//List all the items in a directory using Promises
lib.pList = dir =>
  readdir(lib.baseDir + dir + "/").then(data =>
    data.map(file => file.replace(".json", ""))
  );

// Export the library
module.exports = lib;
