<script>
	import { goto } from '$app/navigation';
    import { PUBLIC_API_ADDRESS } from '$env/static/public'
    import { user } from '$lib/client/stores'
    import { _fetch } from '$lib/client/util'
    if ($user.name) goto("/")
    
    let username = ""
    let password = ""
    let errorMessage = ""

    async function login() {
        errorMessage = ""
        const res = await _fetch("/login", {username, password}, 'POST')
        const json = await res.json()
        if (!res.ok) {
            errorMessage = json.err ? json.err : res.statusText
        } else {
            // Sets the profile store to username submitted
            // In the future, the client should request profile data from server
            user.update(data => ({
                ...data,
                name: username
            }))
            goto("/")
        }
    }
</script>

<div class="flex flex-col items-center gap-4 pt-8">
    <h2>Login to Account</h2>

    
    <div class="flex flex-col items-end gap-3">
        <label>Username: <input bind:value={username} type="text"></label>
        <label>Password: <input bind:value={password} type="password"></label>
    </div>

    <button on:click={login} class="btn-primary">Submit</button>
    {#if errorMessage}
        <p class="text-red-800">{errorMessage}</p>
    {/if}
    <!-- <button on:click={test} class="btn-primary">test</button> -->
</div>
