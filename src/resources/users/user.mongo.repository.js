const dbUtils = require('../../db/mongo.utils');
const User = require('./user.model');

const mongooseModel = User;

const getAll = async () => {
  const users = await dbUtils.getAllEntities(mongooseModel);
  return users;
};

const getById = async id => {
  const user = await dbUtils.getEntity(mongooseModel, id);
  return user;
};

const add = async user => {
  const newUser = await dbUtils.createEntity(mongooseModel, user);
  return newUser;
};

const update = async user => {
  const updatedUser = await dbUtils.updateEntity(mongooseModel, user);
  return updatedUser;
};

const remove = async id => {
  const deletedUser = await dbUtils.removeEntity(mongooseModel, id);
  return deletedUser;
};

// const getAll = async () => {
//   const users = await User.find({});
//   return users;
// };

// const getById = async id => {
//   const user = await User.findById(id);
//   return user;
// };

// const add = async user => {
//   const newUser = await user.save();
//   return newUser;
// };

// const update = async user => {
//   const updatedUser = await User.updateOne({_id: user.id}, {...user});
//   return updatedUser;
// };

// const remove = async id => {
//   const deletedUser = await User.remove({_id: id}); //TODO: returns not deletedUser
//   return deletedUser;
// };

module.exports = { getAll, getById, add, update, remove };
