// const usersRepo = require('./user.memory.repository');
const usersRepo = require('./user.mongo.repository');
const taskService = require('./../tasks/task.service');
const createErr = require('http-errors');

const getAll = () => usersRepo.getAll();

const getById = async id => {
  const user = await usersRepo.getById(id);
  if (!user) throw new createErr(404, `User ${id} has not been found in DB`);
  return user;
};

const add = async user => {
  const newUser = await usersRepo.add(user);
  if (!newUser) throw new createErr(400, 'Could not create the new User');
  return newUser;
};

const update = async user => {
  const updtedUser = await usersRepo.update(user);
  if (!updtedUser) {
    throw new createErr(400, `Could not update User: ${user.id}`);
  }
  return updtedUser;
};

const remove = async id => {
  const deletedUser = await usersRepo.remove(id);
  if (!deletedUser) throw new createErr(400, `Could not delete User: ${id}`);
  taskService.unsubscribeUserTasks(id);
  return deletedUser;
};

module.exports = { getAll, getById, add, update, remove };
