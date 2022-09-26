// Error nandler middleware in order to replace Express' default error handler
// const logErrors = (err, req, res, next) => {
//   console.error(err.stack);
//   next(err);
// };

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // only want the error stack in development
  });
};

module.exports = {
  // logErrors,
  errorHandler,
};
