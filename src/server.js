const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
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
  // console.log('Successfully connected to DB');
  // const User = require('./resources/users/user.model');
  // for (let i = 0; i < 5; i++) {
  //   const newUser = new User({
  //     name: `user-${i}`,
  //     login: `login-${i}`,
  //     password: '123'
  //   });
  //   newUser.save();
  // }
});


app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);



// Adds mock DB data
// const User = require('./resources/users/user.model');
// const db = require('./db/schema');
// const Board = require('./resources/boards/board.model');
// const Column = require('./resources/columns/column.model');
  // try {
//   const mockUsers = [];
//   const mockBoards = [];
//   for (let i = 0; i < 5; i++) {
//     const newUser = new User({
//       name: `user-${i}`,
//       login: `login-${i}`,
//       password: '123'
//     });
//     const newBoard = new Board({
//       title: `board-${i}`,
//       columns: [new Column()]
//     });
//     mockUsers.push(newUser);
//     mockBoards.push(newBoard);
//     db.Users = mockUsers;
//     db.Boards = mockBoards;
//   }
// } catch (error) {
//   throw new Error(error);
// }
