<script>
    import { Row, Col } from 'svelte-chota'
</script>

<div class="is-full-screen">
    <Row class="is-full-screen">
        <Col size="12" sizeMD="5">
            <slot />
        </Col>
    </Row>
</div>
