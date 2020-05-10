/**
 * Global error handler
 * All `next` calls with an error end up here.
 *
 * TODO: This must be connected to a sink for production use
 */
exports.errorHandler = function errorHandler(err, req, res, next) {
    const { status, message } = err

    const errorStatus = status || 500
    if (
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
    ) {
        // This is a programming error, which should be logged
        if (errorStatus === 500) console.error(err)

        // Development error handler that prints stacktrace
        return res.status(status || 500).json({
            message: message,
            error: err,
        })
    }

    // Production error handler that does not leak stacktraces to user
    res.status(err.status || 500).json({
        message: message,
        error: {},
    })

    next()
}
