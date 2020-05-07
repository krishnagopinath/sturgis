import { writable, get } from 'svelte/store'

import api from '../utils/api'

function createBookStore() {
    const store = writable(null)
    const { subscribe, set } = store

    return {
        subscribe,
        async getAll() {
            const books = await api().url('book').get().json()
            set(books)
        },
        async addByIsbn(isbn) {
            const book = await api().url('book').post({ isbn }).json()

            const books = [...get(store), book].sort(function (a, b) {
                return a.name.localeCompare(b.name)
            })

            set(books)
        },
        async delete(id) {
            await api()
                .url(`book/${id}`)
                .delete()
                .res(res => res)

            const books = get(store).filter(b => b.id !== id)
            set(books)
        },
    }
}

export const book = createBookStore()
