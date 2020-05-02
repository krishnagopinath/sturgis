const { Router } = require('express')
const HttpStatus = require('http-status-codes')

const checkoutModel = require('../checkout/checkout-model')

module.exports = Router().get('/overdue', async (req, res, next) => {
    try {
        const overdueCheckouts = await checkoutModel.getAllOverdue()
        res.status(HttpStatus.OK).json(overdueCheckouts)
    } catch (error) {
        next(error)
    }
})
