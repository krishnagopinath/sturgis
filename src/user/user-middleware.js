const HttpStatus = require('http-status-codes')

const {
    makeHttpError,
    makeHttpForbiddenError,
} = require('../common/utils/index')

const userModel = require('./user-model')
const { ERRORS, USER_ROLES } = require('./user-constants')

const invalidUserErr = makeHttpError(
    HttpStatus.UNAUTHORIZED,
    ERRORS.INVALID_USER,
)

const invalidRoleError = makeHttpForbiddenError(ERRORS.NO_ACCESS)

/**
 * Gets user information based on header and sets it up on `req.user`
 */
exports.parseUser = async function parseUser(req, res, next) {
    // TODO: This could be the access token of the user, if we decided to build this out!
    const userId = req.headers['x-user-id']
    if (!userId) return next(invalidUserErr)

    try {
        const [user] = await userModel.fetchById(userId)
        if (!user) return next(invalidUserErr)

        req.user = user
        return next()
    } catch (err) {
        return next(invalidUserErr)
    }
}

/**
 * Kicks user out if they are not a librarian
 */
exports.librarianOnly = function librarianOnly(req, res, next) {
    const user = req.user || {}
    return user.role === USER_ROLES.LIBRARIAN ? next() : next(invalidRoleError)
}
