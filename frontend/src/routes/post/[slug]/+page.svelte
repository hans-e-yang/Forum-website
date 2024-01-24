<script>
    import { page } from '$app/stores'
    import { PUBLIC_API_ADDRESS } from '$env/static/public'

    async function loadData() {
        const res = await fetch(PUBLIC_API_ADDRESS + '/post?id=' + $page.params.slug)
        if (res.ok) {
            return res.json()
        }
        throw res.statusText
    }
    
</script>

<div class="m-8">
    {#await loadData()}
        <p>Loading post</p>
    {:then comments}
        <div class="m-8">
            {#each comments as comment}
                <div class="flex flex-col w-full p-4">
                    <p>{comment.user}</p>
                    <p>{comment.text}</p>
                    <p>{comment.time}</p>
                </div>
            {/each}
        </div>
    {:catch error}
        <h2>Post not found 😔</h2>
    {/await}
</div>


