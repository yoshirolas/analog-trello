const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  title: String,
  columns: Array,
});

boardSchema.statics.toResponse = (board) => {
  const {title, _id, columns } = board;
  return { title, columns, id: _id };
};


const Board = mongoose.model('Board', boardSchema);

// class Board {
//   constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }
// }

module.exports = Board;
