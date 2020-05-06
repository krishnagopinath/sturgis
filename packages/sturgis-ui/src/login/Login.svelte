<script>
    import { navigate } from 'svelte-routing'
    import { Row, Col } from 'svelte-chota'
    import { auth } from '../common/stores/'

    import LoginForm from './LoginForm.svelte'

    const users = [
        { name: 'Librarian', email: 'lib@sturgis.com' },
        { name: 'User1', email: 'weasley@sturgis.com' },
        { name: 'User2', email: 'granger@sturgis.com' },
        { name: 'User3', email: 'potter@sturgis.com' },
    ]

    async function handleSubmit(email) {
        await auth.login(email)
        navigate('/', { replace: true })
    }
</script>

<Row class="is-horizontal-align">
    <Col size="12" sizeMD="6">
        <LoginForm onSubmit="{handleSubmit}" />
        <blockquote>
            Welcome to Sturgis library system! 📚
            <br />
            <br />
            The users in this system are hard-coded. Use any one of these 👇
            <ul>
                {#each users as { name, email }}
                    <li>
                        <b>{name}</b>
                        :
                        <code>{email}</code>
                    </li>
                {/each}
            </ul>
        </blockquote>
    </Col>
</Row>
