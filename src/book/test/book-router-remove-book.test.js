const test = require('ava')

const { testDbSetup } = require('../../common/test-utils/index')

testDbSetup()

test.todo('(403) forbidden if not librarian')
test.todo('(404) book not found')
test.todo('(400) cannot remove checked out book')
test.todo('(200) book deleted')
