const { sql } = require('../common/utils/index')

const userModel = {
    async getAll() {
        const users = await sql`
            select * from users;
        `
        return users
    },

    async fetchById(id) {
        const user = await sql`
            select * from users where id=${id};
        `

        return user
    },

    async insertMany(userData) {
        const users = await sql`
            insert into users ${sql(userData, 'name', 'role')}
            returning *;
        `
        return users
    },
}

module.exports = userModel
