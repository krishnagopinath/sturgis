const { Router } = require('express')

const {
    doesBookExist,
    validateBookAdd,
    validateBookRemove,
} = require('./book-middleware')
const { addBook, removeBook } = require('./book-actions')

module.exports = Router()
    .post('/', validateBookAdd, addBook)
    .delete('/:id', doesBookExist, validateBookRemove, removeBook)
