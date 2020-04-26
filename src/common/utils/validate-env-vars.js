/**
 * Validates environment variables
 */
exports.validateEnvVars = function validateEnvVars() {
    const envVars = [
        'PGHOST',
        'PGPORT',
        'PGDATABASE',
        'PGUSER',
        'PGPASSWORD',
        'NODE_ENV',
        'SERVER_HOST',
        'SERVER_PORT',
    ]

    return envVars.every(envVar => {
        return Object.prototype.hasOwnProperty.call(process.env, envVar)
    })
}
