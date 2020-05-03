const { Router } = require('express')

const { loginUser } = require('./user-actions')

module.exports = Router().post('/login', loginUser)
