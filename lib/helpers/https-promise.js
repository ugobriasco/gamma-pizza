/*
* Prmosify https request
* This is a ployfill for node <v11
*/

// External dependancies
const https = require("https");
const StringDecoder = require("string_decoder").StringDecoder;

// Internal dependancies
const parseJsonToObject = require("./parse-json2object");

// Main function
const pHttps = (options, stringPayload) => {
  // use Promises
  return new Promise((resolve, reject) => {
    // Define the request body
    const req = https.request(options, res => {
      // use utf8 dencoding
      const decoder = new StringDecoder("utf-8");

      // Define a buffer and the data containers
      let buffer = "";
      let data = {};

      // Use streams
      res.on("data", chunk => (buffer += chunk));
      res.on("error", reject);
      res.on("end", () => {
        // decode the data collected
        buffer += decoder.end();

        // parse the data to json
        data = parseJsonToObject(buffer);

        // If an error pos up return the bad news.
        if (res.statusCode >= 500) {
          reject({ statusCode: res.statusCode, body: data });
        } else {
          // Otherwise return the decoded data
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        }
      });
    });

    // Execute the request
    req.on("error", reject);
    req.write(stringPayload);
    req.end();
  });
};

// Export the module
module.exports = pHttps;
