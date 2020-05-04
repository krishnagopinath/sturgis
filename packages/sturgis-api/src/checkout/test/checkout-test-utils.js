const test = require('ava')
const { subMonths, isAfter } = require('date-fns')

const bookModel = require('../../book/book-model')
const checkoutModel = require('../checkout-model')

exports.createCheckouts = async function createCheckouts(
    t,
    bookList,
    userList,
) {
    // Create 3 checkouts for member 1
    const {
        users: { members },
        books,
    } = t.context

    // Pick books in index 1,2,3
    const booksToCheckout = bookList || books.slice(1, 4)
    const checkingOutUsers =
        userList || Array(booksToCheckout.length).fill(members[0])

    t.is(
        booksToCheckout.length,
        checkingOutUsers.length,
        'bookList and userList must have equal length',
    )

    const checkouts = await checkoutModel.insertMany(
        booksToCheckout,
        checkingOutUsers,
    )

    t.is(checkouts.length, booksToCheckout.length)

    return checkouts
}

exports.createCheckout = async function createCheckout(t, book, user) {
    const {
        books,
        users: { members },
    } = t.context
    return checkoutModel.createAndFetch(book || books[0], user || members[0])
}

exports.makeCheckoutOverdue = async function makeCheckoutOverdue(
    t,
    checkout,
    fn,
) {
    const ogDate = checkout.created_at
    checkout = await checkoutModel.patchById(checkout.id, {
        created_at: fn
            ? // This fn must return a changed date!
              fn(checkout.created_at)
            : subMonths(checkout.created_at, 1),
    })
    t.true(isAfter(ogDate, checkout.created_at))
    return checkout
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
