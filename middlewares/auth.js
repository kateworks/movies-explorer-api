const jwt = require('jsonwebtoken');

const { JWT_CODE } = require('../config');

const UnauthorizedError = require('../errors/unauthorized-err');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация.');
    }

    const token = extractBearerToken(authorization);
    const payload = jwt.verify(token, JWT_CODE);

    req.user = payload;
    next();
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация.'));
  }
};
