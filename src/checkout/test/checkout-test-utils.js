const test = require('ava')

const bookModel = require('../../book/book-model')
const checkoutModel = require('../checkout-model')

exports.createCheckouts = async function createCheckouts(t, bookList, user) {
    // Create 3 checkouts for member 1
    const {
        users: { members },
        books,
    } = t.context
    const checkouts = await checkoutModel.insertMany(
        // Pick books in index 1,2,3
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

exports.assertCheckoutResponse = async function assertCheckoutResponse(
    t,
    checkout,
    user,
) {
    // Expected fields
    t.truthy(checkout.id)
    t.deepEqual(
        Object.keys(checkout).sort(),
        ['id', 'book', 'created_by_id', 'created_at'].sort(),
    )
    t.deepEqual(
        Object.keys(checkout.book).sort(),
        ['id', 'isbn', 'author', 'name'].sort(),
    )

    // Data accuracy
    const bookFromDb = await bookModel.getById(checkout.book.id)
    const checkoutFromDb = await checkoutModel.getById(checkout.id)

    t.truthy(bookFromDb)
    t.truthy(checkoutFromDb)
    t.is(checkoutFromDb.created_by_id, user.id)
    t.truthy(checkoutFromDb.created_at)
}

/**
 * Sets up `t.context.checkouts`
 */
exports.testCheckoutSetup = function testCheckoutSetup() {
    test.beforeEach(async t => {
        t.context.checkouts = await exports.createCheckouts(
            t,
            t.context.books.slice(4),
        )
    })
}
