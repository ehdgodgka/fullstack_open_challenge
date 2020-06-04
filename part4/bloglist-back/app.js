const express = require('express');
require('express-async-errors');
const app = express();
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose
  .connect(config.MONGO_URL, mongooseConfig)
  .then(() => {
    logger.info('db connected');
  })
  .catch((error) => {
    logger.error(error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
