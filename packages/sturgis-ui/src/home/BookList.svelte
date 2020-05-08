<style>
    .card {
        margin: 2rem;
        flex-basis: 38rem;
        padding: 1rem;
    }

    figure {
        margin: 1.3rem;
    }

    img {
        width: 100px;
    }

    .flex-container {
        display: flex;
        flex-direction: row;
        margin-bottom: 1rem;
        height: 18rem;
    }

    .book-details {
        list-style-type: none;
        padding: 0;
    }

    .book-details li {
        margin-bottom: 0.5rem;
    }

    h4 {
        width: 20rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

<script>
    import { Message } from '../common/components'

    export let books = []
    export let onCheckout
</script>

{#if !books.length}
    <Message>No books were found. How about adding one?</Message>
{:else}
    {#each books as book (book.id)}
        <div class="card">
            <div class="flex-container">
                <figure>

                    <img
                        width="100"
                        src="{book.thumbnail_url || 'no_image_available.png'}"
                        alt="{book.name}"
                    />
                </figure>
                <div>
                    <h4 title="{book.name}">{book.name}</h4>
                    <ul class="book-details">
                        <li>
                            <strong>Author:</strong>
                            {book.author}
                        </li>
                        <li>
                            <strong>ISBN:</strong>
                            {book.isbn}
                        </li>
                        <li>
                            <strong>Copies:</strong>
                            {book.copies}
                        </li>
                    </ul>
                </div>
            </div>
            <footer>
                <button
                    class="button primary is-full-width"
                    on:click="{() => onCheckout(book.id)}"
                >
                    Checkout
                </button>
            </footer>
        </div>
    {/each}
{/if}
