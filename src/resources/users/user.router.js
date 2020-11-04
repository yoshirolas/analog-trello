const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await usersService.getById(id);
    res.status(200).json(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const { name, login, password } = req.body;
    const encodedPassword = await User.encodePassword(password);
    const newUserData = { name, login, password: encodedPassword };
    const user = await usersService.add(newUserData);
    res.status(200).json(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, login, password } = req.body;
    const encodedPassword = await User.encodePassword(password, id);
    const updateUserData = { id, name, login, password: encodedPassword };
    const user = await usersService.update(updateUserData);
    res.status(200).json(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedUser = await usersService.remove(id);
    res.status(200).json(User.toResponse(deletedUser));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
