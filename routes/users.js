const router = require('express').Router();
// const auth = require('../middlewares/auth');

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users.js');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', updateProfile);

module.exports = router;
