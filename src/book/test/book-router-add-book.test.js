const test = require('ava')
const sinon = require('sinon')
const HttpStatus = require('http-status-codes')

const { testDbSetup, getApiClient } = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')

const { pick } = require('../../common/utils/index')
const { ERRORS: USER_ERRORS } = require('../../user/user-constants')
const { ERRORS } = require('../book-constants')
const bookUtils = require('../book-utils')
const bookModel = require('../book-model')

const apiUrl = `/api/book/`

testDbSetup()
testUserSetup()

test('(403) forbidden if not librarian', async t => {
    const res = await getApiClient()
        .post(apiUrl)
        .set('x-user-id', t.context.users.members[0].id)

    t.is(res.status, HttpStatus.FORBIDDEN)
    t.is(res.body.error.code, USER_ERRORS.NO_ACCESS.code)
})

test('(400) no isbn', async t => {
    const res = await getApiClient()
        .post(apiUrl)
        .set('x-user-id', t.context.users.librarian.id)
        .send({ isbn: null })

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.INVALID_ISBN.code)
})

test('(400) isbn not found', async t => {
    sinon.stub(bookUtils, 'getInfoByIsbn').returns(null)

    const res = await getApiClient()
        .post(apiUrl)
        .set('x-user-id', t.context.users.librarian.id)
        .send({ isbn: 'gibberish-isbn' })

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.INVALID_ISBN.code)

    sinon.restore()
})

test('(201) book added', async t => {
    const isbn = '061871166X'
    const expectedBookInfo = {
        isbn,
        author: 'Amitav Ghosh',
        name: 'The Hungry Tide: A Novel',
    }
    const librarianId = t.context.users.librarian.id

    sinon.stub(bookUtils, 'getInfoByIsbn').returns(expectedBookInfo)

    const res = await getApiClient()
        .post(apiUrl)
        .set('x-user-id', librarianId)
        .send({ isbn })

    t.is(res.status, HttpStatus.CREATED)
    t.truthy(res.body)

    const bookFromDb = await bookModel.getById(res.body.id)

    t.truthy(bookFromDb)
    t.deepEqual(
        pick(bookFromDb, ['isbn', 'author', 'name']),
        pick(expectedBookInfo, ['isbn', 'author', 'name']),
    )

    t.truthy(bookFromDb.created_at)
    t.is(bookFromDb.created_by_id, librarianId)

    t.deepEqual(
        Object.keys(res.body).sort(),
        ['id', 'isbn', 'author', 'name', 'created_by_id', 'created_at'].sort(),
    )

    sinon.restore()
})
