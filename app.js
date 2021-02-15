const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { MONGO_DB, PORT } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const { errorHandler } = require('./middlewares/error-handler');
const routes = require('./routes/index.js');

const app = express();

app.use(helmet());
const limiter = rateLimit({ windowMs: 900000, max: 100 });
app.use(limiter);

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.post('/signup', createUser);
app.post('/signin', login);
app.use(routes);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
