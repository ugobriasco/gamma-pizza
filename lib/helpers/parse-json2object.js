/*
* Wrapping JSON.parse to avoid the app to crash
*
*/

// Main function
const parse = str => {
  try {
    // Try to parse the string to json
    return JSON.parse(str);
  } catch (e) {
    // If error, then return an empty json
    return {};
  }
};

// Export the function
module.exports = parse;
