<style>
    .container {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
    }

    .background {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        background-color: black;
        opacity: 0.5;
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 400px;
        background-color: white;
    }

    .header {
        padding-left: 2rem;
    }

    .footer {
        margin-top: 3rem;
    }

    .row {
        align-items: center;
    }
    .col {
        margin-bottom: 0;
    }

    .icon-only {
        width: 64px;
        height: 64px;
    }

    .button.clear {
        color: var(--color-darkGrey);
    }
</style>

<script>
    import { fade } from 'svelte/transition'
    import IoIosClose from 'svelte-icons/io/IoIosClose.svelte'

    export let open = false
    export let showCloseButton = true

    const hasFooter = $$props.$$slots && !!$$props.$$slots.footer
</script>

<!-- Ripped off from https://github.com/AlexxNB/svelte-chota/blob/master/cmp/Modal.svelte -->
{#if open}
    <div class="container" transition:fade="{{ duration: 200 }}">
        <div class="background"></div>
        <div class:modal="{true}" {...$$restProps}>
            <div class="row header">
                <div class="col">
                    <slot name="header" />
                </div>
                {#if showCloseButton}
                    <div class="col is-right">
                        <button
                            class="button clear secondary icon-only"
                            on:click="{e => (open = false)}"
                        >
                            <IoIosClose />
                        </button>
                    </div>
                {/if}
            </div>
            <div class="card">
                <slot />
                {#if hasFooter}
                    <div class="footer">
                        <slot name="footer" />
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
