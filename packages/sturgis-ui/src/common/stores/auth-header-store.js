// This is not a Svelte store because its too simple to be one!
export default {
    set: value => window.localStorage.setItem('x-user-id', value),
    get: () => window.localStorage.getItem('x-user-id'),
    clear: () => window.localStorage.removeItem('x-user-id'),
}
