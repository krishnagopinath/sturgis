const test = require('ava')
const sinon = require('sinon')
const HttpStatus = require('http-status-codes')

const {
    testDbSetup,
    getApiClient,
    testApiSetup,
} = require('../../common/test-utils/index')
const {
    testUserSetup,
    testLibrarianRole,
} = require('../../user/test/user-test-utils')

const { pick } = require('../../common/utils/index')
const { ERRORS } = require('../book-constants')
const bookUtils = require('../book-utils')
const bookModel = require('../book-model')

testDbSetup()
testUserSetup()
testApiSetup('/api/book')

testLibrarianRole('post')

test('(400) no isbn', async t => {
    const res = await getApiClient()
        .post(t.context.apiUrl)
        .set('x-user-id', t.context.users.librarian.id)
        .send({ isbn: null })

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.INVALID_ISBN.code)
})

test('(400) isbn not found', async t => {
    sinon.stub(bookUtils, 'getInfoByIsbn').returns(null)

    const res = await getApiClient()
        .post(t.context.apiUrl)
        .set('x-user-id', t.context.users.librarian.id)
        .send({ isbn: 'gibberish-isbn' })

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.INVALID_ISBN.code)

    sinon.restore()
})

test('(201) book added', async t => {
    const isbn = '0553499114'
    const expectedBookInfo = {
        isbn,
        author: 'Amitav Ghosh',
        name: 'The Hungry Tide: A Novel',
        thumbnail_url: 'https://via.placeholder.com/500x600',
    }
    const librarianId = t.context.users.librarian.id

    sinon.stub(bookUtils, 'getInfoByIsbn').returns(expectedBookInfo)

    const res = await getApiClient()
        .post(t.context.apiUrl)
        .set('x-user-id', librarianId)
        .send({ isbn })

    sinon.restore()

    t.is(res.status, HttpStatus.CREATED)

    // Expected fields
    t.truthy(res.body.id)
    t.deepEqual(
        Object.keys(res.body).sort(),
        [
            'id',
            'isbn',
            'author',
            'name',
            'thumbnail_url',
            'created_by_id',
            'created_at',
        ].sort(),
    )

    // Data accuracy
    const bookFromDb = await bookModel.getById(res.body.id)

    t.truthy(bookFromDb)
    t.deepEqual(
        pick(bookFromDb, 'isbn', 'author', 'name', 'thumbnail_url'),
        pick(expectedBookInfo, 'isbn', 'author', 'name', 'thumbnail_url'),
    )

    t.truthy(bookFromDb.created_at)
    t.is(bookFromDb.created_by_id, librarianId)
})
