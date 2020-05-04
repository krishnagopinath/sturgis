const HttpStatus = require('http-status-codes')
const { makeHttpBadRequestError } = require('../common/utils/index')

const { ERRORS } = require('./user-constants')
const userModel = require('./user-model')

const badLoginErr = makeHttpBadRequestError(ERRORS.BAD_LOGIN)

/**
 * Fake login. Does not take in a password.
 *
 * Just returns user information if email matches.
 */
exports.loginUser = async function loginUser(req, res, next) {
    try {
        if (!req.body) return next(badLoginErr)
        if (!req.body.email) return next(badLoginErr)

        const user = await userModel.getByEmail(req.body.email)
        if (!user) return next(badLoginErr)

        res.status(HttpStatus.OK).json(user)
    } catch (error) {
        next(error)
    }
}
