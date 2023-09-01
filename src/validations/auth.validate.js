const Joi = require('joi');

function normalizePhone(phone) {
  phone = String(phone).trim();
  if (phone.startsWith('+62')) {
    phone = '0' + phone.slice(3);
  } else if (phone.startsWith('62')) {
    phone = '0' + phone.slice(2);
  }
  return testPhone(phone.replace(/[- .]/g, ''));
}

function testPhone(phone) {
  if (!phone || !/^08[1-9][0-9]{7,10}$/.test(phone)) {
    return false;
  }
  return true;
}

const authValidationSchema = {
  register: Joi.object({
    firstName: Joi.string().required().min(3).max(100),
    lastName: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(30),
    phone: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!normalizePhone(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      }, 'Phone number is invalid'),
    password: Joi.string().required().min(6).max(50),
  }),

  activation: Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
  }),

  loginEmail: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30),
  }),

  forgetPassword: Joi.object({
    email: Joi.string().email().required(),
  }),

  resetPassword: Joi.object({
    password: Joi.string().min(6).max(50).required(),
  }),
};

module.exports = authValidationSchema;
