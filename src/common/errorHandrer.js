const { setUpErrorLogger } = require('./logger');

const errorHandler = (err, req, res, next) => {
    if (!err.status) {
        err.status = 500;
        err.message = 'Internal Server Error'
        setUpErrorLogger(err);
        res.status(err.status).send(err.message);
    }
    res.status(err.status).send(err.message);
};

module.exports = errorHandler;