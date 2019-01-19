/*
* Handle requests via /cart
*/

//Internal dependancies
const _data = require("../data");

// Define container
const cart = {};

// Define the rule for logging exceptions
const logError = data => console.log("\x1b[31m%s\x1b[0m", data);

// POST create a shopping cart
// Required data: user-email
// Optional data: a pizza
cart.postCart = (req, res) => {
  // Validate the payload
  const { email, items, isValid } = validatePayload(req.payload);

  // If the payload is invalid return a 400
  if (!isValid) {
    res({
      statusCode: 400,
      data: { messsage: "The request body is missing the required data" }
    });
  } else {
    const validateCart = new Promise((resolve, reject) => {
      _data.read("carts", email, (err, storedData) => {
        if (!err) {
          const message =
            "A shopping cart with the given email already exists. Please use the existing one.";
          reject({ statusCode: 400, data: { message, email } });
        } else {
          resolve(email);
        }
      });
    });

    const validateUser = new Promise((resolve, reject) => {
      _data.read("users", email, (err, storedData) => {
        if (err) {
          const message =
            "No registered user found with the given email. Please sign up first.";
          reject({ statusCode: 400, data: { message, email } });
        } else {
          resolve(email);
        }
      });
    });

    return Promise.all([validateCart, validateUser])
      .then(() => {
        const newCart = {
          email,
          items
        };
        _data.create("carts", email, newCart, err => {
          if (err) {
            res({
              statusCode: 500,
              data: { message: "Internal Error - Shopping cart not created" }
            });
          } else {
            res({
              statusCode: 201,
              data: { message: "Cart created", newCart }
            });
          }
        });
      })
      .catch(err => {
        console.log(err);
        return res(err);
      });
  }
};

// GET /shopping-cart a shopping cart
// Required data: user-email || id
// Optional data: none

// DELETE a shopping cart
// Required data: user-email || id
// Optional data: none

// PUT update content of shopping cart
// Required data: user-email || id
// Optional data: payload of pizza

// POST checkout
// Required data: user-email||id, payment payload
// Optional data: none

function validatePayload(payload) {
  // // An email should be a string
  const email = typeof payload.email === "String" ? payload.email : false;

  // the list of items should be an array with at least one element
  const items =
    typeof payload.items === "Object" && payload.items.length > 0
      ? payload.items
      : false;

  return { ...payload, isValid: true };
}

module.exports = cart;
