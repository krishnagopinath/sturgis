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

testApiSetup('/api/checkout/{checkouts.0.id}')

test('(404) checkout not found', async t => {
    const res = await getApiClient()
        .get(`/api/checkout/5847812873`)
        .set('x-user-id', t.context.users.members[0].id)

    t.is(res.status, HttpStatus.NOT_FOUND)
})

test('(404) checkout id of another user', async t => {
    const res = await getApiClient()
        // `apiUrl` is set to return checkouts for the members[0].. 👇
        .get(t.context.apiUrl)
        // but this is request by members[1]!
        .set('x-user-id', t.context.users.members[1].id)

    t.is(res.status, HttpStatus.NOT_FOUND)
})

test('(200) returns expected checkout', async t => {
    const [member] = t.context.users.members
    const res = await getApiClient()
        .get(t.context.apiUrl)
        .set('x-user-id', member.id)

    t.is(res.status, HttpStatus.OK)
    t.truthy(res.body)

    await assertCheckoutResponse(t, res.body, member)
})
