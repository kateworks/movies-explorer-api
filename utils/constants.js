const MODE_DEV = 'development';
const MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb';
const LOCAL_PORT = 3000;
const JWT_KEY = 'secret-key';

const STATUS_OK = 200;
const STATUS_CREATED = 201;

const ERROR_BAD_REQUEST = 400;
const ERROR_UNAUTHORIZED = 401;
const ERRER_FORBIDDEN = 403;
const ERROR_NOT_FOUND = 404;
const ERROR_CONFLICT = 409;
const ERROR_SERVER = 500;

module.exports = {
  MODE_DEV,
  MONGO_URL,
  LOCAL_PORT,
  JWT_KEY,
  STATUS_OK,
  STATUS_CREATED,
  ERROR_BAD_REQUEST,
  ERROR_UNAUTHORIZED,
  ERRER_FORBIDDEN,
  ERROR_NOT_FOUND,
  ERROR_CONFLICT,
  ERROR_SERVER,
};
