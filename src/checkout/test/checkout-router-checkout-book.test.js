const test = require('ava')

const { testDbSetup } = require('../../common/test-utils/index')

testDbSetup()

test.todo('(400) bad `isbn`')
test.todo('(400) exceeded checkout limit (3)')
test.todo('(400) exceeded checkout period (> 2 weeks)')
test.todo('(404) book unavailable')
test.todo('(201) returns expected list')
