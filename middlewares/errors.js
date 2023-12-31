const ErrorHandler = require('./utils/errorHandler');

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;

    if(process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }

    if(process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err };
        error.message = err.message;

        //Wrong mongoose ObjectId error
        if(err.name === 'CastError') {
            const message = `Resourse not found. INVALID: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        // Handling mongoose validation error
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }


        // Handling mongoose duplicate key errors
        if(err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error = new ErrorHandler(message, 400);
        }

        // Handling wrong JWT error
        if(err.name === 'JsonWebTokenError') {
            const message = 'JSON web token is invaid. Try again!!!'
            error = new ErrorHandler(message,400);
        }

        // Handling expired JWT error
        if(err.name === 'TokenExpiredError') {
            const message = 'JSON web token is expired. Try again!!!'
            error = new ErrorHandler(message,400);
        }


        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}