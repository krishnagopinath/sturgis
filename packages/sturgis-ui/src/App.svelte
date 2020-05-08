<script>
    import { Router, Route } from 'svelte-routing'
    import { Layout, Global, Nav, AuthGuard } from './common/components'

    import Home from './home/Home.svelte'
    import Login from './login/Login.svelte'
    import Manage from './manage/Manage.svelte'

    export let url = ''
</script>

<Global>
    <Router {url}>
        <Layout>
            <div slot="nav">
                <Nav />
            </div>
            <Route path="login">
                <Login />
            </Route>
            <Route path="manage">
                <AuthGuard librarianOnly>
                    <Manage />
                </AuthGuard>
            </Route>
            <Route path="/">
                <AuthGuard>
                    <Home />
                </AuthGuard>
            </Route>
        </Layout>
    </Router>

</Global>
