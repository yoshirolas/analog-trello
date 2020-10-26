const uuid = require('uuid');
const { USE_MONGO } = require('./../../common/config');

class BoardInMemoryModel {
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

const getBoardMongoModel = () => {
  const mongoose = require('mongoose');

  const boardSchema = new mongoose.Schema({
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: Array
  });

  boardSchema.statics.toResponse = board => {
    const { title, _id, columns } = board;
    return { title, columns, id: _id };
  };

  return mongoose.model('Board', boardSchema);
};

const Board = USE_MONGO ? getBoardMongoModel() : BoardInMemoryModel;

module.exports = Board;
