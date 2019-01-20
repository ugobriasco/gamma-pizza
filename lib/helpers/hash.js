/*
* Create a sha256 hash
*
*/

//External dependancies
const crypto = require("crypto");

// Internal dependancies
const appConfig = require("./get-config");

module.exports = str => {
  if (typeof str === "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", appConfig.hashingSecret)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};
