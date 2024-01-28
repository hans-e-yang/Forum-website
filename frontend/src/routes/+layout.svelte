<script>
    import "../app.css"
    import { user } from '$lib/client/stores'

    const links = [{
        href: "/",
        name: "Home"
    }, {
        href: "/chat",
        name: "Chat"
    }]
</script>

<div class="flex flex-col min-h-screen">
    <nav class="flex gap-5 p-4 border-b-2 border-b-primary">
        {#each links as {href, name}}
            <a href={href}>{name}</a>
        {/each}
        {#if !$user.name}
            <div class="flex items-center justify-end flex-grow gap-4">
                <a href="/register">Register</a>
                <a href="/login">Login</a>  
            </div>
        {/if}
    </nav>
    <main class="flex flex-col items-center flex-grow ">
        <slot />
    </main>
    <footer class="flex justify-center bg-bg-400">
        &copy; ChatApp
    </footer>
</div>

