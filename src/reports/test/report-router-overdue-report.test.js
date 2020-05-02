const test = require('ava')
const HttpStatus = require('http-status-codes')
const { subMonths, subWeeks } = require('date-fns')

const {
    testDbSetup,
    getApiClient,
    testApiSetup,
} = require('../../common/test-utils/index')
const {
    testUserSetup,
    testLibrarianRole,
} = require('../../user/test/user-test-utils')
const { testBookSetup } = require('../../book/test/book-test-utils')
const {
    createCheckouts,
    makeCheckoutOverdue,
} = require('../../checkout/test/checkout-test-utils')

testDbSetup()
testUserSetup()
testBookSetup()

testApiSetup('/api/report/overdue')

testLibrarianRole('get')

test.beforeEach(async t => {
    const { books, users } = t.context

    const checkoutCount = 3
    t.context.checkouts = await createCheckouts(
        t,
        books.slice(1, 1 + checkoutCount),
        users.members,
    )
    t.is(t.context.checkouts.length, checkoutCount)
})

test('(200) no overdue books', async t => {
    const res = await getApiClient()
        .get(t.context.apiUrl)
        .set('x-user-id', t.context.users.librarian.id)
    t.is(res.status, HttpStatus.OK)

    t.deepEqual(res.body, [])
})

test('(200) returns expected list', async t => {
    // Patch checkouts dates, so they are over two weeks
    await Promise.all(
        t.context.checkouts.map(c => {
            return makeCheckoutOverdue(t, c)
        }),
    )

    const res = await getApiClient()
        .get(t.context.apiUrl)
        .set('x-user-id', t.context.users.librarian.id)

    t.is(res.status, HttpStatus.OK)
    t.is(res.body.length, t.context.checkouts.length)

    t.deepEqual(
        res.body.map(c => c.id).sort(),
        t.context.checkouts.map(c => c.id).sort(),
    )
})

test('(200) sorted by oldest to newest', async t => {
    // Patch dates in a staggered way
    const { checkouts } = t.context
    const patchedCheckouts = await Promise.all([
        // checked out 2 weeks ago
        makeCheckoutOverdue(t, checkouts[1], d => subWeeks(d, 2)),
        // checked out 3 months ago
        makeCheckoutOverdue(t, checkouts[0], d => subMonths(d, 3)),
        // checked out 1 month ago
        makeCheckoutOverdue(t, checkouts[2], d => subMonths(d, 1)),
    ])

    const expectedIdsInOrder = patchedCheckouts
        .sort((a, b) => a.created_at - b.created_at)
        .map(c => c.id)

    const res = await getApiClient()
        .get(t.context.apiUrl)
        .set('x-user-id', t.context.users.librarian.id)

    t.is(res.status, HttpStatus.OK)

    t.deepEqual(
        res.body.map(c => c.id),
        expectedIdsInOrder,
    )
})
