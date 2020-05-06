<style>
    .nav-wrapper {
        padding-top: 2rem;
    }
</style>

<script>
    import { Nav as ChotaNav } from 'svelte-chota'
    import { links } from 'svelte-routing'
    import { getActiveRoute } from '../utils/'
    import { isLibrarian } from '../stores/'
    import Logo from './Logo.svelte'

    const activeRoute = getActiveRoute()
</script>

<div class="nav-wrapper">
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
                <a slot="left" href="/" class="brand">
                    <Logo />
                </a>
                <div slot="right">
                    {#if $isLibrarian}
                        <a href="/manage">Manage</a>
                    {/if}
                </div>
            </ChotaNav>
        </div>
    {/if}
</div>
