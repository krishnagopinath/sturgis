<style>
    .app-container {
        padding: 2rem;
    }
    .nav-wrapper {
        padding-top: 2rem;
    }
</style>

<script>
    import { Row, Col } from 'svelte-chota'
</script>

<div class="is-full-screen">
    <Row>
        <Col>
            <div class="nav-wrapper">
                <slot name="nav" />
            </div>
            <div class="app-container">
                <slot />
            </div>
        </Col>
    </Row>
</div>
