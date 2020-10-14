const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const taskService = require('./../tasks/task.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const user = await usersService.getById(id);

  if (user) {
    res.status(200).json(User.toResponse(user));
  } else {
    res.status(400).send('User ' + id + ' has not been found in DB');
  }
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const newUser = new User({
    name,
    login,
    password
  });

  const user = await usersService.add(newUser);
  if (user) {
    res.status(200).json(User.toResponse(user));
  } else {
    res.status(400).send('Could not create the new User');
  }
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const { name, login, password } = req.body;
  const updateUser = new User({
    id,
    name,
    login,
    password
  });
  const user = await usersService.update(updateUser);
  if (user) {
    res.status(200).json(User.toResponse(user));
  } else {
    res.status(400).send('Could not update User: ' + id);
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  const deletedUser = await usersService.remove(id);
  if (deletedUser) {
    res.status(200).json(User.toResponse(deletedUser));
  } else {
    res.status(400).send('Could not delete User: ' + id);
  }
});

module.exports = router;
