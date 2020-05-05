const { Router } = require('express')

const { loginUser, verifyUser } = require('./user-actions')
const { parseUser } = require('./user-middleware')

module.exports = Router()
    .post('/login', loginUser)
    .get('/verify', parseUser, verifyUser)
