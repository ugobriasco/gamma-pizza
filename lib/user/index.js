/*
* Handle request via /user
*/

// External dependancies

//Internal dependancies
const validatePayload = require("./validate-payload");
const _data = require("../data");
const { hash } = require("../helpers");

// Define container
const user = {};

const logError = data => console.log("\x1b[31m%s\x1b[0m", data);

// GET a single user
// Required data: email
// Optional data: none
user.getUser = (req, res) => {
  if (req.params && req.params.email) {
    const email = req.params.email;

    // Get data related to the given email
    _data.read("users", email, (err, user) => {
      if (err) {
        // If no user found return 404
        res({
          statusCode: 404,
          data: { messsage: "No user found" },
          err
        });
      } else {
        // Return the user found
        res({ statusCode: 200, data: { messsage: "User found", user } });
      }
    });
  } else {
    // If no email is specified return 400
    res({
      statusCode: 400,
      data: { messsage: "No query parameter specified" }
    });
  }
};

// GET list Users
// Required data: none
// Optional data: none
user.listUsers = (req, res) => {
  // List all the users
  _data.list("users", (err, users) => {
    // if no user exists return 404
    if (err) {
      res({ statusCode: 404, data: { messsage: "No user found", err } });
    }
    // Else return an array of users
    res({ statusCode: 200, data: { messsage: "Users found", users } });
  });
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
  } = validatePayload(req.payload);

  // if the payload is not valid return 400
  if (!isValid) {
    res({
      statusCode: 400,
      data: { messsage: "The request body is missing the required data" }
    });
  } else {
    // Else, look for an existing user
    _data.read("users", email, (err, user) => {
      // If a user is already registered with the same email, return 400
      if (!err) {
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

        // Save the new user
        _data.create("users", email, newUser, err => {
          // If an error occurs return 500
          if (err) {
            logError({ method: "create user ", err, newUser });
            res({
              statusCode: 500,
              data: {
                messsage: "Internal Error - Could not create the new user",
                err
              }
            });
          } else {
            // Else return a 201
            res({ statusCode: 201, data: { message: "User created", user } });
          }
        });
      }
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
  } = validatePayload(req.payload);

  // If no email defined, return 400
  if (!email) {
    res({
      statusCode: 400,
      data: { messsage: "The request body is missing the required data" }
    });
  } else {
    // Read the user directory
    _data.read("users", email, (err, storedData) => {
      // if no user with the given email is found, then return 404
      if (err) {
        res({
          statusCode: 404,
          data: { messsage: "No user found" },
          err
        });
      } else {
        // Fetch the stored data with the ones presnt in the payload
        const userData = {
          firstName: firstName ? firstName : storedData.firstName,
          lastName: lastName ? lastName : storedData.lastName,
          password: password ? hash(password) : storedData.password,
          address: address ? address : storedData.address
        };

        // Update and save the user
        _data.update("users", email, userData, err => {
          // If an error occurs, return 500
          if (err) {
            logError({ method: "udpate user ", err, userData });
            res({
              statusCode: 500,
              data: { messsage: "Internl Error - The user was not updated" },
              err
            });
          } else {
            // If the operation is successful, return 200
            res({
              statusCode: 200,
              data: { messsage: "User Updated", email, userData }
            });
          }
        });
      }
    });
  }
};

// DELETE - remove one user
// Required data: email
// Optional data: none
user.deleteUser = (req, res) => {
  // If no email is defined, return 400
  if (!req.params || !req.params.email) {
    res({
      statusCode: 400,
      data: { messsage: "No query parameter specified" }
    });
  } else {
    const email = req.params.email;

    _data.read("users", email, (err, storedData) => {
      if (err) {
        res({
          statusCode: 404,
          data: { messsage: "No user found" },
          err
        });
      } else {
        _data.delete("users", email, err => {
          if (err) {
            logError({ method: "deleteUser", email, err });
            res({
              statusCode: 500,
              data: { messsage: "Internl Error - The user was not deleted" },
              err
            });
          } else {
            res({
              statusCode: 200,
              data: { messsage: "User Deleted", email }
            });
          }
        });
      }
    });
  }
};

module.exports = user;
