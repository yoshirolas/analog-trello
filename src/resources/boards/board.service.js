const boardsRepo = require('./board.memory.repository');
const taskService = require('./../tasks/task.service');
const createErr = require('http-errors');

const getAll = () => boardsRepo.getAll();

const getById = async id => {
  const board = await boardsRepo.getById(id);
  if (!board) throw new createErr(404, 'Board ' + id + ' has not been found in DB');
  return board;
}

const add = async board => {
  const newBoard = await boardsRepo.add(board);
  if (!newBoard) throw new createErr(404, 'Could not create the new Board');
  return newBoard;
};

const update = async board => {
  const updatedBoard = boardsRepo.update(board);
  if (!updatedBoard) throw new createErr(400, 'Could not update Board: ' + board.id);
  return updatedBoard;
}

const remove = async id => {
  const removedBoard = await boardsRepo.remove(id);
  if (!removedBoard) throw new createErr(404, 'Could not delete Board: ' + id);
  taskService.unsubscribeBoardTasks(id);
  return removedBoard;
};

module.exports = { getAll, getById, add, update, remove };
