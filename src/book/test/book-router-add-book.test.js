const test = require('ava')

const { testDbSetup } = require('../../common/test-utils/index')

testDbSetup()

test.todo('(403) forbidden if not librarian')
test.todo('(400) no isbn')
test.todo('(400) isbn not found')
test.todo('(201) book added')
