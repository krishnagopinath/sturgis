import wretch from 'wretch'

import safeJsonParse from './safe-json-parse'

const parseJsonError = e => safeJsonParse(e.message, {})

/**
 * Handles HTTP 400 errors
 * @param {*} err
 */
function handleHttp400(err) {
    err.jsonError = parseJsonError(err)
    err.message = err.jsonError.message

    throw err
}

/**
 * Handles HTTP 500 errors
 * @param {*} err
 */
function handleHttp500(err) {
    err.jsonError = parseJsonError(err)
    err.message = 'Unknown server error.'
    throw err
}

/**
 * Handles HTTP 401 errors
 * @param {*} err
 */
function handleHttp401(err) {
    err.jsonError = parseJsonError(err)
    err.message = err.jsonError.message

    throw err
}

/**
 * Handles HTTP 403 errors
 * @param {*} err
 */
function handleHttp403(err) {
    err.jsonError = parseJsonError(err)
    err.message = err.jsonError.message
    throw err
}

/**
 * API Helper.
 * This is a function because we'd like this to executed everytime.
 */
export default function apiHelper() {
    const userId = window.localStorage.getItem('x-user-id')

    return wretch()
        .url(`/api/`)
        .headers({
            'x-user-id': userId,
        })
        .catcher(400, handleHttp400)
        .catcher(403, handleHttp403)
        .catcher(500, handleHttp500)
        .catcher(401, handleHttp401)
}
