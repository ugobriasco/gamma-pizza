/*
* Validate the payload of the chaeckout to be submitted to mailgun
*
*/

// Internal Dependancies
const { validateEmail, appConfig } = require("../../helpers");

const DOMAIN_NAME = appConfig.mailgun.domainName;

function validateEmailPayload(payload) {
  const { from, to, text, message, subject } = payload;

  // Validation container
  const validate = {};

  // If the sender is not defined, use a default.
  validate.from =
    typeof from == "string"
      ? from
      : `Γ🍕 - Gamma Pizza <mailgun@${DOMAIN_NAME}>`;

  // Reciver should have a valid email address
  validate.to =
    typeof to.trim() == "string" && validateEmail(to.trim())
      ? to.trim()
      : false;

  // Either text or message are submitted, being a string
  const emailMessage = text || message;
  validate.text = typeof emailMessage == "string" ? emailMessage : false;

  // The subject should be a string
  validate.subject = typeof subject == "string" ? subject : false;

  //The payload is valid only if all checks are true
  validate.isValid = from && to && text && subject;

  return validate;
}

module.exports = validateEmailPayload;
