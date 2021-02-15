const MODE_DEV = 'development';
const MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb';
const LOCAL_PORT = 3000;
const JWT_KEY = 'secret-key';

const STATUS_OK = 200;
const STATUS_CREATED = 201;

const ERROR_BAD_REQUEST = 400;
const ERROR_UNAUTHORIZED = 401;
const ERROR_FORBIDDEN = 403;
const ERROR_NOT_FOUND = 404;
const ERROR_CONFLICT = 409;
const ERROR_SERVER = 500;

const ERRMSG_UNAUTHORIZED = 'Необходима авторизация';
const ERRMSG_SERVER = 'Ошибка на сервере';
const ERRMSG_NOT_FOUND = 'Запрашиваемый ресурс не найден';
const ERRMSG_VALIDATION = 'Ошибка валидации данных';
const ERRMSG_NO_DATA = 'Нужны имя, почта и пароль';
const ERRMSG_BAD_DATA = 'Неправильные почта или пароль';
const ERRMSG_NO_USER = 'Пользователь не найден';
const ERRMSG_NO_FILM = 'Такого фильма нет';
const ERRMSG_DELETE = 'Невозможно удалить данный фильм';
const ERRMSG_EMAIL_EXISTS = 'Такая учетная запись уже существует:';

module.exports = {
  MODE_DEV,
  MONGO_URL,
  LOCAL_PORT,
  JWT_KEY,
  STATUS_OK,
  STATUS_CREATED,
  ERROR_BAD_REQUEST,
  ERROR_UNAUTHORIZED,
  ERROR_FORBIDDEN,
  ERROR_NOT_FOUND,
  ERROR_CONFLICT,
  ERROR_SERVER,
  ERRMSG_NOT_FOUND,
  ERRMSG_VALIDATION,
  ERRMSG_UNAUTHORIZED,
  ERRMSG_SERVER,
  ERRMSG_NO_DATA,
  ERRMSG_BAD_DATA,
  ERRMSG_NO_USER,
  ERRMSG_NO_FILM,
  ERRMSG_DELETE,
  ERRMSG_EMAIL_EXISTS,
};
