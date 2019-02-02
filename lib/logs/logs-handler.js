/*
 * Library for storing and rotating logs
 *
 */

// External Dependencies
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const util = require("util");

// Polyfill async filesystem for node <11.0
const open = util.promisify(fs.open);
const append = util.promisify(fs.append);
const writeFile = util.promisify(fs.writeFile);
const close = util.promisify(fs.close);
const readFile = util.promisify(fs.readFile);
const truncate = util.promisify(fs.ftruncate);
const readdir = util.promisify(fs.readdir);
const pzlib = util.promisify(zlib);
const unzip = util.promisify(zlib.unzip);

// Container for module (to be exported)
const lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname, "/../.logs/");

// Append a string to a file. Create the file if it does not exist
lib.append = (file, str) => {
  // Open the file for appending
  open(lib.baseDir + file + ".log", "a")
    // Append to file
    .then(fileDescriptor => {
      return append(fileDescriptor, str, +"\n").then(() => fileDescriptor);
    })
    // Close the file
    .then(fileDescriptor => close(fileDescriptor));
};

// List all the logs, and optionally include the compressed logs
lib.list = includeCompressedLogs => {
  readdir(lib.baseDir).then(data => {
    let trimmedFileNames = [];
    data.forEach(fileName => {
      // Add the .log files
      if (fileName.indexOf(".log") > -1) {
        trimmedFileNames.push(fileName.replace(".log", ""));
      }
      // Add the .gz files
      if (fileName.indexOf(".gz.b64") > -1 && includeCompressedLogs) {
        trimmedFileNames.push(fileName.replace(".gz.b64", ""));
      }

      return trimmedFileNames;
    });
  });
};

// Compress the contents of one .log file into a .gz.b64 file
// within the same directory
lib.compress = (logId, newFileId, callback) => {
  const sourceFile = logId + ".log";
  const destFile = newFileId + ".gz.b64";

  return readFile(lib.baseDir + sourceFile, "utf8")
    .then(inputString => pzlib(inputString))
    .then(buffer => {
      return open(lib.baseDir + destFile, "wx")
        .then(fileDescriptor =>
          writeFile(fileDescriptor, buffer.toString("base64"))
        )
        .then(close(fileDescriptor));
    });
};

// Decompress the contents of a .gz file into a string variable
lib.decompress = (fileId, callback) => {
  const fileName = fileId + ".gz.b64";
  readFile(lib.baseDir + fileName, "utf8")
    .then(str => Buffer.from(str, "base64"))
    .then(iBuffer => unzip(iBuffer))
    .then(oBuffer => oBuffer.toString());
};

// Truncate a log file
lib.truncate = logId => truncate(lib.baseDir + logId + ".log", 0);

// Export the module
module.exports = lib;
