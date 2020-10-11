const db = require('./schema');

const getAllEntities = (tableName) => {
    return db[tableName];
};

const getEntity = (tableName, id) => {
    return db[tableName].find(entity => entity.id === id)
};

const createEntity = (tableName, entity) => {
    if (!entity) {
        console.error('To create new entity please fill its model');
    }
    db[tableName].push(entity);
    return entity;
};

const updateEntity = (tableName, entity) => {
    try {
        const entityId = entity.id;
        const updateEntity = db[tableName].find(entity => entity.id === entityId);
        for (let field of Object.keys(entity)) {
            if (updateEntity[field]) {
                updateEntity[field] = entity[field];
            }
        }

        return updateEntity;

    } catch(error) {
        throw new Error(error);
    }
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