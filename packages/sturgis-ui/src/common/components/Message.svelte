<script>
    export let error = false
</script>

<h5 class="text-center" class:text-error="{error}">
    <slot />
</h5>
