<style>
    .button-spacer {
        margin-top: 1rem;
    }

    .book-form {
        min-height: 18rem;
    }
</style>

<script>
    import { Field, Spinner, Modal } from '../common/components'

    let loading = false
    let error = false
    let isbn = ''

    async function handleSubmit() {
        error = false
        loading = true
        try {
            await onSubmit(isbn)
            open = false
        } catch (err) {
            error = err.message
        } finally {
            loading = false
        }
    }

    export let onSubmit
    export let open = false
</script>

<Modal bind:open>
    <div slot="header">
        <h4>Add Book by ISBN</h4>
    </div>
    <div class="book-form">
        {#if loading}
            <Spinner />
        {:else}
            <form on:submit|preventDefault="{handleSubmit}">
                <Field label="ISBN*" {error}>
                    <input
                        type="text"
                        class:error
                        bind:value="{isbn}"
                        placeholder="78234862684"
                        required
                    />

                </Field>
                <div class="button-spacer">
                    <button type="submit" class="button primary is-full-width">
                        Add
                    </button>
                </div>
            </form>
        {/if}
    </div>
</Modal>
