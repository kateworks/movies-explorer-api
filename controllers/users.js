const User = require('../models/user.js');

const NotFoundError = require('../errors/not-found-err');

const { STATUS_OK } = require('../utils/constants');

// Возвращает информацию о пользователе (email и имя)

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(STATUS_OK).send({ data: user });
    })
    .catch(next);
};

// Oбновляет информацию о пользователе (email и имя)

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch(next);
};
