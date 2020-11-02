const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { setUpRequestLogger, setUpErrorLogger } = require('./common/logger');
const errorHandler = require('./common/errorHandrer');

const loginRouter = require('./resources/login/login.router');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();

process
  .on('unhandledRejection', error => {
    setUpErrorLogger(error);
  })
  .on('uncaughtException', error => {
    setUpErrorLogger(error);
    process.exit(1);
  });

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/*', (req, res, next) => {
  const url = req.originalUrl;
  setUpRequestLogger(url, {
    url,
    query: req.query,
    body: req.body
  });
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use(
  '/boards/:boardId/tasks',
  (req, res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);

app.use(errorHandler);

module.exports = app;
