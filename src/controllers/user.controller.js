const UserService = require('../services/user.service');
const SuccessResult = require('../utils/response.util');

class UserController {
  async updateUser(req, res) {
    const user = req.user;
    const body = req.body;

    await UserService.updateUser(user, body);
    SuccessResult.make(res).sendMessage('Data berhasil diperbaharui');
  }
}

module.exports = new UserController();
