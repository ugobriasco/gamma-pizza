/*
*  Input validation for the /cart routes
*/

// Internal dependancies
const { validateEmail } = require("../helpers");

// Main function
function validatePayload(payload) {
  // An email should be a string
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

  return { ...payload, isValid };
}

module.exports = validatePayload;
