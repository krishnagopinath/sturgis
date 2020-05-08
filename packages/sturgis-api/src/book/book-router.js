const { Router } = require('express')

const { librarianOnly } = require('../user/user-middleware')
const {
    doesBookExist,
    validateBookAdd,
    validateBookRemove,
} = require('./book-middleware')
const {
    addBook,
    removeBook,
    getAvailableBooks,
    getAllBooks,
} = require('./book-actions')

module.exports = Router()
    .get('/available', getAvailableBooks)
    // Librarian only routes
    .use(librarianOnly)
    .get('/', librarianOnly, getAllBooks)
    .post('/', validateBookAdd, addBook)
    .delete('/:id', doesBookExist, validateBookRemove, removeBook)
