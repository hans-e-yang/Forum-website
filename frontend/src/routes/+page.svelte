<script lang="ts">
    import { PUBLIC_API_ADDRESS } from '$env/static/public'
    
    async function loadData() {
        const res = await fetch(PUBLIC_API_ADDRESS + "/posts")
        if (res.ok) {
            return res.json();
        }
    }

    const rtf = new Intl.RelativeTimeFormat("en", {
        numeric: "auto",
        style: "narrow"
    })

    const now = new Date()
    function timeSince(date: string) {
        let seconds = -Math.floor((new Date(date).getTime() - now.getTime())/1000)
        
        let interval = Math.floor(seconds / 31536000)
        if (interval >= 1) {
            return rtf.format(-interval, 'years')
        }
        interval = Math.floor(seconds / 2592000)
        if (interval >= 1) {
            return rtf.format(-interval, 'months')
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return rtf.format(-interval, 'days')
        }
        interval = Math.floor(seconds / 3600)
        if (interval >= 1) {
            return rtf.format(-interval, 'hours')
        }
        interval = Math.floor(seconds / 60)
        if (interval >= 1) {
            return rtf.format(-interval, 'minutes')
        }
        return rtf.format(-Math.floor(seconds), "seconds");
    }
    
</script>

<h1 class="my-12">Welcome to untitled chat app</h1>

{#await loadData()}
    <p>Loading post</p>
{:then posts}
    <div class="m-8">
        {#each posts as post}
            <div class="w-full p-4 border-t border-x last:border-b border-primary">
                <p>{post.user}</p>
                <a href="/post/{post.id}">{post.title}</a>
                <p>{timeSince(post.time)}</p>
            </div>
        {/each}
    </div>
    
{/await}