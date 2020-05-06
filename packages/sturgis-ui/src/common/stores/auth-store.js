import { writable, derived, get } from 'svelte/store'

import { api } from '../utils/'

// Simple authHeader util.
// Its not a store because its too simple to be one!
export const authHeader = {
    set(value) {
        return window.localStorage.setItem('x-user-id', value)
    },
    get() {
        return window.localStorage.getItem('x-user-id')
    },
    clear() {
        window.localStorage.removeItem('x-user-id')
    },
}

function createAuthStore() {
    const store = writable(null)
    const { subscribe, set } = store

    return {
        subscribe,
        async login(email) {
            const user = await api().url('user/login').post({ email }).json()
            set(user)
            authHeader.set(user.id)
        },
        async verify() {
            // Already initialized, no need to reinitialize
            if (get(store) !== null) return

            const user = await api().url('user/verify').get().json()
            set(user)
        },
    }
}

export const auth = createAuthStore()

export const isLibrarian = derived(auth, $auth => {
    return $auth !== null && $auth.role === 'librarian'
})
