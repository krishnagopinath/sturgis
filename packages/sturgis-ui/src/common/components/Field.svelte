<style>
    .message {
        font-size: smaller;
    }

    div {
        margin-bottom: 1rem;
        height: 10rem;
    }
    label {
        display: block;
        margin-bottom: 0.5rem;
    }

    p {
        margin: 0;
    }
</style>

<script>
    export let error = ''
    export let label = ''
</script>

<div>
    <label class:text-error="{error}">{label}</label>
    <p>
        <slot />
    </p>
    {#if error}
        <p class="message" class:text-error="{error}">{error}</p>
    {/if}
</div>
