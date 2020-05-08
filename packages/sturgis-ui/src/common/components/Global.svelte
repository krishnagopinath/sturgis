<style>
    :root {
        --font-family-sans: 'Open Sans', sans-serif;
    }

    :global(blockquote) {
        margin-left: 0;
        margin-right: 0;
    }

    :global(input),
    :global(input:focus) {
        /* Urgghh. */
        box-shadow: none !important;
    }
</style>

<script>
    import 'chota'
</script>

<div class="container is-full-screen is-full-width">
    <slot />
</div>
