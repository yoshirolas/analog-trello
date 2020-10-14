const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const taskService = require('./../tasks/task.service');
const taskRouter = require('./../../resources/tasks/task.router');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.status(200).json(boards);
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const board = await boardService.getById(id);

  if (board) {
    res.status(200).json(board);
  } else {
    res.status(404).send('Board ' + id + ' has not been found in DB');
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const newBoard = new Board({
    title,
    columns
  });

  const board = await boardService.add(newBoard);
  if (board) {
    res.status(200).json(board);
  } else {
    res.status(404).send('Could not create the new Board');
  }
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const { title, columns } = req.body;
  const updateBoard = new Board({
    id,
    title,
    columns
  });
  const board = await boardService.update(updateBoard);
  if (board) {
    res.status(200).json(board);
  } else {
    res.status(400).send('Could not update Board: ' + id);
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  const deletedBoard = await boardService.remove(id);
  if (deletedBoard) {   
    res.status(204).json(deletedBoard);
  } else {
    res.status(404).send('Could not delete Board: ' + id);
  }
});


module.exports = router;
