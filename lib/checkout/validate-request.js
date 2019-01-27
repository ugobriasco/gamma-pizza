/*
*  Input validation for the /checkout routes
*/

// Internal dependancies
const { validateEmail } = require("../helpers");

// Container
const validate = {};

// Validate the checkout request body
validate.checkout = request => {
  const { payload, headers } = request;
  // The email should be a string and it should match a given pattern
  const email =
    typeof headers.email.trim() === "string" &&
    validateEmail(headers.email.trim())
      ? headers.email.trim()
      : false;

  //TODO input validation for credit cards
  const creditCard =
    typeof payload.creditCard == "object" ? payload.creditCard : false;

  // Test token are used by stripe test environment
  const token =
    typeof payload.token.trim() == "string" ? payload.token.trim() : false;

  // The source of payment can be a credit card or a token;
  const source = token ? token : creditCard;

  // If email and source are valid then return true
  const isValid = email && source;

  return { email, source, isValid };
};

// Expose module
module.exports = validate;
