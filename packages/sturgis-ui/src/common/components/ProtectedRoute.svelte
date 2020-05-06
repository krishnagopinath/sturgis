<script>
    import { Route } from 'svelte-routing'
    import Spinner from './Spinner.svelte'

    import { auth } from '../stores/'

    export let path
</script>

{#await auth.verify()}
    <Spinner />
{:then}
    <Route {path}>
        <slot />
    </Route>
{:catch}
    <div>There was an error.</div>
{/await}
