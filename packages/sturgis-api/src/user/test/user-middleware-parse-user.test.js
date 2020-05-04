const test = require('ava')
const HttpStatus = require('http-status-codes')

const { testDbSetup } = require('../../common/test-utils/index')
const { testUserSetup } = require('./user-test-utils')

const { pick } = require('../../common/utils/index')
const { parseUser } = require('../user-middleware')
const { ERRORS } = require('../user-constants')

testDbSetup()
testUserSetup()

test('no `userId` in header', t => {
    return parseUser({ headers: {} }, {}, err => {
        t.is(err.status, HttpStatus.UNAUTHORIZED)
        t.is(err.code, ERRORS.INVALID_USER.code)
    })
})

test('user not found', t => {
    return parseUser({ headers: { 'x-user-id': 45 } }, {}, err => {
        t.is(err.status, HttpStatus.UNAUTHORIZED)
        t.is(err.code, ERRORS.INVALID_USER.code)
    })
})

test('valid user', t => {
    const [expectedUser] = t.context.users.members
    const req = { headers: { 'x-user-id': expectedUser.id } }

    return parseUser(req, {}, () => {
        t.truthy(req.user)
        t.deepEqual(
            pick(req.user, 'id', 'name', 'role'),
            pick(expectedUser, 'id', 'name', 'role'),
        )
    })
})
