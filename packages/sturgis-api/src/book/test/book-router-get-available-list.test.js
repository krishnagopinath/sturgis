const test = require('ava')
const HttpStatus = require('http-status-codes')

const {
    testDbSetup,
    getApiClient,
    testApiSetup,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')
const { createCheckouts } = require('../../checkout/test/checkout-test-utils')
const { testBookSetup } = require('./book-test-utils')

testDbSetup()
testUserSetup()
testBookSetup()

testApiSetup('/api/book/available')

test('(200) empty list if no available books', async t => {
    // create checkouts for all the books
    const {
        books,
        users: { members },
    } = t.context
    await createCheckouts(t, books, [...members, ...members, members[0]])

    const res = await getApiClient()
        .get(t.context.apiUrl)
        .set('x-user-id', t.context.users.members[1].id)

    t.is(res.status, HttpStatus.OK)
    t.deepEqual(res.body, [])
})

test('(200) returns expected list, sorted alphabetically by name', async t => {
    // Sort expected list by name
    const expected = t.context.books
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))

    const res = await getApiClient()
        .get(t.context.apiUrl)
        .set('x-user-id', t.context.users.members[1].id)

    t.is(res.status, HttpStatus.OK)
    t.is(res.body.length, expected.length)

    t.deepEqual(
        res.body.map(b => b.id),
        expected.map(b => b.id),
    )
})
