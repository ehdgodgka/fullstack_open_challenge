const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('---');
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: { messsage: 'unknown endpoint' } });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.name, error.message);

  switch (error.name) {
    case 'CastError':
      return response
        .status(400)
        .send({ error: { name: 'CastError', message: 'malformatted id' } });
      break;
    case 'ValidationError':
      return response
        .status(400)
        .json({ error: { name: 'ValidationError', message: error.message } });
      break;
    case 'JsonWebTokenError':
    case 'unAuthorized':
      return response.status(401).json({ error: { name: 'unAuthorized', message: error.message } });
      break;

    default:
      return;
  }
  if (error.name.includes('MongoError')) {
    return response.status(400).json({ error: { name: 'MongoError', message: error.message } });
  }

  next(error);
};

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
};
