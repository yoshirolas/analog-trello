const db = require('./schema');
const createErr = require('http-errors');

const getAllEntities = tableName => {
  return db[tableName];
};

const getEntity = (tableName, id) => {
  return db[tableName].find(entity => entity.id === id);
};

const createEntity = (tableName, entity) => {
  if (!entity) {
    console.error('To create new entity please fill its model');
  }
  db[tableName].push(entity);
  return entity;
};

const updateEntity = (tableName, entity) => {
  const entityId = entity.id;
  const updatingEntity = db[tableName].find(
    entityItem => entityItem.id === entityId
  );
  if (updatingEntity) {
    for (const field of Object.keys(entity)) {
      if (updatingEntity[field]) {
        updatingEntity[field] = entity[field];
      }
    }
    return updatingEntity;
  }
  createErr(404, `${tableName} does not contain ${JSON.stringify(entity)}`);
};

const removeEntity = (tableName, id) => {
  const deletedUser = db[tableName].find(entity => entity.id === id);
  db[tableName] = db[tableName].filter(entity => entity.id !== id);
  return deletedUser;
};

module.exports = {
  getAllEntities,
  getEntity,
  createEntity,
  updateEntity,
  removeEntity
};
