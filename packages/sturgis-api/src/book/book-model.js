/* eslint-disable camelcase */
const { sql } = require('../common/utils/index')

/**
 * Methods to interact with the books table
 */
module.exports = {
    /**
     * Inserts book into DB
     *
     * @param {object} book
     * @param {string} book.name
     * @param {string} book.author
     * @param {string} book.isbn
     * @param {string} book.thumbnail_url
     * @param {object} createdByUser - user set up with `parseUser` middleware
     */
    async create(book, createdByUser) {
        const { name, author, isbn, thumbnail_url } = book
        const { id: created_by_id } = createdByUser

        const [insertedBook] = await sql`
            insert into books ${sql({
                name,
                author,
                isbn,
                thumbnail_url,
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

    /**
     * Get all available books (that have not been checked out)
     */
    getAllAvailable() {
        return sql`
            -- get book ids that are already checked out
            with checked_out_ids as(
                select books.id
                from books 
                inner join checkouts on checkouts.book_id = books.id 
            )
            -- exclude those ids and return filtered list
            -- these are the "available" books
            select * 
            from books
            where books.id not in (
                select id from checked_out_ids
            )
            order by name
        `
    },

    /**
     * Gets available books by isbn
     * @param {string} isbn
     */
    getAllAvailableByIsbn(isbn) {
        return sql`
            -- get book ids that are already checked out
            with checked_out_ids as(
                select books.id
                from books 
                inner join checkouts on checkouts.book_id = books.id 
                where books.isbn = ${isbn}
            )
            -- exclude those ids and return filtered list
            -- these are the "available" books
            select * 
            from books
            where isbn = ${isbn}
            and books.id not in (
                select id from checked_out_ids
            );
        `
    },

    /**
     * Deletes book by id
     * @param {number} id
     */
    deleteById(id) {
        return sql`
            delete from books where id = ${sql(id)}
        `
    },

    /**
     * Bulk insert
     *
     * ⚠️ Unsafe, used only in tests!
     * @param {*} bookData
     * @param {*} user
     */
    async insertMany(bookData, user) {
        const bookRows = bookData.map(book => ({
            ...book,
            created_by_id: user.id,
        }))

        const books = await sql`
            insert into books ${sql(bookRows)}
            returning *;
        `
        return books
    },
}
