const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies.js');

router.get('/movies', auth, getMovies);

router.post('/movies', auth, createMovie);

router.delete('/movies/:movieId', auth, deleteMovie);

module.exports = router;
