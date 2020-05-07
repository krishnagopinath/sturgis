<style>
    .icon {
        width: 24px;
        height: 24px;
    }

    .icon-only {
        padding: 0.5rem;
    }
</style>

<script>
    import { format } from 'date-fns'
    import TiTrash from 'svelte-icons/ti/TiTrash.svelte'

    import { Message } from '../common/components'

    export let books = []
    export let onDelete
</script>

{#if !books.length}
    <Message>No books were found. How about adding one?</Message>
{:else}
    <table class="striped">
        <thead>
            <tr>
                <th>ID</th>
                <th>ISBN</th>
                <th>Name</th>
                <th>Author</th>
                <th>Date (UTC)</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each books as book (book.id)}
                <tr>
                    <td>{book.id}</td>
                    <td>{book.isbn}</td>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <!-- TODO: Check for date edge cases -->
                    <td>{format(new Date(book.created_at), 'MM/dd/yyyy')}</td>
                    <td>
                        <button
                            class="button error icon-only"
                            on:click="{() => onDelete(book.id)}"
                        >
                            <div class="icon">
                                <TiTrash />
                            </div>
                        </button>
                    </td>
                </tr>
            {/each}

        </tbody>
    </table>
{/if}
