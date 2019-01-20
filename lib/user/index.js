/*
* Index of user module
*/

const getUserByEmail = require("./get-user");
const userHandler = require("./user-handler");

module.exports = { ...userHandler, getUserByEmail };
