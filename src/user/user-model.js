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
    async fetchById(id) {
        const user = await sql`
            select * from users where id=${id};
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
            insert into users ${sql(userData, 'name', 'role')}
            returning *;
        `
        return users
    },
}
