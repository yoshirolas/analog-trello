const createErr = require('http-errors');
const { verifyToken } = require('./jwt');

const ENTRY_POINT_URL = '/';
const SKIP_AUTH_URLS = ['/doc/', '/login'];

const checkAuth = async (req, res, next) => {
  try {
    const url = req.originalUrl;
    for (const skipUrl of SKIP_AUTH_URLS) {
      if (url.indexOf(skipUrl) > -1 || url === ENTRY_POINT_URL) return next(); // Skip
    }
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new createErr(401, 'Unauthorized error');

    const token = authHeader.replace('Bearer ', '');
    const verifiedPayload = await verifyToken(token);
    if (!verifiedPayload) throw new createErr(401, 'Unauthorized error');
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = checkAuth;
