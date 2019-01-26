/*
* Manage auth token
*
*/

// Internal dependancies
const helpers = require("../helpers");
const _data = require("../data");

const token = {};

// Define the rule for logging exceptions
const logError = data => console.log("\x1b[31m%s\x1b[0m", data);

token.delete = tokenID => pDelete("tokens", tokenID);

token.extend = tokenID =>
  _data.pUpdate("tokens", tokenID, { expires: Date.now() + 1000 * 60 * 60 });

token.generate = props => {
  const { email } = props;

  // The tokenID shall be a string with 20 random generated characters
  const tokenID = helpers.generateRandomString(20);

  // The token shall expire after 1hour
  const expires = Date.now() + 1000 * 60 * 60;

  // Build token body
  const body = {
    id: tokenID,
    email,
    expires
  };

  return _data
    .pCreate("tokens", tokenID, body)
    .then(() => ({
      authToken: tokenID,
      expires
    }))
    .catch(err => {
      logError(err);
      return false;
    });
};

token.verify = props => {
  const { tokenID, email } = props;
  _data
    .pRead("tokens", tokenID)
    .then(res => {
      const { statusCode, data } = res;

      // If token invalid
      if (statusCode > 299 || data.email == email) {
        return false;
      }

      // If token expired
      if (data.expires > Date.now()) {
        return token.delete(tokenID).then(() => false);
      } else {
        // Else extend token
        return token.extend(tokenID).then(() => true);
      }
    })
    .catch(err => {
      logError(err);
      return false;
    });
};

module.exports = token;
