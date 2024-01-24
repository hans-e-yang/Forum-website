<script>
    import { page } from "$app/stores";
</script>

<div class="flex flex-col items-center justify-center flex-grow-[0.6] w-full">
    <h1>{$page.status}</h1>
    <h2>{$page.error?.message}</h2>
</div>