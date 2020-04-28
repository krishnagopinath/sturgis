const test = require('ava')

const userData = require('../data/users')

const { sql } = require('../../common/utils/index')
const { USER_ROLES } = require('../user-constants')

/**
 * Sets up `t.context.users.librarian` & `t.context.users.members`
 */
exports.testUserSetup = function testUserSetup() {
    test.beforeEach(async t => {
        const users = await sql`
            insert into users ${sql(userData, 'name', 'role')}
            returning *;
        `

        t.context.users = {
            librarian: users.find(u => u.role === USER_ROLES.LIBRARIAN),
            members: users.filter(u => u.role === USER_ROLES.MEMBER),
        }

        t.truthy(t.context.users.librarian)
        t.is(t.context.users.members.length, 3)
    })
}
