<script>
    import { Field, Input, Button } from 'svelte-chota'
</script>

<form>
    <Field label="Username" success="User exists">
        <Input value="admin" />
    </Field>
    <Button type="submit">Submit</Button>
</form>
