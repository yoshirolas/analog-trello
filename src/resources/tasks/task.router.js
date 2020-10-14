const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

// router.route('/').get(async (req, res) => {
//   const tasks = await taskService.getAll();
//   res.status(200).json(tasks);
// });

router.route('/').get(async (req, res) => {
  const boardId = req.boardId;
  const allTasks = await taskService.getAll();
  const tasksByBoardId = allTasks.filter(task => task.boardId === boardId)

  if (tasksByBoardId) {
    res.status(200).json(tasksByBoardId);
  } else {
    res.status(404).send('Tasks on board ' + boardId + ' have not been found in DB');
  }
});

router.route('/').post(async (req, res) => {
  const boardId = req.boardId;
  const { title, order, description, userId, columnId } = req.body;
  const newTask = new Task({
    title,
    order,
    description,
    boardId,
    userId,
    columnId
  });

  const task = await taskService.add(newTask);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).send('Could not create the new Task');
  }
});

router.route('/:taskId').get(async (req, res) => {
  const boardId = req.boardId;
  const { taskId } = req.params;
  const task = await taskService.getById(taskId); // Expecting that task has the unique ID

  if (task && task.boardId === boardId) {
    res.status(200).json(task);
  } else {
    res.status(404).send('Task ' + taskId + ' on board ' + boardId + ' has not been found in DB');
  }
});

router.route('/:taskId').put(async (req, res) => {
  const boardId = req.boardId;
  const { taskId } = req.params;
  const { title, order, description, userId, columnId } = req.body;
  const updateTask = new Task({
    id: taskId,
    title,
    order,
    description,
    boardId,
    userId,
    columnId
  });
  const updatedTask = await taskService.update(updateTask);
  if (updatedTask) {
    res.status(200).json(updatedTask);
  } else {
    res.status(400).send('Could not update Task: ' + taskId);
  }
});

router.route('/:taskId').delete(async (req, res) => {
  const boardId = req.boardId;
  const { taskId } = req.params;
  const deletedBoard = await taskService.remove(taskId);
  if (deletedBoard) {
    res.status(204).json(deletedBoard);
  } else {
    res.status(404).send('Could not delete Task: ' + taskId);
  }
});

module.exports = router;
