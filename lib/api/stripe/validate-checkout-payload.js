/*
* Validate the payload of the chaeckout to be submitted to stripe
*/

// Internal dependancies
const availableCurrencies = require("./currencies-available");

// Main function
function validateCheckoutPayload(payload) {
  const { amount, currency, source, description } = payload;

  //Get currency rules
  const currencyRule = availableCurrencies.getCurrencyRules(currency);

  // Validation container
  const validate = {};

  // The amount shall be a positive number, highrer than 0;
  validate.amount =
    typeof amount == "number" && amount > currencyRule.min_amount
      ? amount * currencyRule.base
      : false;

  // The currency shall be a string included in a given list;
  validate.currency =
    typeof currency == "string" && currencyRule.symbol
      ? currencyRule.symbol
      : false;

  // The token shall be a string
  validate.source =
    typeof source == "object" || typeof source == "string" ? source : false;

  //The description shall be a string
  validate.description =
    typeof description == "string" ? description : "Payment to Gama-Pizza";

  //Define the conversion base
  validate.base = currencyRule.base;

  //Check if the currency is allowed
  validate.isAllowed = currencyRule.isEnabled;

  //Validation flag (logic AND of the above defined criteria)
  validate.isValid =
    validate.amount &&
    validate.currency &&
    validate.source &&
    validate.base &&
    validate.isAllowed;

  return validate;
}

module.exports = validateCheckoutPayload;
