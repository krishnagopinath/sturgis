<style>
    :root {
        --font-family-sans: 'Open Sans', sans-serif;
    }

    :global(blockquote) {
        margin-left: 0;
        margin-right: 0;
    }
</style>

<script>
    import 'chota'
    import { Container } from 'svelte-chota'
</script>

<Container class="is-full-screen is-full-width">
    <slot />
</Container>
