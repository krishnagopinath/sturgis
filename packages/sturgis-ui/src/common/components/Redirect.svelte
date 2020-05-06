<script>
    import { navigate } from 'svelte-routing'

    export let path = ''
    export let replace = false

    $: if (path) navigate(path, { replace })
</script>
