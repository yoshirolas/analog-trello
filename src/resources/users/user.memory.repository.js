const db = require('./../../db/schema');
const dbUtils = require('./../../db/utils');

const bdTableName = 'Users';

const getAll = async () => {
  const users = await dbUtils.getAllEntities(bdTableName);
  return users;
};

const getById = async (id) => {
  const user = await dbUtils.getEntity(bdTableName, id);
  return user;
};

const add = async (user) => {
  const newUser = await dbUtils.createEntity(bdTableName, user);
  return newUser;
};

const update = async (user) => {
  const updatedUser = await dbUtils.updateEntity(bdTableName, user);
  return updatedUser;
};

const remove = async (id) => {
  const deletedUser = await dbUtils.removeEntity(bdTableName, id);
  return deletedUser;
};

module.exports = { getAll, getById, add, update, remove };
