/*
* Find a user given the email, returning stored data and statusCode 200
* If no user is found, return a 404
*/

// Internal dependancies
const _data = require("../data");

// Main function
const getUser = email =>
  _data
    .pRead("users", email)
    .then(storedData => ({ statusCode: 200, data: { ...storedData } }))
    .catch(err => {
      const message = "No registered user found with the given email.";
      return { statusCode: 404, data: { message, email } };
    });
module.exports = getUser;
