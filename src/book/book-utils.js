const got = require('got')

// 📝 About requiring this util
// Some care must be taken with requiring this module
// because it is being mocked by `sinon` in tests.
//
// 🚫 const {getInfoByIsbn} = require('./book-utils')
//
// ✅ const bookUtils = require('./book-utils')
// 👉 bookUtils.getInfoByIsbn()

exports.getInfoByIsbn = async function getInfoByIsbn(isbn) {
    if (!isbn || typeof isbn !== 'string') return null

    const isbnKey = `ISBN:${isbn}`
    const {
        body,
    } = await got(
        `https://openlibrary.org/api/books?bibkeys=${isbnKey}&jscmd=data&format=json`,
        { responseType: 'json' },
    )

    const book = body ? body[isbnKey] : null
    if (!book) return null

    const { title, subtitle, authors } = book

    const name = title + (subtitle ? `- ${subtitle}` : '')
    const author = Array.isArray(authors)
        ? authors.map(a => a.name).join(', ')
        : null

    return {
        isbn,
        name,
        author,
    }
}
