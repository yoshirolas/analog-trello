const usersRepo = require('./user.memory.repository');
const taskService = require('./../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const add = (user) => usersRepo.add(user);

const update = (user) => usersRepo.update(user);

const remove = async (id) => {

    const allTasks = await taskService.getAll();
    for (let task of allTasks) {
        if (task.userId === id) {
            await taskService.update({...task, userId: null});
        }
    }

    return await usersRepo.remove(id);
}

module.exports = { getAll, getById, add, update, remove };
