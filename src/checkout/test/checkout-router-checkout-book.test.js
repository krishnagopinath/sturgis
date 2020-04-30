const test = require('ava')
const HttpStatus = require('http-status-codes')
const { subMonths, isAfter } = require('date-fns')

const {
    testDbSetup,
    getApiClient,
    testApiSetup,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')
const { testBookSetup } = require('../../book/test/book-test-utils')

const { ERRORS } = require('../checkout-constants')
const checkoutModel = require('../checkout-model')
const bookModel = require('../../book/book-model')

const getCheckoutPayload = t => ({ isbn: t.context.books[0].isbn })

async function createCheckouts(t, bookList) {
    // Create 3 checkouts for member 1
    const {
        users: { members },
        books,
    } = t.context
    const checkouts = await checkoutModel.insertMany(
        // Pick books in index 1,2,3 because index 0 is used for API request
        bookList || books.slice(1, 4),
        members[0],
    )

    t.is(checkouts.length, 3)

    return checkouts
}

async function createCheckout(t, book, user) {
    const {
        books,
        users: { members },
    } = t.context
    return checkoutModel.createAndFetch(book || books[0], user || members[0])
}

testDbSetup()
testUserSetup()
testBookSetup()

testApiSetup('/api/checkout/')

test('(400) bad `isbn`', async t => {
    const res = await getApiClient()
        .post(t.context.apiUrl)
        .set('x-user-id', t.context.users.members[0].id)
        .send({ isbn: undefined })

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.INVALID_ISBN.code)
})

test('(400) book not found in library', async t => {
    const res = await getApiClient()
        .post(t.context.apiUrl)
        .set('x-user-id', t.context.users.members[0].id)
        .send({ isbn: '9780753814031' })

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.BOOK_NOT_IN_LIBRARY.code)
})

test('(400) all copies checked out', async t => {
    // Checkout all copies of a book
    const { users, books } = t.context
    await createCheckout(t, books[0], users.members[0])
    await createCheckout(t, books[1], users.members[1])

    // Try checking out same book
    const res = await getApiClient()
        .post(t.context.apiUrl)
        .set('x-user-id', t.context.users.members[2].id)
        .send(getCheckoutPayload(t))

    // Assert that it's not possible
    // TODO: Must ideally be forbidden, logic must be decoupled in `checkout-middleware`
    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.BOOK_NOT_IN_LIBRARY.code)
})

test('(403) exceeded checkout limit (3)', async t => {
    // Create 3 checkouts
    await createCheckouts(t)

    // Try checking out 4th book
    const res = await getApiClient()
        .post(t.context.apiUrl)
        .set('x-user-id', t.context.users.members[0].id)
        .send(getCheckoutPayload(t))

    // Assert that it's not possible
    t.is(res.status, HttpStatus.FORBIDDEN)
    t.is(res.body.error.code, ERRORS.CHECKOUT_LIMIT_EXCEEDED.code)
})

test('(403) overdue books (> 2 weeks)', async t => {
    // Create checkout
    let overdue = await createCheckout(t)

    // Update created_at on one of the checkouts
    const ogDate = overdue.created_at
    overdue = await checkoutModel.patchById(overdue.id, {
        created_at: subMonths(overdue.created_at, 1),
    })
    t.true(isAfter(ogDate, overdue.created_at))

    // Try checking out book
    const res = await getApiClient()
        .post(t.context.apiUrl)
        .set('x-user-id', t.context.users.members[0].id)
        .send(getCheckoutPayload(t))

    // Assert that it's not possible
    t.is(res.status, HttpStatus.FORBIDDEN)
    t.is(res.body.error.code, ERRORS.OVERDUE_BOOKS.code)
})

test('(403) checking out multiple copies of book', async t => {
    // Create checkout for user
    await createCheckout(t, t.context.books[0])

    // Try checking out same book
    const res = await getApiClient()
        .post(t.context.apiUrl)
        .set('x-user-id', t.context.users.members[0].id)
        .send(getCheckoutPayload(t))

    // Assert that it's not possible
    t.is(res.status, HttpStatus.FORBIDDEN)
    t.is(res.body.error.code, ERRORS.BOOK_ALREADY_CHECKED_OUT.code)
})

test('(201) checkout created', async t => {
    const [member] = t.context.users.members
    const res = await getApiClient()
        .post(t.context.apiUrl)
        .set('x-user-id', member.id)
        .send(getCheckoutPayload(t))

    t.is(res.status, HttpStatus.OK)

    // Expected fields
    t.truthy(res.body.id)
    t.deepEqual(
        Object.keys(res.body).sort(),
        ['id', 'book', 'created_by_id', 'created_at'].sort(),
    )
    t.deepEqual(
        Object.keys(res.body.book).sort(),
        ['id', 'isbn', 'author', 'name'].sort(),
    )

    // Data accuracy
    const bookFromDb = await bookModel.getById(res.body.book.id)
    const checkoutFromDb = await checkoutModel.getById(res.body.id)

    t.truthy(bookFromDb)
    t.truthy(checkoutFromDb)
    t.is(checkoutFromDb.created_by_id, member.id)
    t.truthy(checkoutFromDb.created_at)
})
