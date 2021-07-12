function errorHandler(error, req, res, next) {
  console.log(error.stack);
  res.status(500).json({ message: error.message });
}

module.exports = errorHandler;
