const { sql } = require('../common/utils/index')

/**
 * Methods to interact with the users table
 */
module.exports = {
    /**
     * Gets all users
     */
    async getAll() {
        const users = await sql`
            select * from users;
        `
        return users
    },

    /**
     * Gets user by id
     * @param {number} id
     */
    async getById(id) {
        const [user] = await sql`
            select * from users where id=${id};
        `

        return user
    },

    /**
     * Gets user by email
     * @param {string} email
     */
    async getByEmail(email) {
        const [user] = await sql`
            select * from users where email=${email};
        `

        return user
    },

    /**
     * Bulk insert
     *
     * ⚠️ Unsafe, used only in tests!
     *
     * @param {*} userData
     */
    async insertMany(userData) {
        const users = await sql`
            insert into users ${sql(userData)}
            returning *;
        `
        return users
    },
}
