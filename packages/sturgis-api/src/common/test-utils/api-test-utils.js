const request = require('supertest')
const test = require('ava')

const { get } = require('../../common/utils/index')

exports.getApiClient = function getApiClient() {
    // Internal `require` because we'd like `app` to be invoked when this is run.
    return request(require('../../app'))
}

/**
 * Returns the apiUrl with the dynamic parts setup correctly
 *
 * @param {any} t
 * @param {string} apiUrl
 */
exports.parseApiUrl = function parseApiUrl(t, apiUrl) {
    const matches = apiUrl.match(/({[^{][^}]*})/gm) || []

    if (!matches.length) return apiUrl
    else {
        return matches.reduce((acc, m) => {
            const path = m.replace(/[{}]/g, '')
            return acc.replace(m, get(t.context, path))
        }, apiUrl)
    }
}

/**
 * Setup block for api related context info
 *
 * Sets up `t.context.apiUrl`
 *
 * @param {string} apiUrl URL with support for dynamic bits
 *
 * @example
 *
 * ```
 * testApiSetup('/api/book') // t.context.apiUrl -> '/api/book'
 * testApiSetup('/api/book/{books.0.id}') // t.context.apiUrl -> `'/api/book/4'`, assuming `t.context.books[0].id` is `4`.
 * ```
 */
exports.testApiSetup = function testApiSetup(apiUrl) {
    test.beforeEach(t => {
        t.context.apiUrl = exports.parseApiUrl(t, apiUrl)
    })
}
