const HttpStatus = require('http-status-codes')

const httpCreators = {
    makeHttpError(status, err = {}) {
        return { status, ...err }
    },

    makeHttpBadRequest(err = {}) {
        return {
            status: HttpStatus.BAD_REQUEST,
            ...err,
        }
    },
}

const lodashSubs = {
    /**
     * Substitute for `_.get`.
     */
    get(value, path, defaultValue) {
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
    },
    /**
     * Substitute for `_.pick`.
     */
    pick(obj, ...keys) {
        if (!obj) return {}
        if (!keys || !keys.length) return obj

        return keys.reduce((acc, k) => {
            if (Object.prototype.hasOwnProperty.call(obj, k)) {
                acc[k] = obj[k]
            }
            return acc
        }, {})
    },
    /**
     * Substitute for `_.isNil`.
     */
    isNil(val) {
        return val == null
    },
}

module.exports = {
    ...require('./sql'),
    ...require('./validate-env-vars'),
    ...httpCreators,
    ...lodashSubs,
}
