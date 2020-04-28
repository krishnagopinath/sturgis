/* eslint-disable camelcase */
const { sql } = require('../common/utils/index')

module.exports = {
    /**
     * Inserts book into DB
     *
     * @param {object} book
     * @param {string} book.name
     * @param {string} book.author
     * @param {string} book.isbn
     * @param {object} createdByUser - user set up with `parseUser` middleware
     */
    async create(book, createdByUser) {
        const { name, author, isbn } = book
        const { id: created_by_id } = createdByUser

        const [insertedBook] = await sql`
            insert into books ${sql({
                name,
                author,
                isbn,
                created_by_id,
                // `created_at` is setup automatically
            })}
            returning *
        `

        return insertedBook
    },

    /**
     * Gets book by id
     * @param {number} id
     */
    async getById(id) {
        const [book] = await sql`
            select * from books where id = ${sql(id)}
        `
        return book
    },
}
