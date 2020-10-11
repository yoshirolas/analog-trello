const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const add = (user) => usersRepo.add(user);

const update = (user) => usersRepo.update(user);

const remove = (id) => usersRepo.remove(id);

module.exports = { getAll, getById, add, update, remove };
