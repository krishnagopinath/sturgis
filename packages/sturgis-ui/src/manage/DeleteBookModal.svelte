<script>
    import { Modal, Spinner } from '../common/components'
    let loading = false
    let error = false

    async function handleDeleteClick() {
        error = false
        loading = true
        try {
            await onDelete()
            hide()
        } catch (err) {
            error = err.message
        } finally {
            loading = false
        }
    }

    const hide = () => (open = false)

    export let onDelete
    export let open = false
</script>

<Modal bind:open showCloseButton="{false}">
    <div slot="header">
        <h4>Delete Book</h4>
    </div>
    {#if loading}
        <Spinner />
    {:else if error}
        <span class="text-error">{error}</span>
    {:else}
        <!-- Default state of the modal -->
        <p>Are you sure you want to delete this book?</p>
    {/if}
    <div slot="footer" class="is-right">
        {#if loading}
            <!-- Empty, because we don't need to render anything at this point -->
            <div></div>
        {:else if error}
            <button class="button secondary" on:click="{hide}">OK</button>
        {:else}
            <button class="button clear" on:click="{hide}">Cancel</button>
            <button
                class="button error"
                disabled="{loading}"
                on:click="{handleDeleteClick}"
            >
                Confirm
            </button>
        {/if}
    </div>

</Modal>
