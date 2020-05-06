<script>
    import { Router, Route } from 'svelte-routing'
    import { Layout, Global, Nav, ProtectedRoute } from './common/components'

    import Home from './home/Home.svelte'
    import Login from './login/Login.svelte'

    export let url = ''
</script>

<Global>
    <Router basepath="/" {url}>
        <Layout>
            <Nav />
            <Route path="login">
                <Login />
            </Route>
            <ProtectedRoute path="/">
                <Home />
            </ProtectedRoute>
        </Layout>
    </Router>

</Global>
