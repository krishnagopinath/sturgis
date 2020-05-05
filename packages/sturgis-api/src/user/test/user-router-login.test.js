const test = require('ava')
const HttpStatus = require('http-status-codes')

const {
    testDbSetup,
    getApiClient,
    testApiSetup,
} = require('../../common/test-utils/index')
const { testUserSetup, assertUser } = require('./user-test-utils')

const { ERRORS } = require('../user-constants')

testDbSetup()
testUserSetup()
testApiSetup('/api/user/login')

test('(400) no payload', async t => {
    const res = await getApiClient().post(t.context.apiUrl)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.BAD_LOGIN.code)
})

test('(400) email does not exist', async t => {
    const res = await getApiClient()
        .post(t.context.apiUrl)
        .send({ email: 'funky@sturgis.com' })

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.BAD_LOGIN.code)
})

test('(200) login successful', async t => {
    const [expectedUser] = t.context.users.members
    const res = await getApiClient()
        .post(t.context.apiUrl)
        .send({ email: t.context.users.members[0].email })

    t.is(res.status, HttpStatus.OK)

    await assertUser(t, expectedUser.id, res.body)
})
