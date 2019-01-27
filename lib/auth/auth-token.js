/*
* Manage auth token
*
*/

// Internal dependancies
const helpers = require("../helpers");
const _data = require("../data");

// Container
const token = {};

// Define the rule for logging exceptions
const logError = data => console.log("\x1b[31m%s\x1b[0m", data);

// Delete a session token
token.delete = email => _data.pDelete("tokens", email);

// Extend the expiry date of a given token
token.extend = email =>
  _data
    .pRead("tokens", email)
    .then(token => ({
      id: token.id,
      email: token.email,
      expires: Date.now() + 1000 * 60 * 60
    }))
    .then(extendedToken => _data.pUpdate("tokens", email, extendedToken));

// Generate a new token
token.tokenGenerate = props => {
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
    .pCreate("tokens", email, body)
    .then(() => ({
      authToken: tokenID,
      expires
    }))
    .catch(err => {
      logError(err);
      return false;
    });
};

token.get = email =>
  _data.pRead("tokens", email).catch(err => {
    statusCode: 404;
  });

// Verifies auth headers
token.verifyToken = request => {
  const tokenID =
    request.headers && typeof request.headers.authorization == "string"
      ? request.headers.authorization
      : false;

  const email =
    request.headers && typeof request.headers.email == "string"
      ? request.headers.email
      : false;

  if (!tokenID || !email) {
    return Promise.resolve(false);
  } else {
    return _data
      .pRead("tokens", email)
      .catch(err => ({
        statusCode: 404
      }))
      .then(res => {
        // If token invalid
        if (res.statusCode === 404 || res.id != tokenID) {
          return false;
        }

        // If token expired
        if (_data.expires > Date.now()) {
          return token.delete(email).then(() => false);
        } else {
          // Else extend token
          return token.extend(email).then(() => true);
        }
      })
      .catch(err => {
        logError(err);
        return false;
      });
  }
};

module.exports = token;
