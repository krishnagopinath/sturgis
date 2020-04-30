/* eslint-disable camelcase */
const { sql } = require('../common/utils/index')

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
                select 
                    id, 
                    isbn,
                    author,
                    name
                from books
            ) as books on books.id = checkout.book_id
        `

        return createdCheckout
    },

    /**
     * Gets checkout by id
     * @param {number} id
     */
    async getById(id) {
        const [checkout] = await sql`
            select * from checkouts where id = ${sql(id)}
        `
        return checkout
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
     * Gets all the books that the user checked out
     * @param {object} user
     * @param {number} user.id
     */
    async getAllByUser(user) {
        return sql`
            select * from checkouts where created_by_id = ${sql(user.id)}
        `
    },

    async insertMany(books, user) {
        const checkoutRows = books.map(b => ({
            book_id: b.id,
            created_by_id: user.id,
        }))

        const checkouts = await sql`
            insert into checkouts ${sql(checkoutRows)}
            returning *;
        `
        return checkouts
    },
}
