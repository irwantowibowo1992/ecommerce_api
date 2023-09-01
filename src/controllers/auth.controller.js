const AuthService = require('../services/auth.service');
const SuccessResult = require('../utils/response.util');

class AuthController {
  async register(req, res) {
    const body = req.body;
    await AuthService.register(body);
    SuccessResult.make(res).sendMessage(
      'Silahkan periksa email anda untuk mengaktifkan akun, terima kasih'
    );
  }

  async activationAccount(req, res) {
    const { email, otp } = req.body;
    await AuthService.activationAccount(email, otp);
    SuccessResult.make(res).sendMessage('Akun anda berhasil diaktifkan');
  }

  async loginEmail(req, res) {
    const { email, password } = req.body;
    const data = await AuthService.loginEmail(email, password);
    SuccessResult.make(res).sendWithHumps(data);
  }

  async forgetPassword(req, res) {
    const { email } = req.body;
    await AuthService.forgetPassword(email);
    SuccessResult.make(res).sendMessage(
      'Kami telah mengirim tautan reset password ke akun email anda'
    );
  }

  async resetPassword(req, res) {
    const { token } = req.query;
    const { password } = req.body;

    await AuthService.resetPassword(token, password);
    SuccessResult.make(res).sendMessage(
      'Password berhasil dirubah, silahkan login dengan email dan password baru anda'
    );
  }
}

module.exports = new AuthController();
