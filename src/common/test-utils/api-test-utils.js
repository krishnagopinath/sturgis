const request = require('supertest')

exports.getApiClient = function getApiClient() {
    // Internal `require` because we'd like `app` to be invoked when this is run.
    return request(require('../../app'))
}
