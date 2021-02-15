const router = require('express').Router();
const auth = require('../middlewares/auth');
const checkPassword = require('../middlewares/password');

const {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
} = require('../controllers/users.js');

router.post('/signup', checkPassword, createUser);
router.post('/signin', checkPassword, login);

router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, updateProfile);

module.exports = router;
