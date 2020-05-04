<script>
    import { Nav, Row, Col } from 'svelte-chota'
</script>

<Nav>
    <a slot="center" href="/" class="brand">LOGO</a>
</Nav>
<Row class="is-center">
    <Col size="12" sizeMD="6" sizeLG="4">
        <slot />
    </Col>
</Row>
