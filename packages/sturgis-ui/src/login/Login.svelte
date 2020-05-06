<style>
    .margin-top-1-rem {
        margin-top: 1rem;
    }
</style>

<script>
    import { Field, Input, Button } from 'svelte-chota'
    import { navigate } from 'svelte-routing'

    import { auth } from '../common/stores/'

    const users = [
        { name: 'Librarian', email: 'lib@sturgis.com' },
        { name: 'User1', email: 'weasley@sturgis.com' },
        { name: 'User2', email: 'granger@sturgis.com' },
        { name: 'User3', email: 'potter@sturgis.com' },
    ]

    let loading = false
    let error = false
    let email = ''

    async function handleSubmit() {
        error = false
        loading = true
        try {
            await auth.login(email)
            navigate('/', { replace: true })
        } catch (err) {
            error = err.message
        } finally {
            loading = false
        }
    }
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

<blockquote>
    The users in this system are
    <i>hard-coded</i>
    . Use any one of these ✌️
    <ul>
        {#each users as { name, email }}
            <li>
                <b>{name}</b>
                :
                <code>{email}</code>
            </li>
        {/each}
    </ul>
</blockquote>
