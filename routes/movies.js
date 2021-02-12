const router = require('express').Router();
// const auth = require('../middlewares/auth');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies.js');

router.get('/movies', getMovies);

router.post('/movies', createMovie);

router.delete('/movies/:movieId', deleteMovie);

module.exports = router;
