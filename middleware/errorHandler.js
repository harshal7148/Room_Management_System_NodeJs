function errorHandler(error, req, res, next) {
    error.status = error.status || 500;
    res.json({
        error: {
            statusCode: error.status,
            message: error.message || "Internal Server Error."
        }
    });
}

module.exports = errorHandler;