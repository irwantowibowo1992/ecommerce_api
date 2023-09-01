const Joi = require('joi');

const categoryValidationSchema = {
  upsertCategory: Joi.object({
    name: Joi.string().required().min(3).max(50),
  }),
};

module.exports = categoryValidationSchema;
