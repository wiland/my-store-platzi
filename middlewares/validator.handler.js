const boom = require('boom');

// eslint-disable-next-line no-unused-vars
function validatorHandler(schema, property) {
  return function(req, res, next) {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  }
}

module.exports = validatorHandler
