const { Router } = require('express')
const bodyParser = require('body-parser')

const { parseUser } = require('./user/user-middleware')

module.exports = Router()
    .get('/', (req, res) => {
        res.send(`Hey! Welcome to the Sturgis API.`)
    })
    // For parsing JSON payloads
    .use(bodyParser.json())
    // Parse user info
    .use(parseUser)
