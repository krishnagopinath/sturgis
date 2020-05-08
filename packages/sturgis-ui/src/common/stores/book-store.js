import { writable, get } from 'svelte/store'

import api from '../utils/api'

function createBookStore() {
    const store = writable(null)
    const { subscribe, set } = store

    const getAvailable = async function getAvailable() {
        const rawBooks = await api().url('book/available').get().json()

        const books = rawBooks.reduce((acc, b) => {
            // Isbn already exists in collection, increment count
            if (acc[b.isbn]) {
                acc[b.isbn] = Object.assign({}, acc[b.isbn], {
                    copies: acc[b.isbn].copies + 1,
                })
            }
            // New Isbn, add to collection
            else {
                acc[b.isbn] = Object.assign({}, b, { copies: 1 })
            }

            return acc
        }, {})

        set(Object.values(books))
    }

    return {
        subscribe,
        async getAll() {
            const books = await api().url('book').get().json()
            set(books)
        },
        getAvailable,
        async checkout(isbn) {
            await api().url('checkout').post({ isbn }).json()

            // Rerun availability request
            // TODO: Very inefficient, this could probably be done locally!
            return getAvailable()
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
