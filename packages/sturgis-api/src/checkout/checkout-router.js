const { Router } = require('express')

const { addCheckout, getCheckouts, getCheckout } = require('./checkout-actions')
const { validateCheckout, doesCheckoutExist } = require('./checkout-middleware')

module.exports = Router()
    .post('/', validateCheckout, addCheckout)
    .get('/:id', doesCheckoutExist, getCheckout)
    .get('/', getCheckouts)
