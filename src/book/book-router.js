const { Router } = require('express')

const { checkBookExists, validateBook } = require('./book-middleware')
const { addBook, removeBook } = require('./book-actions')

module.exports = Router()
    .post('/', validateBook, addBook)
    .delete('/:id', checkBookExists, removeBook)
