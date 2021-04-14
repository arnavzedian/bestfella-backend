function clearUnwantedFields(fields, body, next) {
  for (let index of fields) {
    body[index] = null;
  }
}

module.exports = clearUnwantedFields;
