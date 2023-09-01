const Joi = require('joi');

const generalValidationSchema = {
  getDetailWithId: Joi.object({
    id: Joi.string().required(),
  }),
};

module.exports = generalValidationSchema;
