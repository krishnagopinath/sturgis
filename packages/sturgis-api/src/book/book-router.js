const { Router } = require('express')

const { librarianOnly } = require('../user/user-middleware')
const {
    doesBookExist,
    validateBookAdd,
    validateBookRemove,
} = require('./book-middleware')
const { addBook, removeBook, getBookList } = require('./book-actions')

module.exports = Router()
    .get('/', getBookList)
    // Librarian only routes
    .use(librarianOnly)
    .post('/', validateBookAdd, addBook)
    .delete('/:id', doesBookExist, validateBookRemove, removeBook)
