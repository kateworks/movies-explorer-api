const Movie = require('../models/movie.js');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

const { STATUS_OK, STATUS_CREATED } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((data) => res.status(STATUS_OK).send(data))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, nameRU, nameEN, thumbnail,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
  })
    .then((film) => res.status(STATUS_CREATED).send({ data: film }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      if (err.name.includes('ValidationError')) {
        throw new BadRequestError('Ошибка валидации данных');
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .then((film) => {
      if (!film) {
        throw new NotFoundError('Такого фильма нет!');
      }
      if (JSON.stringify(film.owner) !== JSON.stringify(req.user._id)) {
        throw new BadRequestError('Невозможно удалить данный фильм');
      }
      return Movie.findByIdAndRemove(id);
    })
    .then((card) => res.status(STATUS_OK).send({ data: card }))
    .catch(next);
};
