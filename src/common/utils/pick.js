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
