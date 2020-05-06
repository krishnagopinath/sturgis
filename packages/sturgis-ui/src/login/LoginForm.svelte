<script>
    import { Field, Input, Button } from 'svelte-chota'

    let loading = false
    let error = false
    let email = ''

    async function handleSubmit() {
        error = false
        loading = true
        try {
            await onSubmit(email)
        } catch (err) {
            error = err.message
        } finally {
            loading = false
        }
    }

    export let onSubmit
</script>

<form on:submit|preventDefault="{handleSubmit}">
    <Field label="Email" {error}>
        <Input
            type="email"
            bind:value="{email}"
            placeholder="doe@john.com"
            disabled="{loading}"
            required
        />
    </Field>
    <div class="margin-top-1-rem">
        <Button
            submit
            primary
            {loading}
            disabled="{loading}"
            class="is-full-width"
        >
            Submit
        </Button>
    </div>
</form>
