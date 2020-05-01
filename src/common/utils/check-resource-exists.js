const { isNil } = require('./lodash-subs')

/**
 * Function to verify if resource exists for `id`.
 * If it exists, returns the resource.
 *
 * @param {*} id - resource id
 * @param {*} queryFn - Query function that should return the item
 */
exports.checkResourceExists = async function checkResourceExists(id, queryFn) {
    if (!id) return null

    const dbId = parseInt(id, 10)
    if (Number.isNaN(id)) return null

    const item = await Promise.resolve(queryFn(dbId))
    if (isNil(item)) return null

    return item
}
