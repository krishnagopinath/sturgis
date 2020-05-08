<script>
    import { Field, Spinner } from '../common/components/'

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

{#if loading}
    <Spinner />
{:else}
    <form on:submit|preventDefault="{handleSubmit}">
        <Field label="Email" {error}>
            <input
                type="email"
                class:error
                bind:value="{email}"
                placeholder="doe@john.com"
                required
            />
        </Field>
        <div class="margin-top-1-rem">
            <button type="submit" class="button primary is-full-width">
                Login
            </button>
        </div>
    </form>
{/if}
