/*
*  Input validation for the /cart routes
*/

// Internal dependancies
const { validateEmail } = require("../helpers");
const { queryItems } = require("../item");

// Container
const validate = {};

// Validate and normalize the shopping cart request body
validate.cart = req => {
  const { payload, headers } = req;
  // The email should be a string and it should match a given pattern
  const email =
    typeof headers.email.trim() === "string" &&
    validateEmail(headers.email.trim())
      ? headers.email.trim()
      : false;

  // The list of items should be an array with at least one element
  const items =
    typeof payload.items === "object" && payload.items.length > 0
      ? fetchItems(payload.items)
      : false;

  // Evaluate the overal validity of the payload
  const isValid = items && email;

  return { email, items, isValid };
};

const fetchItems = items =>
  items.map(item => {
    const qty = item.qty ? item.qty : 1;
    if (item.id) {
      const fetchedItem = queryItems({ id: item.id })[0];

      return {
        ...fetchedItem,
        qty
      };
    } else {
      return { qty: 0, price: 0 };
    }
  });

// Export the validator
module.exports = validate;
