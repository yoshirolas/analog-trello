const getAllEntities = async mongooseModel => {
  const entities = await mongooseModel.find({});
  return entities;
};

const getEntity = async (mongooseModel, id) => {
  const entity = await mongooseModel.findById(id);
  return entity;
};

const createEntity = async (mongooseModel, entity) => {
  if (!entity) {
    console.error('To create new entity please fill its model');
  }
  const newEntity = await mongooseModel.create(entity);
  return newEntity;
};

const updateEntity = async (mongooseModel, entity) => {
  const updatedEntity = await mongooseModel.updateOne(
    { _id: entity.id },
    { ...entity }
  );
  return updatedEntity;
};

const removeEntity = async (mongooseModel, id) => {
  const deletedEntity = await mongooseModel.remove({ _id: id }); // TODO: returns not deletedUser
  return deletedEntity;
};

module.exports = {
  getAllEntities,
  getEntity,
  createEntity,
  updateEntity,
  removeEntity
};
