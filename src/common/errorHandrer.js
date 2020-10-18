

const errorHandler = (err, req, res, next) => {
    console.log('!!!status: ', err.status)
    console.log('!!!status: ', err.message)

    if (!err.status) res.status(500).send('Internal Server Error');
    res.status(err.status).send(err.message);
};

module.exports = errorHandler;