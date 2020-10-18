const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { setUpLogger } = require('./common/logger');
const errorHandler = require('./common/errorHandrer');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/*', (req, res, next) => {
  const url = req.originalUrl;
  setUpLogger(url, [
    { name: 'url', data: url },
    { name: 'query', data: req.query },
    { name: 'body', data: req.body}
  ]);
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

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/boards/:boardId/tasks', 
  (req, res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);

app.use(errorHandler);


module.exports = app;
