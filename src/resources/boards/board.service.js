const boardsRepo = require('./board.memory.repository');
const taskService = require('./../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const add = board => boardsRepo.add(board);

const update = board => boardsRepo.update(board);

const remove = async id => {
  const allTasks = await taskService.getAll();
  for (let task of allTasks) {
    if (task.boardId === id) await taskService.remove(task.id);
  }

  return await boardsRepo.remove(id);
};

module.exports = { getAll, getById, add, update, remove };
