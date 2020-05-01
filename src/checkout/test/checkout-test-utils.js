const checkoutModel = require('../checkout-model')

exports.createCheckouts = async function createCheckouts(t, bookList, user) {
    // Create 3 checkouts for member 1
    const {
        users: { members },
        books,
    } = t.context
    const checkouts = await checkoutModel.insertMany(
        // Pick books in index 1,2,3 because index 0 is used for API request
        bookList || books.slice(1, 4),
        user || members[0],
    )

    t.is(checkouts.length, 3)

    return checkouts
}

exports.createCheckout = async function createCheckout(t, book, user) {
    const {
        books,
        users: { members },
    } = t.context
    return checkoutModel.createAndFetch(book || books[0], user || members[0])
}
