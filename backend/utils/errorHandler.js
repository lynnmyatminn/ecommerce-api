class ErrorHandler extends Error {
  constructor(message, statusCode) {
    //Super function is represented as a constructor of the parent class
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
