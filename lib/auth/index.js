/*
* Auth module public interface
*/

// Import public methods
const authHandlers = require("./auth-handlers");
const { verifyToken, tokenGenerate } = require("./auth-token");

// Expose those methods
module.exports = { ...authHandlers, verifyToken, tokenGenerate };
