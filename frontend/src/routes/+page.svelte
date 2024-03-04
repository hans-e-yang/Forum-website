<script lang="ts">
    import {_fetch, timeSince} from '$lib/client/util'
    import { user } from '$lib/client/stores';
    async function loadData() {
        const res = await _fetch("/api/thread")
        if (res.ok) {
            return res.json();
        }
    }

    
    
</script>

<h1 class="my-12">Welcome to untitled forum website</h1>
{#if $user.name}
    <a class="!no-underline btn-primary" href="./startThread"> Start a Thread</a>
{/if}
{#await loadData()}
    <p>Loading post</p>
{:then res}
    <div class="m-8">
        {#each res.threads as thread}
            <div class="w-full p-4 border-t border-x last:border-b border-primary">
                <p>{thread.author.username}</p>
                <a class="text-xl font-lg" href="/thread/{thread.id}">{thread.title}</a>
                <p>{timeSince(thread.createdAt)}</p>
            </div>
        {/each}
    </div>
{:catch _}
    <p>Something went wrong 😔😔</p>
{/await}