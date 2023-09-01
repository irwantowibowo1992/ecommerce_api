const router = require('express-promise-router')();
const Authorization = require('../src/middlwares/authorization.middleware');
const UserController = require('../src/controllers/user.controller');

router.patch(
  '/users/update',
  Authorization.auth(['USER']),
  UserController.updateUser
);

module.exports = router;
