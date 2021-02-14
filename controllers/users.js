const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const { JWT_CODE } = require('../config');
const { STATUS_OK, STATUS_CREATED } = require('../utils/constants');

// ----------------------------------------------------------------------------
// Создание учетной записи нового пользователя

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    throw new BadRequestError('Нужны имя, почта и пароль');
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(`Пользователь ${email} уже существует!`);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => res
      .status(STATUS_CREATED)
      .send({ _id: user._id, email: user.email }))
    .catch(next);
};

// ----------------------------------------------------------------------------
// Вход в систему

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_CODE, { expiresIn: '7d' }),
      });
    })
    .catch(() => {
      throw new BadRequestError('Неправильные почта или пароль');
    })
    .catch(next);
};

// ----------------------------------------------------------------------------
// Возвращает информацию о пользователе (email и имя)

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      const data = { _id: user._id, email: user.email, name: user.name };
      res.status(STATUS_OK).send(data);
    })
    .catch(next);
};

// ----------------------------------------------------------------------------
// Oбновляет информацию о пользователе (email и имя)

module.exports.updateProfile = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    // Проверяем, не занят ли данный email
    const data = await User.find({ email });

    if (data.length === 1) {
      if (data[0]._id.toString() !== req.user._id) {
        throw new ConflictError(`Email ${email} уже занят!`);
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true, upsert: true },
    );

    const updatedData = { _id: user._id, email: user.email, name: user.name };

    res.status(STATUS_OK).send(updatedData);
  } catch (err) {
    next(err);
  }
};
