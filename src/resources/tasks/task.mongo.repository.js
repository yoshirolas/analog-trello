const dbUtils = require('../../db/mongo.utils');
const Task = require('./task.model');
const mongooseModel = Task;

const getAll = async () => {
  const entities = await dbUtils.getAllEntities(mongooseModel);
  return entities;
};

const getById = async id => {
  const entity = await dbUtils.getEntity(mongooseModel, id);
  return entity;
};

const add = async entity => {
  const newEntity = await dbUtils.createEntity(mongooseModel, entity);
  return newEntity;
};

const update = async entity => {
  const updatedEntity = await dbUtils.updateEntity(mongooseModel, entity);
  return updatedEntity;
};

const remove = async id => {
  const deletedEntity = await dbUtils.removeEntity(mongooseModel, id);
  return deletedEntity;
};


module.exports = { getAll, getById, add, update, remove };
