const { ERROR_SERVER } = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  console.log(`Error ${err.statusCode} - ${err.message}`);
  const { statusCode = ERROR_SERVER, message } = err;
  const errorMessage = (statusCode === ERROR_SERVER) ? 'Ошибка на сервере' : message;
  res.status(statusCode).send({ message: errorMessage });
  next();
};
