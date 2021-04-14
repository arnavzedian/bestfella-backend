function checkRequired(fields, body, next) {
  for (let index of fields) {
    if (!body[index]) {
      next(index + " field is required");
      return false;
    }
  }

  return true;
}

module.exports = checkRequired;
