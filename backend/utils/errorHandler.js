class ErrorHandler extends Error {
    constructor(message, statusCode) {
        //super function represents the constructor of parent class
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;