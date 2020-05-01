const { Router } = require('express')

const { addCheckout, getCheckouts } = require('./checkout-actions')
const { validateCheckout } = require('./checkout-middleware')

module.exports = Router()
    .post('/', validateCheckout, addCheckout)
    .get('/', getCheckouts)
