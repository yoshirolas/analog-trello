const { USE_MONGO } = require('./../../common/config');
const createErr = require('http-errors');
const tasksRepo = USE_MONGO
  ? require('./task.mongo.repository')
  : require('./task.memory.repository');

const getAll = async () => await tasksRepo.getAll();

const getById = async id => {
  const task = await tasksRepo.getById(id);
  if (!task) throw new createErr(404, `Task ${id} has not been found in DB`);
  return task;
};

const getTasksByBoardId = async boardId => {
  const allTasks = await getAll();
  const tasksByBoardId = await allTasks.filter(
    task => task.boardId === boardId
  );
  if (!tasksByBoardId.length) {
    throw new createErr(
      404,
      `Tasks on board ${boardId} have not been found in DB`
    );
  }
  return tasksByBoardId;
};

const add = async task => {
  const newTask = await tasksRepo.add(task);
  if (!newTask) throw new createErr(400, 'Could not create the new Task');
  return newTask;
};

const update = async task => {
  const updatedTask = await tasksRepo.update(task);
  if (!updatedTask) {
    throw new createErr(400, `Could not update Task: ${task.id}`);
  }
  return updatedTask;
};

const remove = async id => {
  const deletedTask = await tasksRepo.remove(id);
  if (!deletedTask) throw new createErr(400, `Could not delete Task: ${id}`);
  return deletedTask;
};

const unsubscribeUserTasks = async id => {
  const allTasks = await getAll();
  for (const task of allTasks) {
    if (task.userId === id) {
      const { _id, title, order, description, boardId, columnId } = task;
      await update({
        id: _id,
        title,
        order,
        description,
        userId: null,
        boardId,
        columnId
      });
    }
  }
};

const unsubscribeBoardTasks = async id => {
  const allTasks = await getAll();
  for (const task of allTasks) {
    if (task.boardId === id) await remove(task._id);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  unsubscribeUserTasks,
  getTasksByBoardId,
  unsubscribeBoardTasks
};
