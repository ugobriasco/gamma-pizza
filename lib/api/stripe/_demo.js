/*
* Demo script for Stripe API usage
*
*/

// Internal Dependancies
const stripe = require("../stripe");

// Simple checkout
stripe
  .checkout({
    amount: 2000,
    currency: "eur",
    description: "Gamma Pizza delivery for Mr. Foo Bar",
    source: "tok_visa"
  })
  .then(data => console.log(data))
  .catch(data => console.log(data));
