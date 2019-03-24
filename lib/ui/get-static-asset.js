/*
* Get the static asset from the given public directory
*/

// Dependancies
const path = require("path");
const fs = require("fs");
const util = require("util");

// Polyfill async filesystem for node <11.0
const readFile = util.promisify(fs.readFile);

// Defining the public folder
const publicDir = path.join(__dirname, "../../assets/public/");

// Set the proper directry for the given asset extension
const getDir = fileName => {
  if (fileName.indexOf(".css") > -1) {
    // All styles are placed under /css
    return publicDir + "css/";
  }
  if (fileName.indexOf(".js") > -1) {
    // All the js is placed under /js
    return publicDir + "js/";
  }
  if (fileName.indexOf(".jpg") > -1 || fileName.indexOf(".png") > -1) {
    // All the images are placed under /img
    return publicDir + "img/";
  } else {
    // the default dir is in the root public folder
    return publicDir;
  }
};

// Read the given asset name from file sistem
const getStaticAsset = fileName => {
  const dir = getDir(fileName);
  console.log(dir);
  return readFile(dir + fileName).catch(err => {
    console.log("No asset found");
    return false;
  });
};

module.exports = getStaticAsset;
