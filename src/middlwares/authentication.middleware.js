const jwt = require('jsonwebtoken');
const UnauthorizeError = require('../exceptions/unauthorize.exception');
const jwtSecret = process.env.JWT_SECRET_KEY;

class Authentication {
  constructor(user) {
    this.user = user;
  }

  auth(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
      throw new UnauthorizeError('Unauthorized');
    }

    try {
      const decoded = jwt.verify(token.split(' ')[1], jwtSecret);
      req.user = decoded;
      next();
    } catch (error) {
      throw new UnauthorizeError('Token is not valid');
    }
  }
}

module.exports = new Authentication();
