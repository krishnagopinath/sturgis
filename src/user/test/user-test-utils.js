const test = require('ava')
const HttpStatus = require('http-status-codes')

const { getApiClient } = require('../../common/test-utils/index')
const { userData } = require('../../common/seed')

const { USER_ROLES, ERRORS } = require('../user-constants')
const userModel = require('../user-model')

exports.testLibrarianRole = function testLibrarianRole(httpVerb) {
    test(`(403) forbidden if not librarian`, async t => {
        t.truthy(
            t.context.users,
            'Looks like `t.context.users` is not defined! Did you run `testUserSetup` before this function?',
        )

        const apiClient = getApiClient()
        const res = await apiClient[httpVerb](t.context.apiUrl).set(
            'x-user-id',
            t.context.users.members[0].id,
        )

        t.is(res.status, HttpStatus.FORBIDDEN)
        t.is(res.body.error.code, ERRORS.NO_ACCESS.code)
    })
}

/**
 * Sets up `t.context.users.librarian` & `t.context.users.members`
 */
exports.testUserSetup = function testUserSetup() {
    test.beforeEach(async t => {
        const users = await userModel.insertMany(userData)

        t.context.users = {
            librarian: users.find(u => u.role === USER_ROLES.LIBRARIAN),
            members: users.filter(u => u.role === USER_ROLES.MEMBER),
        }

        t.truthy(t.context.users.librarian)
        t.is(t.context.users.members.length, 3)
    })
}
