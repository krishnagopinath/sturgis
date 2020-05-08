<style>
    .zero-margin {
        margin-left: 0;
        margin-right: 0;
    }

    .overflow-auto {
        overflow: auto;
    }

    .flex-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>

<script>
    import { book } from '../common/stores'
    import { Message, Spinner } from '../common/components'

    import BookList from './BookList.svelte'
    import CheckoutBookModal from './CheckoutBookModal.svelte'

    let openCheckoutModal = false
    let bookToCheckout = null
</script>

{#if openCheckoutModal}
    <CheckoutBookModal
        bind:open="{openCheckoutModal}"
        book="{bookToCheckout}"
        onCheckout="{book.checkout}"
    />
{/if}

<div class="is-horizontal-align zero-margin">
    {#await book.getAvailable()}
        <Spinner />
    {:then}
        <div class="overflow-auto flex-container">
            <BookList
                books="{$book}"
                onCheckout="{id => {
                    bookToCheckout = $book.find(b => b.id === id)
                    openCheckoutModal = true
                }}"
            />
        </div>
    {:catch}
        <Message error>😭 Could not fetch books</Message>
    {/await}
</div>
