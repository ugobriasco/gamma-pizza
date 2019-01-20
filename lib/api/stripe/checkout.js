/*
* Perform a simple checkout with the Sripe API
*
*/

// External dependancies
const StringDecoder = require("string_decoder").StringDecoder;
const querystring = require("querystring");

// Internal dependancies
const validateCheckoutPayload = require("./validate-checkout-payload");
const helpers = require("../../helpers");

// Configuration
const PROTOCOL = "https:";
const HOSTNAME = "api.stripe.com";
const APIKEY = helpers.appConfig.stripe.apiKey;

// Main function
module.exports = payload => {
  const {
    amount,
    currency,
    source,
    description,
    base,
    isValid
  } = validateCheckoutPayload(payload);

  // Return a 400 if the payload does not pass the input validation
  if (!isValid) {
    return new Promise(resolve =>
      resolve({
        statusCode: 400,
        data: { message: "The payload provided is invalid" }
      })
    );
  }

  // Build payload
  const checkoutPayload = {
    amount,
    currency,
    source,
    description
  };

  // Stringify payload
  const stringPayload = querystring.stringify(payload);

  // Configure the request details
  const options = {
    protocol: PROTOCOL,
    hostname: HOSTNAME,
    method: "POST",
    path: "/v1/charges",
    auth: APIKEY,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(stringPayload)
    }
  };

  return helpers.httpsPromise(options, stringPayload);
};
