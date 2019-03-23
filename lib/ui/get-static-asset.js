/*
* Get the static asset from the given public directory
*/

// Dependancies
const path = require("path");
const fs = require("fs");
const util = require("util");

// Polyfill async filesystem for node <11.0
const readFile = util.promisify(fs.readFile);
const publicDir = path.join(__dirname, "../../assets/public/");

const getStaticAsset = filename =>
  readFile(dir + fileName).catch(err => {
    console.log("No asset found");
    return false;
  });

module.exports = getStaticAsset;
