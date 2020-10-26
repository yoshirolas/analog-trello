const uuid = require('uuid');
const { USE_MONGO } = require('./../../common/config');

class UserInMemory {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

const getUserMongoModel = () => {
  const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema({
    _id: {
      type: String,
      default: uuid
    },
    name: String,
    login: String,
    password: String
  });

  userSchema.statics.toResponse = user => {
    const { _id, name, login } = user;
    return { id: _id, name, login };
  };

  return mongoose.model('User', userSchema);
};

const User = USE_MONGO ? getUserMongoModel() : UserInMemory;

module.exports = User;
