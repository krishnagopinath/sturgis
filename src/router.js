const { Router } = require('express')
const bodyParser = require('body-parser')

const { parseUser, librarianOnly } = require('./user/user-middleware')

const bookRouter = require('./book/book-router')
const checkoutRouter = require('./checkout/checkout-router')

module.exports = Router()
    .get('/', (req, res) => {
        res.send(`Hey! Welcome to the Sturgis API.`)
    })
    // For parsing JSON payloads
    .use(bodyParser.json())
    // Parse user info
    .use(parseUser)
    .use('/book', librarianOnly, bookRouter)
    .use('/checkout', checkoutRouter)
