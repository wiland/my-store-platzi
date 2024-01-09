// eslint-disable-next-line no-unused-vars
function errorResponseHandler(e, req, res, next) {
  res.status(500).json({
    message: e.message,
    stack: e.stack
  });
}

function boomErrorHandler(e, req, res, next) {
  if (e.isBoom) {
    res.status(e.output.statusCode).json(e.output.payload);
  } else {
    next(e);
  }
}

module.exports = { errorResponseHandler, boomErrorHandler }
