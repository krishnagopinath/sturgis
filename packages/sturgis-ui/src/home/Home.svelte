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
</script>

<div class="is-horizontal-align zero-margin">

    {#await book.getAvailable()}
        <Spinner />
    {:then}
        <div class="overflow-auto flex-container">
            <BookList
                books="{$book}"
                onCheckout="{id => alert('checkout' + id)}"
            />
        </div>
    {:catch}
        <Message error>😭 Could not fetch books</Message>
    {/await}
</div>
