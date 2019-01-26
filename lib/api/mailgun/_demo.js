/*
* Demo script for Mailgun API usage
*
*/

// Internal Dependancies
const mailgun = require("../mailgun");

// Send an email
mailgun
  .sendEmail({
    to: "foo@foo.com",
    subject: "Hey",
    message: "This is my message"
  })
  .then(data => console.log(data))
  .catch(data => console.log(data));
