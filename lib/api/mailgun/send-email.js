// curl -s --user 'api:YOUR_API_KEY' \
//     https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
//     -F from='Excited User <mailgun@YOUR_DOMAIN_NAME>' \
//     -F to=YOU@YOUR_DOMAIN_NAME \
//     -F to=bar@example.com \
//     -F subject='Hello' \
//     -F text='Testing some Mailgun awesomeness!'

/*
* Send an email via mailgun
*
*/

// External dependancies
const StringDecoder = require("string_decoder").StringDecoder;
const querystring = require("querystring");

// Internal dependancies
const helpers = require("../../helpers");
const validatePayload = require("./validate-payload");

// Configuration
const PROTOCOL = "https:";
const HOSTNAME = "api.mailgun.net";
const DOMAIN_NAME = helpers.appConfig.mailgun.domainName;
const APIKEY = helpers.appConfig.mailgun.apiKey;

// Main function
const sendEmail = payload => {
  const { from, to, subject, text } = validatePayload(payload);
  const isValid = true;
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
  const emailPayload = {
    from: `Γ🍕 - Gamma Pizza <mailgun@${DOMAIN_NAME}>`,
    to,
    subject,
    text
  };

  // Stringify payload
  const stringEmailPayload = querystring.stringify(emailPayload);

  // Congifure request request details
  const options = {
    protocol: PROTOCOL,
    hostname: HOSTNAME,
    method: "POST",
    path: `/v3/${DOMAIN_NAME}/messages`,
    auth: `api:${APIKEY}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(stringEmailPayload)
    }
  };

  console.log(options, emailPayload);

  return helpers.httpsPromise(options, stringEmailPayload).then(res => {
    const message =
      res.statusCode == 200
        ? `Receipt sent to ${to}`
        : `The email was not sent`;

    return { statusCode: res.statusCode, data: { message } };
  });
};

module.exports = sendEmail;
