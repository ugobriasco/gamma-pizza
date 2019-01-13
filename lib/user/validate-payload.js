/*
* Validate payload for /user
*/

// Required data: payload
const validatePayload = payload => {
  //const { firstName, lastName, email, address, password } = payload;

  const firstName =
    typeof payload.firstName == "string" && payload.firstName.trim().length > 0
      ? payload.firstName.trim()
      : false;

  const lastName =
    typeof payload.lastName == "string" && payload.lastName.trim().length > 0
      ? payload.lastName.trim()
      : false;

  const password =
    typeof payload.password == "string" && payload.password.trim().length > 0
      ? payload.password.trim()
      : false;

  const email =
    typeof payload.email == "string" && validateEmail(payload.email.trim())
      ? payload.email.trim()
      : false;

  const address = typeof payload.address == "object" ? payload.address : false;
  // // TODO: check address consinstancy

  const isValid = firstName && lastName && password && email;

  return { firstName, lastName, password, email, address, isValid };
};

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = validatePayload;
