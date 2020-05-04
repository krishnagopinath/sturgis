<script>
    import { Container } from 'svelte-chota'
</script>

<svelte:head>
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
        rel="stylesheet"
    />
    <link rel="stylesheet" href="https://unpkg.com/chota@latest" />
    <style>
        :root {
            --font-family: 'Open Sans', sans-serif;
        }
    </style>
</svelte:head>

<Container>
    <slot />
</Container>
