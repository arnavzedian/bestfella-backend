let { Donation } = require("../database/db");

function checkRequired(fields, body, next) {
  for (let index of fields) {
    if (!body[index]) return next(index + " field is required");
  }
}

module.exports = checkRequired;
