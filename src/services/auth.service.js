const InvalidError = require('../exceptions/invalid.exception');
const UserService = require('./user.service');
const EmailService = require('../services/email.service');
const UserModel = require('../models/user.model');
const UserLoginModel = require('../models/userLogin.model');
const UserRoleModel = require('../models/userRole.model');
const bcrypt = require('bcryptjs');
const humps = require('humps');
const {
  generateRandomString,
  normalizePhone,
} = require('../utils/string.util');
const UnauthorizeError = require('../exceptions/unauthorize.exception');
const JwtToken = require('../utils/jwt.util');
const NotFoundError = require('../exceptions/notFound.exception');

class AuthService {
  async register(body) {
    const checkUser = await UserService.getUserByEmail(body.email);
    if (checkUser) {
      throw new InvalidError('Email is exsists');
    }

    const otpRegister = generateRandomString(9);
    const hashPassword = await bcrypt.hash(body.password, 10);

    await UserModel.transaction(async (trx) => {
      const newUser = await UserModel.query(trx).insert({
        first_name: body.firstName,
        last_name: body.lastName,
        phone: normalizePhone(body.phone),
        email: body.email,
        password: hashPassword,
      });

      await Promise.all([
        UserRoleModel.query(trx).insert({
          user_id: newUser.id,
          role: 'USER',
        }),

        UserLoginModel.query(trx).insert({
          user_id: newUser.id,
          otp: otpRegister,
        }),
      ]);
    });

    await EmailService.registerOTP(body.firstName, body.email, otpRegister);
  }

  async activationAccount(email, otp) {
    await UserModel.transaction(async (trx) => {
      const checkUser = await UserModel.query(trx)
        .select('u.id', 'u.email', 'ul.otp')
        .alias('u')
        .leftJoin({ ul: 'user_login_info' }, (join) => {
          join.on('ul.user_id', 'u.id');
        })
        .where('u.email', email)
        .first();

      if (!checkUser || checkUser.email !== email || checkUser.otp !== otp) {
        throw new InvalidError('Invalid Email or OTP');
      }

      await Promise.all([
        UserModel.query(trx)
          .update({
            user_status: 'ACTIVE',
          })
          .where({ id: checkUser.id }),

        UserLoginModel.query(trx)
          .update({
            otp: null,
          })
          .where({ user_id: checkUser.id }),
      ]);
    });
  }

  async loginEmail(email, password) {
    const userData = await UserService.getUserByEmail(email);

    if (!userData || userData.user_status === 'INACTIVE') {
      throw new UnauthorizeError('User not exists or account innactive');
    }

    // compare password
    const checkPassword = await bcrypt.compare(password, userData.password);
    if (!checkPassword) {
      throw new UnauthorizeError('Email or password missmatch');
    }

    return await this.afterLogin(userData);
  }

  async afterLogin(user) {
    // create token
    const paramToken = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const expiredIn = {
      duration: 1,
      shorthandUnit: 'd',
    };

    const token = JwtToken.setToken(paramToken, expiredIn);

    const dataLogin = {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.user_role,
        status: user.user_status,
      },
      token,
    };

    return humps.camelizeKeys(dataLogin);
  }

  async forgetPassword(email) {
    const userData = await UserModel.query()
      .select(
        'u.id',
        'u.first_name',
        'u.email',
        'ul.id as user_login_id',
        'ul.otp',
        'ul.otp_count',
        'ul.forgot_password_token'
      )
      .alias('u')
      .leftJoin({ ul: 'user_login_info' }, (join) => {
        join.on('u.id', 'ul.user_id');
      })
      .where({
        email: email,
      })
      .first();

    if (!userData) {
      throw new NotFoundError('Data not found');
    }

    const generateForgotToken = generateRandomString(20);
    const userLoginUpdate = await UserLoginModel.query().patchAndFetchById(
      userData.user_login_id,
      { forgot_password_token: generateForgotToken }
    );

    userData.forgot_password_token = userLoginUpdate.forgot_password_token;

    await EmailService.forgotPassword(
      userData.first_name,
      userData.email,
      userData.forgot_password_token
    );

    return 'success';
  }

  async resetPassword(token, password) {
    const checkUser = await UserLoginModel.query()
      .select('ul.id', 'u.id as user_id')
      .alias('ul')
      .leftJoin({ u: 'users' }, (join) => {
        join.on('u.id', 'ul.user_id');
      })
      .where('ul.forgot_password_token', token)
      .first();

    if (!checkUser) {
      throw new NotFoundError('Data not found');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await Promise.all([
      UserModel.query().patchAndFetchById(checkUser.user_id, {
        password: hashPassword,
      }),

      UserLoginModel.query().patchAndFetchById(checkUser.id, {
        forgot_password_token: null,
      }),
    ]);

    return 'success';
  }
}

module.exports = new AuthService();
