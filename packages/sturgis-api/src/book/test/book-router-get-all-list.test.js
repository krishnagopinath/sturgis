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
const { createCheckouts } = require('../../checkout/test/checkout-test-utils')
const { testBookSetup } = require('./book-test-utils')

testDbSetup()
testUserSetup()
testBookSetup()

testApiSetup('/api/book')
testLibrarianRole('get')

test('(200) returns expected data', async t => {
    // create checkouts for all the books
    const {
        books,
        users: { members },
    } = t.context
    const checkouts = await createCheckouts(t, books, [
        ...members,
        ...members,
        members[0],
    ])

    const res = await getApiClient()
        .get(t.context.apiUrl)
        .set('x-user-id', t.context.users.librarian.id)

    t.is(res.status, HttpStatus.OK)
    t.is(res.body.length, books.length)

    t.deepEqual(
        Object.keys(res.body[0]).sort(),
        [
            'id',
            'isbn',
            'author',
            'name',
            'thumbnail_url',
            'created_by_id',
            'created_at',
            'checkout_id',
        ].sort(),
    )

    // Ensure that checkouts are mapped as expected
    res.body.forEach(b => {
        t.is(b.checkout_id, checkouts.find(c => c.book_id === b.id).id)
    })
})

test('(200) returns null checkouts if they do not exist', async t => {
    const res = await getApiClient()
        .get(t.context.apiUrl)
        .set('x-user-id', t.context.users.librarian.id)

    t.is(res.status, HttpStatus.OK)
    t.is(res.body.length, t.context.books.length)

    // Ensure that checkouts are mapped as expected
    res.body.forEach(b => t.is(b.checkout_id, null))
})

test('(200) returns expected list, sorted alphabetically by name', async t => {
    // Sort expected list by name
    const expected = t.context.books
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))

    const res = await getApiClient()
        .get(t.context.apiUrl)
        .set('x-user-id', t.context.users.librarian.id)

    t.is(res.status, HttpStatus.OK)
    t.is(res.body.length, expected.length)

    t.deepEqual(
        res.body.map(b => b.id),
        expected.map(b => b.id),
    )
})
