const express = require('express')
const helmet = require('helmet')
const compression = require('compression')

const { errorHandler } = require('./common/middleware/index')

const apiRouter = require('./router')

const app = express()

app.use(helmet())
app.use(compression())

app.use('/api', apiRouter)

// Global error handling
app.use(errorHandler)

module.exports = app
