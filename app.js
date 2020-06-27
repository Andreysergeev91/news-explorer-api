const express = require('express');

const helmet = require('helmet');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const { limiter } = require('./middlewares/rate-limiter');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const mainErrorHandler = require('./middlewares/main-error-handler');

require('dotenv').config();


const {
  PORT = 3000,
} = process.env;


const app = express();


app.use(limiter);

app.use(helmet());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/news-explorer-db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
// eslint-disable-next-line no-console
}).catch((err) => console.error(err));

app.use(requestLogger);


app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(mainErrorHandler);

app.listen(PORT);
