/*
*  Input validation for the /cart routes
*/

// Internal dependancies
const { validateEmail } = require("../helpers");

// Container
const validate = {};

// Validate and normalize the shopping cart request body
validate.cart = payload => {
  // The email should be a string and it should match a given pattern
  const email =
    typeof payload.email.trim() === "string" &&
    validateEmail(payload.email.trim())
      ? payload.email.trim()
      : false;

  // The list of items should be an array with at least one element
  const items =
    typeof payload.items === "object" && payload.items.length > 0
      ? payload.items
      : false;

  // Evaluate the overal validity of the payload
  const isValid = items && email;

  return { email, items, isValid };
};

module.exports = validate;
