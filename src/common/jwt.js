const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

const getJwt = async payload => await jwt.sign(payload, JWT_SECRET_KEY);

const verifyToken = async token => await jwt.verify(token, JWT_SECRET_KEY);

module.exports = { getJwt, verifyToken };
