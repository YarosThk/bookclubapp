// Error nandler middleware in order to replace Express' default error handler
const logErrors = (err, req, res, next) => {
  console.log('Error logger');
  console.error(err.stack);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  logErrors,
  errorHandler,
};
