<script>
    import { Modal, Spinner } from '../common/components'
    let loading = false
    let error = false

    async function handleCheckoutClick() {
        error = false
        loading = true
        try {
            await onCheckout(book.isbn)
            hide()
        } catch (err) {
            error = err.message
        } finally {
            loading = false
        }
    }

    const hide = () => (open = false)

    export let onCheckout
    export let book
    export let open = false
</script>

<Modal bind:open showCloseButton="{false}">
    <div slot="header">
        <h4>Checkout Book</h4>
    </div>
    {#if loading}
        <Spinner />
    {:else if error}
        <span class="text-error">{error}</span>
    {:else}
        <!-- Default state of the modal -->
        <p>
            Are you sure you want to checkout:
            <b>&ldquo;{book.name}&rdquo;</b>
            ?
        </p>
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
                class="button primary"
                disabled="{loading}"
                on:click="{handleCheckoutClick}"
            >
                Confirm
            </button>
        {/if}
    </div>

</Modal>
