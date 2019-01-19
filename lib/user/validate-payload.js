/*
* Validate payload for /user
*/

// Internal dependancies
const { validateEmail } = require("../helpers");

// Main function
const validatePayload = payload => {
  // The first name shall be a string and have at least one char
  const firstName =
    typeof payload.firstName == "string" && payload.firstName.trim().length > 0
      ? payload.firstName.trim()
      : false;

  // The last name shall be a string and have at least one char
  const lastName =
    typeof payload.lastName == "string" && payload.lastName.trim().length > 0
      ? payload.lastName.trim()
      : false;

  // The passwordshall be a string and have at least one char
  const password =
    typeof payload.password == "string" && payload.password.trim().length > 0
      ? payload.password.trim()
      : false;

  // The email should be a string and it should match a gien pattern
  const email =
    typeof payload.email == "string" && validateEmail(payload.email.trim())
      ? payload.email.trim()
      : false;

  // The address should be an object
  const address = typeof payload.address == "object" ? payload.address : false;
  // // TODO: check address consinstancy

  // The payload is valid if all the checks are true
  const isValid = firstName && lastName && password && email;

  // Return the validated and normalized object
  return { firstName, lastName, password, email, address, isValid };
};

module.exports = validatePayload;
