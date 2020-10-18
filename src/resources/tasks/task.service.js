const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getById = (id) => tasksRepo.getById(id);

const add = (task) => tasksRepo.add(task);

const update = (task) => tasksRepo.update(task);

const remove = (id) => tasksRepo.remove(id);

const unsubscribeUserTasks = async (id) => {
    const allTasks = await getAll();
    for (let task of allTasks) {
        if (task.userId === id) {
            await update({...task, userId: null});
        }
    }
};

module.exports = { getAll, getById, add, update, remove, unsubscribeUserTasks };
