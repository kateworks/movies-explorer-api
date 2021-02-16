const router = require('express').Router();
const auth = require('../middlewares/auth');
const checkPassword = require('../middlewares/password');

const {
  validateSignup, validateLogin, validateUser,
} = require('../middlewares/validation');

const {
  createUser, login, getCurrentUser, updateProfile,
} = require('../controllers/users');

router.post('/signup', validateSignup, checkPassword, createUser);
router.post('/signin', validateLogin, checkPassword, login);

router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, validateUser, updateProfile);

module.exports = router;
