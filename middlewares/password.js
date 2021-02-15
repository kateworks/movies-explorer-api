const BadRequestError = require('../errors/bad-request-err');
const {
  ERRMSG_NO_PASSWORD,
  ERRMSG_BAD_PASSWORD,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { password } = req.body;

  try {
    if (!password) throw new BadRequestError(ERRMSG_NO_PASSWORD);

    const psw = password.trim();
    if (!psw || psw.length < 8) {
      throw new BadRequestError(ERRMSG_BAD_PASSWORD);
    }

    next();
  } catch (err) {
    next(err);
  }
};
