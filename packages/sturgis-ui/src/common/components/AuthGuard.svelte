<script>
    import Spinner from './Spinner.svelte'
    import Redirect from './Redirect.svelte'

    import { auth, isLibrarian } from '../stores/'

    export let librarianOnly = false

    // Do not show route if: the librarianOnly prop was provided & the user is not a librarian
    $: accessRestricted = librarianOnly && !$isLibrarian
</script>

{#await auth.verify()}
    <Spinner />
{:then}
    {#if accessRestricted}
        <Redirect path="/" />
    {:else}
        <slot />
    {/if}
{:catch}
    <Redirect path="/login" />
{/await}
