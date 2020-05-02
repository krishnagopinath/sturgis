const test = require('ava')
const HttpStatus = require('http-status-codes')

const {
    testDbSetup,
    getApiClient,
    testApiSetup,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')
const { testBookSetup } = require('../../book/test/book-test-utils')
const {
    assertCheckoutResponse,
    createCheckout,
    createCheckouts,
    makeCheckoutOverdue,
} = require('./checkout-test-utils')

const { ERRORS } = require('../checkout-constants')

const getCheckoutPayload = t => ({ isbn: t.context.books[0].isbn })

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
    // Create checkout & update created_at to a time that is older than 2 weeks
    await makeCheckoutOverdue(t, await createCheckout(t))

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

    await assertCheckoutResponse(t, res.body, member)
})
