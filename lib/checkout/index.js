/*
* Handle request via /checkout
*
*/

// External dependancies

// Internal dependancies
const _data = require("../data");
const { getUserByEmail } = require("../user");
const { getCartByEmail, deleteCartByEmail } = require("../cart");
const { createOrder } = require("../order");
const validate = require("./validate-payload");
const stripe = require("../api/stripe");
const mailgun = require("../api/mailgun");

// Define the rule for logging exceptions
const logError = data => console.log("\x1b[31m%s\x1b[0m", data);

// POST checkout
// Required data: user-email||id, payment payload
// Optional data: none
const checkout = (req, res) => {
  // Validate the Payload
  const { email, source, isValid } = validate.checkout(req.payload);

  if (!isValid) {
    res({
      statusCode: 400,
      data: { messsage: "The request body is missing the required data" }
    });
  } else {
    // Get the cart given the email
    Promise.all([
      getUserByEmail(email),
      getCartByEmail(email),
      stripe.getCurrencyRules("EUR")
    ])
      .then(promises => {
        // Get the user profile
        const user = promises[0].data;

        // Get the shopping cart
        const shoppingCart = promises[1].data.storedData.items;

        // currency symbol, currency base and minimum amount for being processed by stripe
        const { symbol, base, min_amount } = promises[2];

        // Calculate amount to be payd
        const amount = shoppingCart.reduce((prev, curr) => {
          const price = curr.price ? curr.price : 0;
          const qty = curr.qty ? curr.qty : 1;
          return prev + price * qty * base;
        }, 0);

        // If the amount is below a certain thereshold, return 400
        if (amount < min_amount) {
          res({
            statusCode: 400,
            data: {
              messsage: `The minimum amount to be processed is ${min_amount}${symbol}`
            }
          });
        } else {
          // Else build the checkout body
          const currency = symbol;
          const description = `Gamma Pizza delivery for ${user.firstName} ${
            user.lastName
          }`;

          // Return an object to by consumed for checkout, placing orderd and receipt
          return {
            checkoutPayload: { amount, currency, description, source },
            user,
            shoppingCart
          };
        }
      })
      .then(_data =>
        // use stripe API
        stripe
          // Do the chackout
          .checkout(_data.checkoutPayload)
          .then(response => {
            // Evaluate response
            const { statusCode, body, headers } = response;
            if (statusCode >= 300) {
              logError(`POST api.stripe.com ${statusCode}`);
              logError(JSON.stringify(response));
              return response;
            }

            // Grab some interesting data from transaction response body
            const { id, object, amount, currency, paid } = body;

            // Create an order
            return createOrder({
              items: _data.shoppingCart,
              user: _data.user
            }).then(order => {
              // If success return a summary of the checkout
              return {
                statusCode: 200,
                data: {
                  payment: {
                    transactionID: id,
                    amount,
                    currency,
                    paid
                  },
                  order
                }
              };
            });
          })
          // Error handling
          .catch(err => {
            logError(err);
            return {
              statusCode: 500,
              data: { message: "Server Error", _data, err }
            };
          })
      )
      .then(_res => {
        // TODO build receipt
        const message = "Order sent";

        return mailgun
          .sendEmail({
            to: _res.data.order.email,
            subject: "Your order have been placed!",
            message
          })
          .then(receipt => {
            console.log(receipt);
            const { payment, order } = _res.data;
            return {
              statusCode: 200,
              data: { payment, order, receipt }
            };
          })
          .catch(err => {
            logError(err);
            return { ..._res, receipt: false, err };
          });
      })
      // Forward result to client
      .then(data => res(data));
  }
};

module.exports = checkout;
