/**
 * Substitute for `_.get`.
 */
exports.get = function get(value, path, defaultValue) {
    return String(path)
        .split('.')
        .reduce((acc, v) => {
            try {
                acc = acc[v]
            } catch (e) {
                return defaultValue
            }
            return acc
        }, value)
}
/**
 * Substitute for `_.pick`.
 */
exports.pick = function pick(obj, ...keys) {
    if (!obj) return {}
    if (!keys || !keys.length) return obj

    return keys.reduce((acc, k) => {
        if (Object.prototype.hasOwnProperty.call(obj, k)) {
            acc[k] = obj[k]
        }
        return acc
    }, {})
}
/**
 * Substitute for `_.isNil`.
 */
exports.isNil = function isNil(val) {
    return val == null
}

/**
 * Substitute for `_.isString`.
 */
exports.isString = function isString(str) {
    if (str && typeof str.valueOf() === 'string') {
        return true
    }
    return false
}
