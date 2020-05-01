const { Router } = require('express')

const {
    checkBookExists,
    validateBookAdd,
    validateBookRemove,
} = require('./book-middleware')
const { addBook, removeBook } = require('./book-actions')

module.exports = Router()
    .post('/', validateBookAdd, addBook)
    .delete('/:id', checkBookExists, validateBookRemove, removeBook)
