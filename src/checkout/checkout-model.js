/* eslint-disable camelcase */
const { sql } = require('../common/utils/index')

const relatedBookCols = ['id', 'isbn', 'author', 'name']

/**
 * Methods to interact with the checkouts table
 */
module.exports = {
    /**
     * Creates a checkout
     *
     * @param {object} book
     * @param {number} book.id
     * @param {object} createdByUser
     * @param {number} createdByUser.id
     */
    async createAndFetch(book, createdByUser) {
        const { id: book_id } = book
        const { id: created_by_id } = createdByUser

        const [createdCheckout] = await sql`
            -- insert checkout
            with checkout as(
                insert into checkouts ${sql({
                    book_id,
                    created_by_id,
                    // `created_at` is setup automatically
                })}
                returning *
            )
            -- return checkout with related rows
            select 
                checkout.id,
                checkout.created_by_id,
                checkout.created_at,
                row_to_json(books.*) as book 
            from checkout
            inner join (
                -- 😢 setup subquery so row_to_json could be used
                select ${sql(relatedBookCols)}
                from books
            ) as books on books.id = checkout.book_id;
        `

        return createdCheckout
    },

    /**
     * Gets checkout by id
     * @param {number} id
     */
    async getById(id) {
        const [checkout] = await sql`
            select 
                checkouts.id,
                checkouts.created_by_id,
                checkouts.created_at,
                row_to_json(books.*) as book 
            from checkouts 
            inner join (
                -- 😢 setup subquery so row_to_json could be used
                select ${sql(relatedBookCols)}
                from books
            ) as books on books.id = checkouts.book_id
            where checkouts.id = ${sql(id)}
        `
        return checkout
    },

    /**
     * Gets checkout by book id
     * @param {number} bookId
     */
    async getByBookId(bookId) {
        return sql`
            select * from checkouts where book_id = ${sql(bookId)}
        `
    },

    /**
     * Gets checkout by id
     * @param {Array} ids
     */
    async getAllByIds(ids) {
        return sql`
            select * from checkouts where id in ${sql(ids)}
        `
    },

    /**
     * Patches checkout by id
     *
     * ⚠️ Unsafe, because it's not checking fields, etc. Use only if necessary!
     *
     * @param {*} id
     * @param {*} patch - object with properties that need to be updated.
     */
    async patchById(id, patch) {
        const [checkout] = await sql`
            update checkouts 
                set ${sql(patch)}
            where
                id = ${sql(id)}
            returning *
        `
        return checkout
    },

    /**
     * Gets all the checkouts of a particular user
     * @param {object} user
     * @param {number} user.id
     */
    async getAllByUser(user) {
        return sql`
            select 
                checkouts.id,
                checkouts.created_by_id,
                checkouts.created_at,
                row_to_json(books.*) as book 
            from checkouts 
            inner join (
                -- 😢 setup subquery so row_to_json could be used
                select ${sql(relatedBookCols)}
                from books
            ) as books on books.id = checkouts.book_id
            where checkouts.created_by_id = ${sql(user.id)}
        `
    },

    /**
     * Gets all the checkouts that are overdue (> 2 weeks)
     */
    async getAllOverdue() {
        return sql`
            select 
                checkouts.id,
                checkouts.created_by_id,
                checkouts.created_at,
                row_to_json(books.*) as book 
            from checkouts 
            inner join (
                -- 😢 setup subquery so row_to_json could be used
                select ${sql(relatedBookCols)}
                from books
            ) as books on books.id = checkouts.book_id
            where checkouts.created_at < (current_date - 13)
            order by checkouts.created_at
        `
    },

    /**
     * Bulk insert
     *
     * ⚠️ Unsafe, used only in tests!
     *
     * @param {*} books
     * @param {*} users
     */
    async insertMany(books, users) {
        const checkoutRows = books.map((b, i) => ({
            book_id: b.id,
            created_by_id: users[i].id,
        }))

        const checkouts = await sql`
            insert into checkouts ${sql(checkoutRows)}
            returning *;
        `
        return checkouts
    },
}
