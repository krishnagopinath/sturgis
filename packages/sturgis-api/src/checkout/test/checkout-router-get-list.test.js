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
    testCheckoutSetup,
    assertCheckoutResponse,
} = require('./checkout-test-utils')

testDbSetup()
testUserSetup()
testBookSetup()
testCheckoutSetup()

testApiSetup('/api/checkout/')

test('(200) empty list if no checkouts', async t => {
    const res = await getApiClient()
        .get(t.context.apiUrl)
        .set('x-user-id', t.context.users.members[1].id)

    t.is(res.status, HttpStatus.OK)
    t.deepEqual(res.body, [])
})

test('(200) expected list', async t => {
    const [member] = t.context.users.members
    const res = await getApiClient()
        .get(t.context.apiUrl)
        .set('x-user-id', member.id)

    t.is(res.status, HttpStatus.OK)
    t.true(res.body.length > 0)

    // Maybe overkill to do this for every item, but hey, its a reusable fn! 🤷🏻‍♂️
    await Promise.all(
        res.body.map(checkout => {
            return assertCheckoutResponse(t, checkout, member)
        }),
    )
})
