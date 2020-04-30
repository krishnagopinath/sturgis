const HttpStatus = require('http-status-codes')

const bookModel = require('./book-model')

exports.addBook = async function addBook(req, res, next) {
    try {
        const bookFromDb = await bookModel.create(req.bookInfo, req.user)
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
