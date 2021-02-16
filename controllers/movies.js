const Movie = require('../models/movie.js');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const {
  STATUS_OK, STATUS_CREATED, ERRMSG_NO_FILM, ERRMSG_DELETE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
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
      if (err.name.includes('ValidationError')) {
        const errMessage = Object.values(err.errors).map((errItem) => errItem.message).join(', ');
        next(new BadRequestError(errMessage.trim()));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((film) => {
      if (!film) {
        throw new NotFoundError(ERRMSG_NO_FILM);
      }
      if (JSON.stringify(film.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError(ERRMSG_DELETE);
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then((film) => res.status(STATUS_OK).send(film))
    .catch(next);
};
