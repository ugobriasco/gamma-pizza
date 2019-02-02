/*
* Create a sha256 hash
*
*/

//External dependancies
const crypto = require("crypto");

// Internal dependancies
const appConfig = require("./get-config");

// Main function
const hash = str => {
  // Validate the input
  if (typeof str === "string" && str.length > 0) {
    // hash the given string
    const hash = crypto
      // apply sha245 encription usint the given secret
      .createHmac("sha256", appConfig.hashingSecret)
      // apply the has tho the given string
      .update(str)
      // use hex annotation
      .digest("hex");
    return hash;
  } else {
    // If the input is invalid return false
    return false;
  }
};

// Export the module
module.exports = hash;
