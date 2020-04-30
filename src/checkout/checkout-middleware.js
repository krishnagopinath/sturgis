const { differenceInWeeks } = require('date-fns')

const {
    makeHttpBadRequestError,
    makeHttpForbiddenError,
} = require('../common/utils/index')

const bookModel = require('../book/book-model')
const checkoutModel = require('./checkout-model')
const { ERRORS } = require('./checkout-constants')

const isbnInvalidErr = makeHttpBadRequestError(ERRORS.INVALID_ISBN)
const bookNotInLibErr = makeHttpBadRequestError(ERRORS.BOOK_NOT_IN_LIBRARY)
const checkoutLimitErr = makeHttpForbiddenError(ERRORS.CHECKOUT_LIMIT_EXCEEDED)
const overdueBooksErr = makeHttpForbiddenError(ERRORS.OVERDUE_BOOKS)
const alreadyCheckedOutErr = makeHttpForbiddenError(
    ERRORS.BOOK_ALREADY_CHECKED_OUT,
)

/**
 * Checks if any checkouts are older than 2 weeks
 * @param {*} checkouts
 */
function hasOverdue(checkouts) {
    return checkouts.some(c => differenceInWeeks(new Date(), c.created_at) >= 2)
}

/**
 * Checks if a copy of the book was already checked out
 * @param {*} checkouts
 * @param {*} isbn
 */
function alreadyCheckedOutByUser(checkouts, isbn) {
    return !!checkouts.find(c => c.book.isbn === isbn)
}

exports.validateCheckout = async function validateCheckout(req, res, next) {
    try {
        const { isbn } = req.body || {}
        if (!isbn) return next(isbnInvalidErr)

        // User can checkout a max of 3 books
        const checkoutsByUser = await checkoutModel.getAllByUser(req.user)
        if (checkoutsByUser.length >= 3) return next(checkoutLimitErr)

        // User cannot have overdue books (> 2 weeks)
        if (hasOverdue(checkoutsByUser)) return next(overdueBooksErr)

        // TODO: This could probably be broken down into 2 separate queries
        // This block tries to validate the following rules:
        // - ISBN must exist in the system
        // - If the book exists, copies must be available
        const books = await bookModel.getAllAvailableByIsbn(isbn)
        if (!books.length) return next(bookNotInLibErr)

        // Book must not already be checked out by the user
        if (alreadyCheckedOutByUser(checkoutsByUser, books[0].isbn)) {
            return next(alreadyCheckedOutErr)
        }

        req.availableBooks = books
        next()
    } catch (error) {
        return next(error)
    }
}
