const test = require('ava')
const HttpStatus = require('http-status-codes')

const { testDbSetup } = require('../../common/test-utils/index')
const { testUserSetup } = require('./user-test-utils')

const { librarianOnly } = require('../user-middleware')
const { ERRORS } = require('../user-constants')

testDbSetup()
testUserSetup()

test('no user', t => {
    return librarianOnly({}, {}, err => {
        t.is(err.status, HttpStatus.FORBIDDEN)
        t.is(err.code, ERRORS.NO_ACCESS.code)
    })
})

test('member is not allowed', t => {
    const [user] = t.context.users.members
    return librarianOnly({ user }, {}, err => {
        t.is(err.status, HttpStatus.FORBIDDEN)
        t.is(err.code, ERRORS.NO_ACCESS.code)
    })
})

test('librarian is allowed', t => {
    const { librarian } = t.context.users

    return librarianOnly({ user: librarian }, {}, err => {
        t.falsy(err)
    })
})
