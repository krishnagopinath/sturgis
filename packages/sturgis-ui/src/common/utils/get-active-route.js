import { getContext } from 'svelte'
import { ROUTER } from 'svelte-routing/src/contexts'

export default function getActiveRoute() {
    const { activeRoute } = getContext(ROUTER)
    return activeRoute
}
