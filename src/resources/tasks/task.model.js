const uuid = require('uuid');
const { USE_MONGO } = require('./../../common/config');

class TaskInMemoryModel {
  constructor({
    id = uuid(),
    title = 'BOARD',
    order = '0',
    description = 'Test task',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

const getTaskMongoModel = () => {
  const mongoose = require('mongoose');

  const taskSchema = new mongoose.Schema({
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number,
    description: String,
    userId: {
      type: String,
      default: uuid
    },
    boardId: {
      type: String,
      default: uuid
    },
    columnId: {
      type: String,
      default: uuid
    }
  });

  taskSchema.statics.toResponse = task => {
    const { _id, title, order, description, userId, boardId, columnId } = task;
    return { id: _id, title, order, description, userId, boardId, columnId };
  };

  return mongoose.model('Task', taskSchema);
};

const Task = USE_MONGO ? getTaskMongoModel() : TaskInMemoryModel;

module.exports = Task;
