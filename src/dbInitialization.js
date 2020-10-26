const { USE_MONGO, MONGO_CONNECTION_STRING } = require('./common/config');
const User = require('./resources/users/user.model');
const Board = require('./resources/boards/board.model');
const Column = require('./resources/columns/column.model');

const connect = onSuccessConnection => {
  if (USE_MONGO) {
    const mongoose = require('mongoose');

    mongoose.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on('error', () => {
      throw new Error('Could not connect to DB');
    });
    db.once('open', () => {
      db.dropDatabase();
      console.log('Successfully connected to DB');

      // Adds mock DB data
      for (let i = 0; i < 5; i++) {
        const newUser = new User({
          name: `user-${i}`,
          login: `login-${i}`,
          password: '123'
        });
        const newBoard = new Board({
            title: `board-${i}`,
            columns: [new Column()]
          });
        newUser.save();
        newBoard.save();
      }
      onSuccessConnection();
    });
  } else {
    const db = require('./db/schema');

    // Adds mock DB data
    try {
      const mockUsers = [];
      const mockBoards = [];
      for (let i = 0; i < 5; i++) {
        const newUser = new User({
          name: `user-${i}`,
          login: `login-${i}`,
          password: '123'
        });
        const newBoard = new Board({
          title: `board-${i}`,
          columns: [new Column()]
        });
        mockUsers.push(newUser);
        mockBoards.push(newBoard);
        db.Users = mockUsers;
        db.Boards = mockBoards;
      }
      onSuccessConnection();
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = connect;
