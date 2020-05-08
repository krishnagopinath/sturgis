<script>
    import { Nav as ChotaNav } from 'svelte-chota'
    import { links } from 'svelte-routing'
    import { getActiveRoute } from '../utils/'
    import { isLibrarian, authHeader } from '../stores/'
    import Logo from './Logo.svelte'

    const activeRoute = getActiveRoute()
</script>

{#if $activeRoute && $activeRoute.uri.includes('login')}
    <ChotaNav>
        <div slot="center" class="brand">
            <Logo />

            <h2>sturgis</h2>
        </div>
    </ChotaNav>
{:else}
    <div use:links>
        <ChotaNav>
            <a slot="left" href="/" class="brand is-full-width">
                <Logo />
            </a>
            <div slot="right">
                {#if $isLibrarian}
                    <a href="/manage">Manage</a>
                {/if}
            </div>
            <div slot="right">
                <a href="/login" on:click="{() => authHeader.clear()}">
                    Logout
                </a>
            </div>
        </ChotaNav>
    </div>
{/if}
