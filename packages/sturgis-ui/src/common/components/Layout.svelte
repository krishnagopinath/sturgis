<style>
    .layout-wrapper {
        margin-top: 3rem;
    }
</style>

<script>
    import { Nav, Row, Col } from 'svelte-chota'
    import TiBook from 'svelte-icons/ti/TiBook.svelte'
    import Icon from './Icon.svelte'
</script>

<Row class="is-full-screen is-center">
    <Col>
        <Nav>
            <div slot="center" class="brand">
                <Icon>
                    <TiBook />
                </Icon>
                Sturgis
            </div>
        </Nav>
        <Row class="is-center">
            <Col size="12" sizeMD="5">
                <div class="layout-wrapper">
                    <slot />
                </div>
            </Col>
        </Row>
    </Col>
</Row>
