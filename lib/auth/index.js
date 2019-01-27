const authHandlers = require("./auth-handlers");
const { verifyToken, tokenGenerate } = require("./auth-token");

module.exports = { ...authHandlers, verifyToken, tokenGenerate };
