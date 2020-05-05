<style>
    .margin-top-1-rem {
        margin-top: 1rem;
    }
</style>

<script>
    import { Field, Input, Button } from 'svelte-chota'
    import { replace } from 'svelte-spa-router'

    import { api } from '../common/utils/'

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
            const user = await api().url('user/login').post({ email }).json()
            window.localStorage.setItem('x-user-id', user.id)
            replace('/home')
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
