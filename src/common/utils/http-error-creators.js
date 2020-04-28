const HttpStatus = require('http-status-codes')

exports.makeHttpError = (status, err = {}) => ({ status, ...err })
exports.makeHttpBadRequest = (err = {}) => ({
    status: HttpStatus.BAD_REQUEST,
    ...err,
})
