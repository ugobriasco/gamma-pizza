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

    _data.read("users", email, (err, user) => {
      if (err) {
        res({
          statusCode: 404,
          data: { messsage: "No user found" },
          err
        });
      } else {
        res({ statusCode: 200, data: { messsage: "User found", user } });
      }
    });
  } else {
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
  _data.list("users", (err, users) => {
    if (err) {
      res({ statusCode: 404, data: { messsage: "No user found", err } });
    }
    res({ statusCode: 200, data: { messsage: "Users found", users } });
  });
};

// POST - Create one user
// Required data: firstName, lastName, email, password, address
user.createUser = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    address,
    isValid
  } = validatePayload(req.payload);

  if (!isValid) {
    res({
      statusCode: 400,
      data: { messsage: "The request body is missing the required data" }
    });
  } else {
    _data.read("users", email, (err, user) => {
      if (!err) {
        res({
          statusCode: 400,
          data: {
            message: "A user with the given email already exists",
            email: user.email
          }
        });
      } else {
        const hashedPassword = hash(password);

        const newUser = {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          address
        };

        _data.create("users", email, newUser, err => {
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
            res({ statusCode: 201, data: { message: "User created", user } });
          }
        });
      }
    });
  }
};

// PUT - Update one user
user.updateUser = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    address,
    isValid
  } = validatePayload(req.payload);

  if (!email) {
    res({
      statusCode: 400,
      data: { messsage: "The request body is missing the required data" }
    });
  } else {
    _data.read("users", email, (err, storedData) => {
      if (err) {
        res({
          statusCode: 404,
          data: { messsage: "No user found" },
          err
        });
      } else {
        const userData = {
          firstName: firstName ? firstName : storedData.firstName,
          lastName: lastName ? lastName : storedData.lastName,
          password: password ? hash(password) : storedData.password,
          address: address ? address : storedData.address
        };

        _data.update("users", email, userData, err => {
          if (err) {
            logError({ method: "udpate user ", err, userData });
            res({
              statusCode: 500,
              data: { messsage: "Internl Error - The user was not updated" },
              err
            });
          } else {
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
user.deleteUser = (req, res) => {
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
