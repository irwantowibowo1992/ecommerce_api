const Joi = require('joi');
const InvalidError = require('../exceptions/invalid.exception');

class ValidationMiddleware {
  static validateBody(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);

      if (error) {
        throw new InvalidError(error.details[0].message);
      }
      next();
    };
  }

  static validateParam(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.params);

      if (error) {
        throw new InvalidError(error.details[0].message);
      }
      next();
    };
  }
}

module.exports = ValidationMiddleware;
