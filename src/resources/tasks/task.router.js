const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');


router.route('/').get(async (req, res, next) => {
  try {
    const boardId = req.boardId;
    const tasksByBoardId = await taskService.getTasksByBoardId(boardId);
    res.status(200).json(tasksByBoardId);
  } catch (error) {
    next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const boardId = req.boardId;
    const { title, order, description, userId, columnId } = req.body;
    const newTask = new Task({ title, order, description, boardId, userId, columnId });
  
    const task = await taskService.add(newTask);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

router.route('/:taskId').get(async (req, res, next) => {
  try {
    const boardId = req.boardId;
    const { taskId } = req.params;
    const task = await taskService.getById(taskId); // Expecting that task has the unique ID
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

router.route('/:taskId').put(async (req, res, next) => {
  try {
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
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
});

router.route('/:taskId').delete(async (req, res, next) => {
  try {
    const boardId = req.boardId;
    const { taskId } = req.params;
    const deletedTask = await taskService.remove(taskId);
    res.status(204).json(deletedTask);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
