const request = require('supertest')

const app = require('../../app')

exports.apiClient = request(app)
