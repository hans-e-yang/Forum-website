<script>
    import "../app.css"
    import { user } from '$lib/client/stores'
	import { onMount } from "svelte";
    import { PUBLIC_API_ADDRESS } from '$env/static/public'
	import { _fetch } from "$lib/client/util";

    const links = [{
        href: "/",
        name: "Home"
    }, {
        href: "/chat",
        name: "Chat"
    }]

    onMount( async ()=>{
        const res = await _fetch('/api/profile')
        if (res.ok) {
            const json = await res.json()
            user.update(data=>({
                ...data,
                name: json.username ? json.username : ''
            }))
        }
    })
</script>

<div class="flex flex-col min-h-screen">
    <nav class="flex items-center gap-5 p-4 border-b-2 border-b-primary">
        {#each links as {href, name}}
            <a href={href}>{name}</a>
        {/each}
        <div class="flex items-center justify-end flex-grow gap-4">
            {#if !$user.name}
                <a href="/register">Register</a>
                <a href="/login">Login</a>      
            {:else}
                <img src="" alt="" class="w-8 h-8 border rounded-full border-text bg-primary">
                <p>{$user.name}</p>
            {/if}
        </div>
    </nav>
    <main class="flex flex-col items-center flex-grow ">
        <slot />
    </main>
    <footer class="flex justify-center bg-bg-400">
        &copy; ChatApp
    </footer>
</div>

