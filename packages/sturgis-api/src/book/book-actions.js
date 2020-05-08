const HttpStatus = require('http-status-codes')

const bookModel = require('./book-model')

/**
 * Controller method used to add a book to the library
 */
exports.addBook = async function addBook(req, res, next) {
    try {
        const bookFromDb = await bookModel.create(req.bookInfo, req.user)
        res.status(HttpStatus.CREATED).json(bookFromDb)
    } catch (error) {
        next(error)
    }
}

/**
 * Controller method used to remove a copy from the library
 */
exports.removeBook = async function removeBook(req, res, next) {
    try {
        await bookModel.deleteById(req.item.id)
        res.status(HttpStatus.OK).end()
    } catch (error) {
        next(error)
    }
}

/**
 * Controller method that gets all the available books
 */
exports.getAvailableBooks = async function getAvailableBooks(req, res, next) {
    try {
        const books = await bookModel.getAllAvailable()
        res.status(HttpStatus.OK).json(books)
    } catch (error) {
        next(error)
    }
}

/**
 * Controller method that gets all the books
 */
exports.getAllBooks = async function getAllBooks(req, res, next) {
    try {
        const books = await bookModel.getAll()
        res.status(HttpStatus.OK).json(books)
    } catch (error) {
        next(error)
    }
}
