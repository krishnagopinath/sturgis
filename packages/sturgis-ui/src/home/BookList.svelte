<style>
    .gap {
        margin: 2rem;
        flex-basis: 38rem;
        height: 28rem;
    }

    .flex-container {
        display: flex;
        flex-direction: row;
        margin-bottom: 2rem;
    }

    .book-details {
        list-style-type: none;
        padding: 0;
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
        <div class="card gap">
            <div class="flex-container">
                <figure>
                    <img src="{book.thumbnail_url}" alt="{book.name}" />
                </figure>
                <div>
                    <h4>{book.name}</h4>
                    <ul class="book-details">
                        <li>
                            <strong>ISBN:</strong>
                            {book.isbn}
                        </li>
                        <li>
                            <strong>Author:</strong>
                            {book.author}
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
