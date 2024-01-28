<script>
	import { goto } from '$app/navigation';
    import { _fetch } from '$lib/client/util'
    import { user } from '$lib/client/stores'

    if ($user.name) goto("/")
    
    let username = ""
    let password = ""
    let confirmPass = ""
    
    let errorMessage = ""
    
    async function register() {
        errorMessage = ""
        if (password != confirmPass) {
            errorMessage = "Passwords were not the same"
            return
        }
        const res = await _fetch("/register", {username, password}, "POST")
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
    <h2>Register Account</h2>
    
    <div class="flex flex-col items-end gap-3">
        <label>Username: <input bind:value={username} type="text"></label>
        <label>Password: <input bind:value={password} type="password"></label>
        <label>Confirm Password: <input bind:value={confirmPass} type="password"></label>    
    </div>
   
    <button on:click={register} class="btn-primary">Submit</button>
    {#if errorMessage}
        <p class="text-red-800">{errorMessage}</p>
    {/if}
</div>