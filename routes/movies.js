const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  validateMovie, validateMovieId,
} = require('../middlewares/validation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies.js');

router.get('/movies', auth, getMovies);

router.post('/movies', auth, validateMovie, createMovie);

router.delete('/movies/:movieId', auth, validateMovieId, deleteMovie);

module.exports = router;
