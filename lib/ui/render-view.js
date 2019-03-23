/*
* Renders a html page
*
*/

// Dependancies
const path = require("path");
const fs = require("fs");
const util = require("util");
const globals = require("../../assets/content/globals");

// Polyfill async filesystem for node <11.0
const readFile = util.promisify(fs.readFile);

function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

// Take a given string and data object, and find/replace all the keys within it
const interpolate = (str, data) => {
  str = typeof str == "string" && str.length > 0 ? str : "";
  data = typeof data == "object" && data !== null ? data : {};

  // Add the templateGlobals to the data object, prepending their key name with "global."
  const globalKeys = Object.keys(globals).map(
    key => (data["global." + key] = globals[key])
  );

  // For each key in the data object, insert its value into the string at the corresponding placeholder
  Object.entries(data).forEach(entry => {
    const key = entry[0];
    const value = entry[1];
    str = str.replace(`{${key}}`, value);
  });

  return str;
};

// Get the string content of a template, and use provided data for string interpolation
const getTemplate = (templateName, data) => {
  // Input validation
  templateName =
    typeof templateName == "string" && templateName.length > 0
      ? templateName
      : false;

  data = typeof data == "object" && data !== null ? data : {};

  if (templateName) {
    // Look for a given templateName in the ../views directory
    const dir = path.join(__dirname, "/../../views/");
    return readFile(dir + templateName + ".html", "utf8")
      .then(str => interpolate(str, data))
      .catch(err => {
        console.log("no template found");
        return false;
      });
  } else {
    console.log("no template specified");
    return false;
  }
};

// Wrap a given template between static header and footer
const render = str =>
  Promise.all([
    getTemplate("_header"),
    getTemplate(str),
    getTemplate("_footer")
  ]).then(arr => arr[0] + arr[1] + arr[2]);

module.exports = render;
