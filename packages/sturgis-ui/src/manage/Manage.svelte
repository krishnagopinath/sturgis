<style>
    .manage-container {
        padding: 2rem;
    }

    .stack {
        flex-direction: column;
    }

    .sink {
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--color-lightGrey);
    }

    .overflow-auto {
        overflow: auto;
    }
</style>

<script>
    import { Button } from 'svelte-chota'

    import { book } from '../common/stores'
    import { Message, Spinner } from '../common/components'
    import AddBookModal from './AddBookModal.svelte'
    import DeleteBookModal from './DeleteBookModal.svelte'
    import BookGrid from './BookGrid.svelte'

    let openCreateModal = false
    let openDeleteModal = false
    let itemToDelete = null
</script>

<div class="manage-container">
    {#if openCreateModal}
        <AddBookModal
            bind:open="{openCreateModal}"
            onSubmit="{book.addByIsbn}"
        />
    {/if}

    {#if openDeleteModal}
        <DeleteBookModal
            bind:open="{openDeleteModal}"
            onDelete="{() => book.delete(itemToDelete)}"
        />
    {/if}
    <!-- 
        TODO: Cannot use `Row` and `Col` components because they do not accept classnames,
              Definitely a bug! 
    -->
    <div class="row is-horizontal-align stack">
        <div class="col sink text-right">
            <Button primary on:click="{e => (openCreateModal = true)}">
                Add Book
            </Button>
        </div>
        <div class="col overflow-auto">
            {#await book.getAll()}
                <Spinner />
            {:then}
                <BookGrid
                    books="{$book}"
                    onDelete="{id => {
                        itemToDelete = id
                        openDeleteModal = true
                    }}"
                />
            {:catch}
                <Message error>😭 Could not fetch books</Message>
            {/await}
        </div>
    </div>
</div>
