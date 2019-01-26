/*
*  Input validation for the /checkout routes
*/

// Internal dependancies
const { validateEmail } = require("../helpers");

// Container
const validate = {};

// Validate the checkout request body
validate.checkout = payload => {
  // The email should be a string and it should match a given pattern
  const email =
    typeof payload.email.trim() === "string" &&
    validateEmail(payload.email.trim())
      ? payload.email.trim()
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
