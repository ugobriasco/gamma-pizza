/*
* Find a user given the email, returning stored data and statusCode 200
* If no user is found, return a 404
*/

// Internal dependancies
const _data = require("../data");

// Main function
const getUser = email =>
  new Promise((resolve, reject) => {
    _data.read("users", email, (err, storedData) => {
      if (err) {
        const message =
          "No registered user found with the given email. Please sign up first.";
        resolve({ statusCode: 404, data: { message, email } });
      } else {
        const message = "User found!";
        resolve({
          statusCode: 200,
          data: { message, ...storedData }
        });
      }
    });
  });

module.exports = getUser;
