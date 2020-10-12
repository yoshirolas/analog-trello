const db = require('../../db/schema');
const dbUtils = require('../../db/utils');

const bdTableName = 'Tasks';


const getAll = async () => {
  const entities = await dbUtils.getAllEntities(bdTableName);
  return entities;
};

const getById = async (id) => {
  const entity = await dbUtils.getEntity(bdTableName, id);
  return entity;
};

const add = async (entity) => {
  const newEntity = await dbUtils.createEntity(bdTableName, entity);
  return newEntity;
};

const update = async (entity) => {
  const updatedEntity = await dbUtils.updateEntity(bdTableName, entity);
  return updatedEntity;
};

const remove = async (id) => {
  const deletedEntity = await dbUtils.removeEntity(bdTableName, id);
  return deletedEntity;
};

module.exports = { getAll, getById, add, update, remove };
