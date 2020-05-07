<style>
    .modal-content {
        padding: 2rem;
    }
</style>

<script>
    import { Button, Modal, Card } from 'svelte-chota'

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

<Modal bind:open>
    <Card>
        <h4 slot="header">Delete Book</h4>
        <div class="modal-content">
            {#if error}
                <span class="text-error">{error}</span>
            {:else}
                <p>Are you sure you want to delete this book?</p>
            {/if}
        </div>
        <div slot="footer" class="is-right">
            <Button clear on:click="{hide}">Cancel</Button>
            <Button
                error
                {loading}
                disabled="{loading}"
                on:click="{handleDeleteClick}"
            >
                Confirm
            </Button>
        </div>
    </Card>
</Modal>
