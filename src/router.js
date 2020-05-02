const { Router } = require('express')
const bodyParser = require('body-parser')

const { parseUser, librarianOnly } = require('./user/user-middleware')

const bookRouter = require('./book/book-router')
const checkoutRouter = require('./checkout/checkout-router')
const reportRouter = require('./reports/report-router')

module.exports = Router()
    .get('/', (req, res) => {
        res.send(`Hey! Welcome to the Sturgis API.`)
    })
    // For parsing JSON payloads
    .use(bodyParser.json())
    // Parse user info
    .use(parseUser)
    .use('/checkout', checkoutRouter)
    // Librarian only routes
    .use(librarianOnly)
    .use('/book', bookRouter)
    .use('/report', reportRouter)
