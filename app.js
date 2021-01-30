const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
/* const { errors } = require('celebrate'); */
const celebrateCustomErrorHandler = require('./middlewares/celebrateCustomErrorHandler');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const { rateLimiter } = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, mongoDBName } = require('./config');

const app = express();

mongoose.connect(mongoDBName, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.set('trust proxy', 1);
app.use(rateLimiter);
app.use(router);
app.use(errorLogger);
/* app.use(errors()); */
app.use(celebrateCustomErrorHandler);
app.use(errorHandler);

app.listen(PORT);
