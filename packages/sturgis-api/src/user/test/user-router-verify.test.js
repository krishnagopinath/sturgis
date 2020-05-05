const test = require('ava')
const HttpStatus = require('http-status-codes')

const {
    testApiSetup,
    testDbSetup,
    getApiClient,
} = require('../../common/test-utils/index')
const { testUserSetup, assertUser } = require('./user-test-utils')

testDbSetup()
testUserSetup()
testApiSetup('/api/user/verify')

test('(200) verified user', async t => {
    const userId = t.context.users.members[0].id
    const res = await getApiClient()
        .get(t.context.apiUrl)
        .set('x-user-id', t.context.users.members[0].id)

    t.is(res.status, HttpStatus.OK)
    await assertUser(t, userId, res.body)
})
