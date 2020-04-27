const test = require('ava')

const userModel = require('../user-model')
const { USER_ROLES } = require('../user-constants')

/**
 * Sets up `t.context.users.librarian` & `t.context.users.members`
 */
exports.testUserSetup = function testUserSetup() {
    test.beforeEach(async t => {
        const users = await userModel.getAll()

        t.context.users = {
            librarian: users.find(u => u.role === USER_ROLES.LIBRARIAN),
            members: users.filter(u => u.role === USER_ROLES.MEMBER),
        }

        t.truthy(t.context.users.librarian)
        t.is(t.context.users.members.length, 3)
    })
}
