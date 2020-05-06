<script>
    import { ProtectedRoute } from '../common/components'

    import Manage from './manage/Manage.svelte'
</script>

<div>Home page!</div>

<ProtectedRoute path="manage">
    <Manage />
</ProtectedRoute>
