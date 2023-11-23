<script>
    import "../app.css"
</script>

<div class="flex flex-col min-h-screen">
    <nav class="flex p-4 border-b-2 border-b-primary">
        <a href="#">Link</a>
    </nav>
    <main class="flex-grow flex flex-col items-center gap-5 m-8">
        <slot />
    </main>
    <footer class="flex justify-center bg-bg-400">
        &copy; ChatApp
    </footer>
</div>

