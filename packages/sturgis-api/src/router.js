const { Router } = require('express')
const bodyParser = require('body-parser')

const { parseUser } = require('./user/user-middleware')

const bookRouter = require('./book/book-router')
const checkoutRouter = require('./checkout/checkout-router')
const reportRouter = require('./reports/report-router')
const userRouter = require('./user/user-router')

module.exports = Router()
    .get('/', (req, res) => {
        res.send(`Hey! Welcome to the Sturgis API.`)
    })
    // For parsing JSON payloads
    .use(bodyParser.json())
    .use('/user', userRouter)
    // Parse user info
    .use(parseUser)
    .use('/checkout', checkoutRouter)
    .use('/book', bookRouter)
    .use('/report', reportRouter)
