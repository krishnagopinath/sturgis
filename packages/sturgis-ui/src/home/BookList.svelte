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
    import { Button } from 'svelte-chota'

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
                <Button
                    class="is-full-width"
                    primary
                    on:click="{() => onCheckout(book.id)}"
                >
                    Checkout
                </Button>
            </footer>
        </div>
    {/each}
{/if}
