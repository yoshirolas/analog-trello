const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');


router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    res.status(200).json(boards);
  } catch (error) {
    next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const board = await boardService.getById(id);
    res.status(200).json(board);
  } catch (error) {
    next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const { title, columns } = req.body;
    const newBoard = new Board({ title,columns });
    const board = await boardService.add(newBoard);
    res.status(200).json(board);
  } catch (error) {
    next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, columns } = req.body;
    const updateBoard = new Board({ id, title, columns });
    const board = await boardService.update(updateBoard);
    res.status(200).json(board);
  } catch (error) {
    next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedBoard = await boardService.remove(id);
    res.status(204).json(deletedBoard);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
