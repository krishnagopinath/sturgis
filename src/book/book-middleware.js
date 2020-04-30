const HttpStatus = require('http-status-codes')

const {
    makeHttpError,
    makeHttpBadRequestError,
    isNil,
} = require('../common/utils/index')

const bookModel = require('./book-model')
const bookUtils = require('./book-utils')
const { ERRORS } = require('./book-constants')

const bookNotFoundErr = makeHttpError(HttpStatus.NOT_FOUND)
const invalidIsbnErr = makeHttpBadRequestError(ERRORS.INVALID_ISBN)

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

exports.validateBook = async function validateBook(req, res, next) {
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
