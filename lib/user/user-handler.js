/*
* Handle request via /user
*/

//Internal dependancies
const _data = require("../data");
const getUserByEmail = require("./get-user");
const validate = require("./validate-request");
const { hash } = require("../helpers");
const { tokenGenerate } = require("../auth");

// Define container
const user = {};

// Define the rule for logging exceptions
const logError = data => console.log("\x1b[31m%s\x1b[0m", JSON.stringify(data));

// GET a single user
// Required data: email
// Optional data: none
user.getUser = (req, res) => {
  // If no email is specified, return a 400
  if (!req.headers || !req.headers.email) {
    res({
      statusCode: 400,
      data: { messsage: "No query parameter specified" }
    });
  } else {
    // Find a user with the given email
    const email = req.headers.email;
    getUserByEmail(email).then(userData => {
      // If no user found, return 404
      if (userData.statusCode === 404) {
        return res(userData);
      } else {
        // Else retrun the user without the hashed password
        const { firstName, lastName, email, address, message } = userData.data;
        res({
          statusCode: userData.statusCode,
          data: { firstName, lastName, email, address }
        });
      }
    });
  }
};

// GET list Users
// Required data: none
// Optional data: none
user.listUsers = (req, res) => {
  // List all the users
  _data
    .pList("users")
    .then(users => {
      // If no user is registered, return 404
      if (users.length === 0) {
        res({
          statusCode: 404,
          data: { messsage: "No user found" }
        });
      } else {
        // Otherwhise return the list of users
        res({
          statusCode: 200,
          data: { messsage: "Users found", users }
        });
      }
    })
    // If something else goes wrong, return 500
    .cach(err =>
      res({ statusCode: 500, data: { messsage: "Internal Error", err } })
    );
};

// POST - Create one user
// Required data: firstName, lastName, email, password, address
// Optional data: none
user.createUser = (req, res) => {
  // Validate payload and normalize data
  const {
    firstName,
    lastName,
    email,
    password,
    address,
    isValid
  } = validate.signup(req);

  // if the payload is not valid return 400
  if (!isValid) {
    res({
      statusCode: 400,
      data: { messsage: "The request body is missing the required data" }
    });
  } else {
    // Find a user with the same email
    getUserByEmail(email)
      .then(user => {
        // If an existing user is found, return 400
        if (user.statusCode === 200) {
          res({
            statusCode: 400,
            data: {
              message: "A user with the given email already exists",
              email: user.email
            }
          });
        } else {
          // Hash the password
          const hashedPassword = hash(password);

          // Build the user object to be stored
          const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            address
          };

          // Wait for user and auth token being created
          return Promise.all([
            _data.pCreate("users", email, newUser),
            tokenGenerate(newUser)
          ]).then(promises => {
            // then repond with 201, including the auth Token
            const { authToken } = promises[1];
            res({
              statusCode: 201,
              data: { message: "User created", data: { newUser, authToken } }
            });
          });
        }
      })
      .catch(err => {
        // If an internal error pos up, log it and return a 500
        logError({ method: "create user ", err });
        res({
          statusCode: 500,
          data: {
            messsage: "Internal Error - Could not create the new user",
            err
          }
        });
      });
  }
};

// PUT - Update one user
// Required data: email
// Optional data: firstName, lastName, password, address
user.updateUser = (req, res) => {
  // Validate and  normalize payload
  const {
    firstName,
    lastName,
    email,
    password,
    address,
    isValid
  } = validate.user(req);

  // If no email defined, return 400
  if (!email) {
    res({
      statusCode: 400,
      data: { messsage: "The request body is missing the required data" }
    });
  } else {
    // Find a user with the same email
    getUserByEmail(email)
      .then(user => {
        // If no user with the given email is found, return 404
        if (user.statusCode != 200) {
          return res(user);
        } else {
          // Otherwise return the stored user to be processed.
          return user;
        }
      })
      .then(user => {
        // Fetch the stored data with the ones presnt in the payload
        const updatedUserData = {
          email,
          firstName: firstName ? firstName : user.data.firstName,
          lastName: lastName ? lastName : user.data.lastName,
          password: password ? hash(password) : user.data.password,
          address: address ? address : user.data.address
        };

        // Update and save the data for the given user.
        _data.pUpdate("users", email, updatedUserData);
        return updatedUserData;
      })
      .then(updatedUserData =>
        // Return a 200
        res({
          statusCode: 200,
          data: { messsage: "User Updated", email, updatedUserData }
        })
      )
      .catch(err => {
        // If something goes wrong, return a 500 and log the error
        logError({ method: "udpate user ", ...err });
        res({
          statusCode: 500,
          data: { messsage: "Internl Error - The user was not updated" },
          ...err
        });
      });
  }
};

// DELETE - remove one user
// Required data: email
// Optional data: none
user.deleteUser = (req, res) => {
  // If no email is defined, return 400
  if (!req.headers || !req.headers.email) {
    res({
      statusCode: 400,
      data: { messsage: "The request is missing the required parameters" }
    });
  } else {
    // Normalize query parameter
    const email = req.headers.email.trim();

    getUserByEmail(email)
      .then(userData => {
        // If no user is found, then return 404
        if (userData.statusCode === 404) {
          return res(userData);
        } else {
          // Else delete the user having the given email
          return Promise.all([
            _data.pDelete("users", email),
            _data.pDelete("tokens", email),
            _data.pDelete("carts", email)
          ]);
        }
      })
      .then(() =>
        // Return 200
        res({
          statusCode: 200,
          data: { messsage: "User Deleted", email }
        })
      )
      .catch(err => {
        // If something goes wrong, return 500 and log the error
        logError(err);
        return res({
          statusCode: 500,
          data: {
            message: "Internal Error - User not deleted",
            email,
            err
          }
        });
      });
  }
};

// Export the user handlers
module.exports = user;
