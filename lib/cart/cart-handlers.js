/*
* Handle requests via /cart
*/

//Internal dependancies
const _data = require("../data");
const { getUserByEmail } = require("../user");
const validate = require("./validate-request");
const getCart = require("./get-cart");
const deleteCart = require("./delete-cart");
const stripe = require("../api/stripe");

// Define container
const cart = {};

// Define the rule for logging exceptions
const logError = data => console.log("\x1b[31m%s\x1b[0m", data);

// POST create a shopping cart
// Required data: user-email
// Optional data: a pizza
cart.postCart = (req, res) => {
  // Validate the request
  const { email, items, isValid } = validate.cart(req);

  // If the payload is invalid return a 400
  if (!isValid) {
    return res({
      statusCode: 400,
      data: { messsage: "The request body is missing the required data" }
    });
  } else {
    Promise.all([getUserByEmail(email), getCart(email)])
      .then(promises => {
        // If no user is found, then return 404
        if (promises[0].statusCode === 404) {
          return res(promises[0]);
        }

        // If the cart already exists, then return 400
        if (promises[1].statusCode === 200) {
          console.log(promises[1]);
          const message =
            "A shopping cart with the given email already exists. Please use the existing one.";
          return res({ statusCode: 400, data: { message, email } });
        }

        // Else save new cart
        else {
          // Define a new cart
          const newCart = {
            email,
            items
          };

          // Create new file using promises and return 201
          return _data.pCreate("carts", email, newCart).then(() =>
            res({
              statusCode: 201,
              data: { message: "Shopping cart created", newCart }
            })
          );
        }
      })
      // If something goes wrong log it and return 500
      .catch(err => {
        logError(err);
        return res({
          statusCode: 500,
          data: { message: "Internal Error - Shopping cart not created", err }
        });
      });
  }
};

// GET /shopping-cart a shopping cart
// Required data: user-email
// Optional data: none
cart.getCart = (req, res) => {
  // If the query prameter is not set, return 400
  if (!req.headers || !req.headers.email) {
    res({
      statusCode: 400,
      data: { messsage: "The request is missing the required parameters" }
    });
  } else {
    // Get the shopping cart related to the given email.
    getCart(req.headers.email.trim())
      .then(cart => {
        res(cart);
      })
      // If it does not exist, return 404
      .catch(err => res(err));
  }
};

// DELETE a shopping cart
// Required data: user-email || id
// Optional data: none
cart.deleteCart = (req, res) => {
  // If the query prameter is not set, return 400
  if (!req.headers || !req.headers.email) {
    res({
      statusCode: 400,
      data: { messsage: "The request is missing the required parameters" }
    });
  } else {
    // Normalize query parameter
    const email = req.headers.email.trim();
    // Get the cart assigned to the given email
    deleteCart(email)
      // If something goes wrong, report it
      .then(() =>
        res({
          statusCode: 200,
          data: { message: "Shopping cart deleted", email }
        })
      )
      .catch(err => {
        logError(err);
        return res({
          statusCode: 500,
          data: { message: "Internal Error - Shopping cart not deleted", err }
        });
      });
  }
};

// PUT update content of shopping cart
// Required data: user-email || id
// Optional data: payload of pizza
cart.updateCart = (req, res) => {
  // Payload validation
  const { email, items, isValid } = validate.cart(req);

  //If payload invalid, return 400
  if (!isValid) {
    return res({
      statusCode: 400,
      data: { messsage: "The request body is missing the required data" }
    });
  } else {
    Promise.all([getUserByEmail(email), getCart(email)]).then(promises => {
      // If the user or the cart do not exist, then 404
      const failedPromise = promises.find(promise => promise.statusCode != 200);
      if (failedPromise) {
        return res(failedPromise);
      }

      // Update the cart
      _data
        .pUpdate("carts", email, { items })
        .then(message =>
          res({
            statusCode: 200,
            data: { message: "Shopping cart updated", items, email }
          })
        )
        .catch(err => res({ statusCode: 500, data: { message: err, email } }));
    });
  }
};

// Export the handlers
module.exports = cart;
