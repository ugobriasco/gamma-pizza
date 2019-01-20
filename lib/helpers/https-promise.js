/*
* Prmosify https request
*
*/

// External dependancies
const https = require("https");
const StringDecoder = require("string_decoder").StringDecoder;

// Internal dependancies
const parseJsonToObject = require("./parse-json2object");

// Main function
module.exports = (options, stringPayload) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      const decoder = new StringDecoder("utf-8");
      let buffer = "";
      let data = {};
      res.on("data", chunk => (buffer += chunk));
      res.on("error", reject);
      res.on("end", () => {
        buffer += decoder.end();
        data = parseJsonToObject(buffer);
        if (res.statusCode >= 500) {
          reject({ statusCode: res.statusCode, body: data });
        } else {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        }
      });
    });
    req.on("error", reject);
    req.write(stringPayload);
    req.end();
  });
};
