<script>
    import { PUBLIC_API_ADDRESS } from '$env/static/public'
    import { user } from '$lib/client/stores'
    
    let username = ""
    let password = ""
    let confirmPass = ""
    
    let errorMessage = ""
    
    function register() {
        errorMessage = ""
        if (password != confirmPass) {
            errorMessage = "Passwords were not the same"
            return
        }
        fetch(PUBLIC_API_ADDRESS + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        })
        .then(async (res)=> {
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
            }
        })
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