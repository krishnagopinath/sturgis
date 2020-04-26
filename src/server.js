require('dotenv').config()

const app = require('./app')
const { validateEnvVars } = require('./common/utils/index')

if (!validateEnvVars()) {
    console.error(`Environment vars loaded incorrectly. 😱`)
    process.exit(9)
}

console.info('Starting the Matterwiki server..')

app.listen(process.env.SERVER_PORT, error => {
    if (error) {
        console.error('Unable to listen for connections', error)
        process.exit(10)
    }
    console.info(
        `Express is listening on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
    )
})
