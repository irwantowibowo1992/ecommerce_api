const ValidationMiddleware = require('../src/middlwares/validation.middleware');
const authValidationSchema = require('../src/validations/auth.validate');
const AuthController = require('../src/controllers/auth.controller');

const router = require('express-promise-router')();

router.post(
  '/auth/register',
  ValidationMiddleware.validateBody(authValidationSchema.register),
  AuthController.register
);

router.patch(
  '/auth/activation',
  ValidationMiddleware.validateBody(authValidationSchema.activation),
  AuthController.activationAccount
);

router.post(
  '/auth/login',
  ValidationMiddleware.validateBody(authValidationSchema.loginEmail),
  AuthController.loginEmail
);

router.post(
  '/auth/forget',
  ValidationMiddleware.validateBody(authValidationSchema.forgetPassword),
  AuthController.forgetPassword
);

router.patch(
  '/auth/reset',
  ValidationMiddleware.validateBody(authValidationSchema.resetPassword),
  AuthController.resetPassword
);

module.exports = router;
