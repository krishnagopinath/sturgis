const HttpStatus = require('http-status-codes')

const { makeHttpBadRequest } = require('../common/utils/index')

const bookUtils = require('./book-utils')
const bookModel = require('./book-model')
const { ERRORS } = require('./book-constants')

const invalidIsbnErr = makeHttpBadRequest(ERRORS.INVALID_ISBN)

exports.addBook = async function addBook(req, res, next) {
    try {
        const { isbn } = req.body || {}
        if (!isbn) return next(invalidIsbnErr)

        const bookInfo = await bookUtils.getInfoByIsbn(isbn)
        if (!bookInfo) return next(invalidIsbnErr)

        const bookFromDb = await bookModel.create(bookInfo, req.user)
        res.status(HttpStatus.CREATED).json(bookFromDb)
    } catch (error) {
        next(error)
    }
}

exports.removeBook = async function removeBook(req, res, next) {
    try {
        await bookModel.deleteById(req.item.id)
        res.status(HttpStatus.OK).end()
    } catch (error) {
        next(error)
    }
}
