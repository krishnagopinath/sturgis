const HttpStatus = require('http-status-codes')

const httpErrorCreators = {
    makeHttpError(status, err = {}) {
        return { status, ...err }
    },
    makeHttpBadRequestError(err = {}) {
        return {
            status: HttpStatus.BAD_REQUEST,
            ...err,
        }
    },
    makeHttpForbiddenError(err = {}) {
        return {
            status: HttpStatus.FORBIDDEN,
            ...err,
        }
    },
}

module.exports = {
    ...require('./check-resource-exists'),
    ...require('./lodash-subs'),
    ...require('./sql'),
    ...require('./validate-env-vars'),
    ...httpErrorCreators,
}
