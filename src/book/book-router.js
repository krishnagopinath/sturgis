const { Router } = require('express')

const { addBook } = require('./book-actions')

module.exports = Router().post('/', addBook)
