/*
* Data module public interface
* A library for storing and editing data
*/

// Import public methods
const syncData = require("./sync-data");
const promiseData = require("./promise-data");

// Export those methods
module.exports = { ...syncData, ...promiseData };
