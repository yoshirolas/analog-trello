const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getById = (id) => tasksRepo.getById(id);

const add = (task) => tasksRepo.add(task);

const update = (task) => tasksRepo.update(task);

const remove = (id) => tasksRepo.remove(id);

module.exports = { getAll, getById, add, update, remove };
