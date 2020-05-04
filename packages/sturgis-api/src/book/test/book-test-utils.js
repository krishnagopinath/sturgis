const test = require('ava')
const { bookData } = require('../../common/seed')

const bookModel = require('../book-model')

exports.testBookSetup = async function testBookSetup() {
    test.beforeEach(async t => {
        t.context.books = await bookModel.insertMany(
            bookData,
            t.context.users.librarian,
        )

        t.truthy(t.context.books)
        t.is(t.context.books.length, bookData.length)
    })
}
