const { sql } = require('../common/utils/index')

module.exports = {
    getAll() {
        return sql`
            select * from users;
        `
    },

    async fetchById(id) {
        const user = await sql`
            select * from users where id=${id};
        `

        return user
    },
}
