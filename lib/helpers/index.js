/*
* Generic helpers
*/

//External dependancies
const crypto = require("crypto");

// Internal dependancies
const parseRequest = require("./parse-request");
const validateEmail = require("./validate-email");

// Globals
const SECRET = "blabla";

// Define module container
const helpers = {};

// Wrapping JSON.parse to avoid the app to crash
helpers.parseJsonToObject = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
};

//Create a sha256 hash
helpers.hash = str => {
  if (typeof str === "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", SECRET)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

module.exports = { ...helpers, parseRequest, validateEmail };
