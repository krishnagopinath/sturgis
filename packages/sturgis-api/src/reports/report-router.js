const { Router } = require('express')
const HttpStatus = require('http-status-codes')

const { librarianOnly } = require('../user/user-middleware')
const checkoutModel = require('../checkout/checkout-model')

/**
 * Simple report router
 */
module.exports = Router().use(librarianOnly).get('/overdue', getOverdueBooks)

/**
 * Controller method that gets overdue books
 */
async function getOverdueBooks(req, res, next) {
    try {
        const overdueCheckouts = await checkoutModel.getAllOverdue()
        res.status(HttpStatus.OK).json(overdueCheckouts)
    } catch (error) {
        next(error)
    }
}
