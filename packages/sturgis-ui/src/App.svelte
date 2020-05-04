<script>
    import Router from 'svelte-spa-router'
    import { Layout, Global } from './common/components'
    import routes from './routes'
</script>

<Global>
    <Layout>
        <Router {routes} />
    </Layout>
</Global>
