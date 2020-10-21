const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

// Adds mock DB data
const User = require('./resources/users/user.model');
const db = require('./db/schema');
const Board = require('./resources/boards/board.model');
const Column = require('./resources/columns/column.model');
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
} catch (error) {
  throw new Error(error);
}
