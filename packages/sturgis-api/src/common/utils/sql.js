const postgres = require('postgres')

/**
 * Method that handles connections between API <-> DB
 */
exports.sql = postgres({
    // The following options are setup via environment variables!
    // This is done to share variables easily between test and development environments.
    // https://github.com/porsager/postgres#environment-variables-for-options
    // host, port, database, username, password
})
