const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { createUser, login } = require('./controllers/users');
const routes = require('./routes/index.js');

const { ERROR_SERVER } = require('./utils/constants');
const { MONGO_DB, PORT } = require('./config');

const app = express();

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата

// для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', login);

// подключаем роуты
app.use(routes);

// Централизованная обработка ошибок
app.use((err, req, res, next) => {
  console.log(`Error ${err.statusCode} - ${err.message}`);
  const { statusCode = ERROR_SERVER, message } = err;
  const errorMessage = (statusCode === ERROR_SERVER) ? 'Ошибка на сервере' : message;
  res.status(statusCode).send({ message: errorMessage });
  next();
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
