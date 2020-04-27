exports.makeHttpError = (status, err = {}) => ({ status, ...err })
