const isbnService = require('node-isbn')

const { PROVIDER_NAMES } = isbnService

// 📝 INFO ABOUT HOW TO `require` THIS UTIL:
// Some care must be taken with requiring this module
// because it is being mocked by `sinon` in tests.
//
// 🚫 const {getInfoByIsbn} = require('./book-utils')
//
// ✅ const bookUtils = require('./book-utils')
// 👉 bookUtils.getInfoByIsbn()

/**
 * Given an ISBN number, gets book information
 */
exports.getInfoByIsbn = async function getInfoByIsbn(isbnNo) {
    if (!isbnNo || typeof isbnNo !== 'string') return null

    const book = await isbnService
        .provider([PROVIDER_NAMES.OPENLIBRARY, PROVIDER_NAMES.GOOGLE])
        .resolve(isbnNo)
        .catch(() => {
            // Not found error, send out `null`
            return null
        })

    if (!book) return null

    const { title, authors } = book

    return {
        isbn: isbnNo,
        name: title,
        author: authors.join(', '),
    }
}
