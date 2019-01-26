/*
* Handle requests via /auth
*
*/

// External dependancies

// Internal dependancies
const _data = require("../data");
const { getUserByEmail } = require("../user");
const verifyPassword = require("./password-verify");
const token = require("./auth-token");
const validate = require("./validate-payload");

// Define the rule for logging exceptions
const logError = data => console.log("\x1b[31m%s\x1b[0m", data);

// Container for auth methods
const auth = {};

// Auth - postToken
// Required data: email, password
// Optional data: none
auth.login = (req, res) => {
  const { email, password, isValid } = validate.login(req.payload);

  if (!isValid) {
    res({
      statusCode: 400,
      data: {
        message: "The request body is missing the required data"
      }
    });
  } else {
    // Get the user who maches the given email
    getUserByEmail(email)
      .then(userData => ({
        user: userData.data,
        isVerified: verifyPassword({
          userData,
          submittedPassword: password
        })
      }))
      .then(userVerification => {
        if (!userVerification.isVerified) {
          // If user not verified return 403
          res({
            statusCode: 403,
            data: { message: "Failed utenthicating user." }
          });
        } else {
          // Generate auth token
          return token.generate(userVerification.user).then(token => {
            if (!token) {
              // If something goes wrong return 500
              logError("Cannot generate token");
              res({
                statusCode: 500,
                data: { message: "Internal Error - Token not generated" }
              });
            } else {
              // Else return the token
              const { authToken, expires } = token;
              res({
                statusCode: 200,
                data: { message: "User verified", authToken, expires }
              });
            }
          });
        }
      })
      .catch(err => {
        // Handle exceptions
        logError(err);
        res({
          statusCode: 500,
          data: { message: "Internal Error", err }
        });
      });
  }
};

// Auth - postLogout
// Required data: email, authToken
// Optional data: none
auth.logout = (req, res) => {
  const { email, authToken, isValid } = validate.logout(req);

  if (!isValid) {
    res({
      statusCode: 400,
      data: {
        message: "The request body is missing the required data"
      }
    });
  } else {
    token.verify({ email, authToken }).then(isVerified => {
      if (!isVerified) {
        res({
          statusCode: 403,
          data: { message: "Invalid token" }
        });
      } else {
        token.delete(token);
        res({ statusCode: 204 });
      }
    });
  }
};

module.exports = auth;
