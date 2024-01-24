<script>
    import { PUBLIC_API_ADDRESS } from '$env/static/public'
    let username = ""
    let password = ""

    function login() {
        fetch(PUBLIC_API_ADDRESS + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        })
    }
</script>

<h2>Login to Account</h2>

<label>Username: <input bind:value={username} type="text"></label>
<label>Password: <input bind:value={password} type="password"></label>

<button on:click={login} class="btn-primary">Submit</button>