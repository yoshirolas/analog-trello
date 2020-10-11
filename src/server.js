const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);


// Adds mock DB data
const User = require('./resources/users/user.model');
const db = require('./db/schema');
try {
  const mockUsers = [];
  for (let i=0; i < 5; i ++) {
    const newUser = new User({
      name: 'user-' + i,
      login: 'login-' + i,
      password: '123'
    });
    mockUsers.push(newUser);
    db.Users = mockUsers;
  }
} catch (error) {
  throw new Error(error)
}