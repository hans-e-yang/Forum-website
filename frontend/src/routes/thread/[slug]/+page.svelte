<script>
    import { page } from '$app/stores'
    import { PUBLIC_API_ADDRESS } from '$env/static/public'
    import { timeSince, _fetch } from '$lib/client/util'

    let comment = ""
    
    const threadId = $page.params.slug
    async function loadData() {
        const res = await fetch(PUBLIC_API_ADDRESS + '/api/thread?threadId=' + threadId)
        if (res.ok) {
            return res.json()
        }
        throw res.statusText
    }

    function createPost() {
        if (!comment) return
        _fetch("/api/post", {body: comment, threadId}, "POST")
        .then(async res=>console.log(await res.json()))
    }
    
</script>

<div class="flex flex-col m-8">
    {#await loadData()}
        <p>Loading post</p>
    {:then res}
        {@const thread = res.thread}
        <h2 class="w-full font-bold text-center">{thread.title}</h2>
        <p>{thread.author.username}</p>
        <p class="text-xs">{timeSince(thread.createdAt)}</p>

        <hr class="w-[80vw] border-t border-primary">

        <div class="w-full m-2">
            {#each thread.posts as comment}
                <div class="flex flex-col w-full p-4">
                    <p>{comment.author.username}</p>
                    <p>{comment.body}</p>
                    <p class="text-xs">{timeSince(comment.createdAt)}</p>
                </div>
            {/each}
            {#if thread.posts.length == 0}
                <p>no posts yet 😭</p>
            {/if}
        </div>

        <!-- Move into seperate component -->
        <textarea bind:value={comment} class="text-sm"></textarea>
        <button on:click={createPost} class="btn-primary">Post</button>
    {:catch error}
        <h2>Post not found 😔</h2>
    {/await}
</div>


