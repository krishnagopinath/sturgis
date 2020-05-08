<style>
    .app-container {
        padding: 2rem;
        height: 90vh;
        overflow: auto;
    }
    .nav-wrapper {
        padding-top: 2rem;
        border-bottom: 1px solid var(--color-lightGrey);
    }
</style>

<div class="is-full-screen">
    <div class="row">
        <div class="col">
            <div class="nav-wrapper">
                <slot name="nav" />
            </div>
            <div class="app-container">
                <slot />
            </div>
        </div>
    </div>
</div>
