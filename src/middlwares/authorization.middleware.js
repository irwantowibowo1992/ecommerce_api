const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET_KEY;
const InvalidError = require('../exceptions/invalid.exception');
const UnauthorizeError = require('../exceptions/unauthorize.exception');

class Authorization {
  auth(roles) {
    return (req, res, next) => {
      try {
        let decodeThisToken;
        decodeThisToken = this.getToken(req);
        req.user = decodeThisToken;

        if (!roles.includes(req.user.role)) {
          throw new UnauthorizeError('You are not authorized');
        }

        return next();
      } catch (error) {
        throw new UnauthorizeError(error.message);
      }
    };
  }

  getToken(req) {
    const token =
      req.body.token || req.query.token || req.headers.authorization;

    if (!token) {
      throw new InvalidError('A token is required for authentication');
    }

    if (token.split(' ').length < 2) {
      throw new UnauthorizeError('Wrong authentication token format');
    }

    return this.decodeToken(token);
  }

  decodeToken(token) {
    const strToken = token.split(' ')[1];
    return jwt.verify(strToken, jwtSecret);
  }
}

module.exports = new Authorization();
