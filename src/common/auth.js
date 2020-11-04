const createErr = require('http-errors');
const { verifyToken } = require('./jwt');

const SKIP_AUTH_URLS = ['/doc', '/login', '/'];

const checkAuth = async (req, res, next) => {
    try {
        const url = req.originalUrl;
        if (SKIP_AUTH_URLS.indexOf(url) > -1) return next(); //Skip
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new createErr(401, 'Unauthorized error');
    
        const token = authHeader.replace('Bearer ', '');
        const verifiedPayload = await verifyToken(token);
        if (!verifiedPayload) throw new createErr(401, 'Unauthorized error');
        next();   
    } catch (error) {
        return next(error);
    }
};

module.exports = checkAuth;