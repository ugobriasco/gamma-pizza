const authHandlers = require("./auth-handlers");
const { verify } = require("./auth-token");

module.exports = { ...authHandlers, verify };
