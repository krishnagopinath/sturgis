const HttpStatus = require('http-status-codes')

const { makeHttpError, isNil } = require('../common/utils/index')
const bookModel = require('./book-model')

const bookNotFoundErr = makeHttpError(HttpStatus.NOT_FOUND)

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
