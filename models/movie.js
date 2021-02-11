const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    validator(v) {
      return /^(19|20)\d{2}$/.test(v);
    },
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/(www)?[\-\.~_:\/\?#\[\]@!$&'\(\)*\+,;=\w]+#?\b/gi.test(v);
      },
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/(www)?[\-\.~_:\/\?#\[\]@!$&'\(\)*\+,;=\w]+#?\b/gi.test(v);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/(www)?[\-\.~_:\/\?#\[\]@!$&'\(\)*\+,;=\w]+#?\b/gi.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', MovieSchema);
