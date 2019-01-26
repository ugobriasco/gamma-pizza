/*
* Verify if password is matching
*/

//External Dependancies

//Internal Dependancies
const { hash } = require("../helpers");

// Main function
const verifyPassword = ({ userData, submittedPassword }) => {
  // If userData and submittedPassword are defined and the user exists, then return true
  const userCheck =
    userData && submittedPassword && userData.statusCode != 404 ? true : false;

  // Compare the submitted password with the one saved.
  const passwordCheck =
    submittedPassword && hash(submittedPassword) === userData.data.password
      ? true
      : false;

  console.log(userData, userCheck, submittedPassword, passwordCheck);

  // return password check
  return userCheck && passwordCheck;
};

module.exports = verifyPassword;
