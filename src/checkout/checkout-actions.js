const HttpStatus = require('http-status-codes')

const checkoutModel = require('./checkout-model')

exports.addCheckout = async function addCheckout(req, res, next) {
    try {
        const [book] = req.availableBooks
        const checkout = await checkoutModel.createAndFetch(book, req.user)
        res.status(HttpStatus.OK).json(checkout)
    } catch (error) {
        next(error)
    }
}
