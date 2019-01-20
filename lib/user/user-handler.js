/*
* Handle request via /user
*/

// External dependancies

//Internal dependancies
const _data = require("../data");
const getUserByEmail = require("./get-user");
const validatePayload = require("./validate-payload");
const { hash } = require("../helpers");

// Define container
const user = {};

// Define the rule for logging exceptions
const logError = data => console.log("\x1b[31m%s\x1b[0m", data);

// GET a single user
// Required data: email
// Optional data: none
user.getUser = (req, res) => {
  // If no email is specified, return a 400
  if (!req.params || !req.params.email) {
    res({
      statusCode: 400,
      data: { messsage: "No query parameter specified" }
    });
  } else {
    // Find a user with the given email
    const email = req.params.email;
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
  } = validatePayload(req.payload);

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
        }
      })
      .then(() => {
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

        // Save the user
        return _data.pCreate("users", email, newUser);
      })
      .then(newUser =>
        // Return a 201 to the client
        res({
          statusCode: 201,
          data: { message: "User created", newUser }
        })
      )
      .catch(err => {
        // If an internal error pos up, log it and return a 500
        logError({ method: "create user ", err, newUser });
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
  } = validatePayload(req.payload);

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
      .then(storedData => {
        // Fetch the stored data with the ones presnt in the payload
        const updatedUserData = {
          firstName: firstName ? firstName : storedData.firstName,
          lastName: lastName ? lastName : storedData.lastName,
          password: password ? hash(password) : storedData.password,
          address: address ? address : storedData.address
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
  if (!req.params || !req.params.email) {
    res({
      statusCode: 400,
      data: { messsage: "The request is missing the required parameters" }
    });
  } else {
    // Normalize query parameter
    const email = req.params.email.trim();

    getUserByEmail(email)
      .then(userData => {
        // If no user is found, then return 404
        if (userData.statusCode === 404) {
          return res(userData);
        } else {
          // Else delete the user having the given email
          _data.pDelete("users", email);
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
            message: "Internal Error - User cart not deleted",
            email,
            err
          }
        });
      });
  }
};

module.exports = user;
