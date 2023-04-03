const logger = require('./logger');


// utils function to not show "body: [Object object]" by every damn request, lol
const isEmpty = (object) => {
    return (Object.keys(object).length === 0) ? true : false;
};

const requestLogger = (req, resp, next) => {
    logger.info('Method: ' + req.method);
    logger.info('Path: ' + req.path);
    if (!isEmpty(req.body)) logger.info('Body: ' + req.body);
    logger.info('-----');
    next();
};


const unknownEndpoint = (req, resp) => {
    resp.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (err, req, resp, next) => {
    logger.error(err.message);

    if (err.name === 'CastError')
        return response.status(400).send({ error: "malformatted id" });
    
    if (err.name === 'Validation Error')
        return response.status(400).send({ error: err.message });

    next(err);
};


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler, 
}