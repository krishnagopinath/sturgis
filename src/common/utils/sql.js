const postgres = require('postgres')
// TODO: Check if this is necessary
// const toCamelCase = require('camelize')
// const toSnakeCase = require('decamelize')

const sql = postgres({
    // The following options are setup via environment variables!
    // This is done to share variables easily between test and development environments.
    // https://github.com/porsager/postgres#environment-variables-for-options
    // host, port, database, username, password
    transform: {
        // TODO: Convert column names from `snake_case` to `camelCase`?
    },
})

exports.sql = sql
