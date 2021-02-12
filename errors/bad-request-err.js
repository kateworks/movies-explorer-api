// -----------------------------------------------
// 400 Bad Request
// Ошибка на стороне клиента (некорректные данные)

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
