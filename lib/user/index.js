/*
* User module public interface
*
*/

// Get the public methods
const getUserByEmail = require("./get-user");
const userHandler = require("./user-handler");

// Export module
module.exports = { ...userHandler, getUserByEmail };
