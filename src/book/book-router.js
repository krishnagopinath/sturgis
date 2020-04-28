const { Router } = require('express')

const { checkBookExists } = require('./book-middleware')
const { addBook, removeBook } = require('./book-actions')

module.exports = Router()
    .post('/', addBook)
    .delete('/:id', checkBookExists, removeBook)
