const test = require('ava')
const HttpStatus = require('http-status-codes')

const {
    testDbSetup,
    getApiClient,
    testApiSetup,
} = require('../../common/test-utils/index')
const {
    testUserSetup,
    testLibrarianRole,
} = require('../../user/test/user-test-utils')
const { createCheckout } = require('../../checkout/test/checkout-test-utils')
const { testBookSetup } = require('./book-test-utils')

const bookModel = require('../book-model')
const { ERRORS } = require('../book-constants')

testDbSetup()
testUserSetup()
testBookSetup()

testApiSetup('/api/book/{books.0.id}')

testLibrarianRole('delete')

test('(404) book not found', async t => {
    const res = await getApiClient()
        .delete(`/api/book/7634782384`)
        .set('x-user-id', t.context.users.librarian.id)

    t.is(res.status, HttpStatus.NOT_FOUND)
})

test('(403) cannot remove checked out book', async t => {
    // Create checkout for book[0]
    await createCheckout(t, t.context.books[0])

    // Try removing book
    const res = await getApiClient()
        .delete(t.context.apiUrl)
        .set('x-user-id', t.context.users.librarian.id)

    // Assert errors
    t.is(res.status, HttpStatus.FORBIDDEN)
    t.is(res.body.error.code, ERRORS.BOOK_CHECKED_OUT.code)
})

test('(200) book deleted', async t => {
    const res = await getApiClient()
        .delete(t.context.apiUrl)
        .set('x-user-id', t.context.users.librarian.id)

    t.is(res.status, HttpStatus.OK)

    const book = await bookModel.getById(t.context.books[0].id)
    t.falsy(book)
})
