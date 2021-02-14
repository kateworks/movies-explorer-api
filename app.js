const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { MONGO_DB, PORT } = require('./config');
const { createUser, login } = require('./controllers/users');
const { errorHandler } = require('./middlewares/error-handler');
const routes = require('./routes/index.js');

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

// Подключаем роуты
app.use(routes);

// Централизованная обработка ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
