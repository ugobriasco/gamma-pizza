/*
*  Input validation for the /auth routes
*/

// Internal dependancies
const { validateEmail } = require("../helpers");

// Container
const validate = {};

// Validate and normalize the login payload.
validate.login = req => {
  const { payload } = req;
  // The email should be a string and it should match a given pattern.
  const email =
    typeof payload.email.trim() == "string" &&
    validateEmail(payload.email.trim())
      ? payload.email.trim()
      : false;
  // The password should be a string not empty.
  const password =
    typeof payload.password == "string" ? payload.password : false;

  // Evaluate the overal validity of the payload.
  const isValid = password && email;

  return { email, password, isValid };
};

// Validate and normalize the logout request
validate.logout = req => {
  const { payload, headers } = req;
  // The email should be a string and it should match a given pattern
  const email =
    typeof headers.email.trim() == "string" &&
    validateEmail(headers.email.trim())
      ? headers.email.trim()
      : false;

  // The auth token shall be included in the header and be a string
  const authToken =
    typeof headers.authorization == "string" && headers.authorization.length > 0
      ? headers.authorization
      : false;

  // Evaluate the overal validity of the payload
  const isValid = authToken && email;

  return { email, authToken, isValid };
};

module.exports = validate;
