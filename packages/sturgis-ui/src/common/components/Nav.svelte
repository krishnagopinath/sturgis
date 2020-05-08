<style>
    .brand {
        padding: 0;
    }
</style>

<script>
    import { links } from 'svelte-routing'
    import { getActiveRoute } from '../utils/'
    import { isLibrarian, authHeader } from '../stores/'
    import Logo from './Logo.svelte'

    const activeRoute = getActiveRoute()
</script>

{#if $activeRoute && $activeRoute.uri.includes('login')}
    <nav class="nav">
        <div class="nav-center">
            <div class="brand">
                <Logo />
            </div>

            <h2>sturgis</h2>
        </div>
    </nav>
{:else}
    <div use:links>
        <nav class="nav">
            <div class="nav-left">
                <a href="/" class="brand is-full-width">
                    <Logo />
                </a>
            </div>
            <div class="nav-right">
                {#if $isLibrarian}
                    <a href="/manage">Manage</a>
                {/if}
                <a href="/login" on:click="{() => authHeader.clear()}">
                    Logout
                </a>
            </div>
        </nav>
    </div>
{/if}
