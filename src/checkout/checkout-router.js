const { Router } = require('express')

const { addCheckout } = require('./checkout-actions')
const { validateCheckout } = require('./checkout-middleware')

module.exports = Router().post('/', validateCheckout, addCheckout)
