<style>
    .button-spacer {
        margin-top: 1rem;
    }
</style>

<script>
    import { Button, Input, Field, Modal, Card } from 'svelte-chota'

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
    <Card>
        <h4 slot="header">Add Book by ISBN</h4>
        <form on:submit|preventDefault="{handleSubmit}">
            <Field label="ISBN*" {error}>
                <Input
                    type="text"
                    bind:value="{isbn}"
                    placeholder="78234862684"
                    disabled="{loading}"
                    required
                />

            </Field>
            <div class="button-spacer">
                <Button
                    submit
                    primary
                    {loading}
                    disabled="{loading}"
                    class="is-full-width"
                >
                    Add
                </Button>
            </div>
        </form>
    </Card>
</Modal>
