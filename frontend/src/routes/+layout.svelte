<script>
    import "../app.css"
</script>

<div class="flex flex-col min-h-screen">
    <nav class="flex gap-5 p-4 border-b-2 border-b-primary">
        <a href="/">Home</a>
        <a href="/chat">Chat</a>
    </nav>
    <main class="flex flex-col items-center flex-grow ">
        <slot />
    </main>
    <footer class="flex justify-center bg-bg-400">
        &copy; ChatApp
    </footer>
</div>

