const HttpStatus = require('http-status-codes')

const {
    makeHttpError,
    makeHttpBadRequestError,
    makeHttpForbiddenError,
    isNil,
} = require('../common/utils/index')

const checkoutModel = require('../checkout/checkout-model')

const bookModel = require('./book-model')
const bookUtils = require('./book-utils')
const { ERRORS } = require('./book-constants')

const bookNotFoundErr = makeHttpError(HttpStatus.NOT_FOUND)
const invalidIsbnErr = makeHttpBadRequestError(ERRORS.INVALID_ISBN)
const checkedOutDeleteErr = makeHttpForbiddenError(ERRORS.BOOK_CHECKED_OUT)

exports.checkBookExists = async function checkBookExists(req, res, next) {
    try {
        if (!req.params.id) return next(bookNotFoundErr)

        const id = parseInt(req.params.id, 10)
        if (Number.isNaN(id)) return next(bookNotFoundErr)

        const item = await bookModel.getById(id)
        if (isNil(item)) return next(bookNotFoundErr)

        req.item = item
        next()
    } catch (error) {
        next(error)
    }
}

exports.validateBookAdd = async function validateBookAdd(req, res, next) {
    try {
        const { isbn } = req.body || {}
        if (!isbn) return next(invalidIsbnErr)

        const bookInfo = await bookUtils.getInfoByIsbn(isbn)
        if (!bookInfo) return next(invalidIsbnErr)

        req.bookInfo = bookInfo
        next()
    } catch (error) {
        return next(error)
    }
}

exports.validateBookRemove = async function validateBookRemove(req, res, next) {
    try {
        const checkouts = await checkoutModel.getByBookId(req.item.id)
        if (checkouts.length > 0) return next(checkedOutDeleteErr)

        next()
    } catch (error) {
        return next(error)
    }
}
