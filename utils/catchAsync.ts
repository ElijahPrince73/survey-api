/* This is an async error handler */
const catchAsync = (fn: Function) => (req, res, next) => {
  fn(req, res, next).catch((err) => next(err));
};

export default catchAsync;
