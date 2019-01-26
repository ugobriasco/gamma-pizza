/*
* Extends util
*
*/

// Internal dependancies
const parseRequest = require("./parse-request");
const validateEmail = require("./validate-email");
const appConfig = require("./get-config");
const httpsPromise = require("./https-promise");
const parseJsonToObject = require("./parse-json2object");
const hash = require("./hash");
const generateRandomString = require("./generate-random-string");

// Expose public methods
module.exports = {
  parseJsonToObject,
  parseRequest,
  validateEmail,
  appConfig,
  httpsPromise,
  hash,
  generateRandomString
};
