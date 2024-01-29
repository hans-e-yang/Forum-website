<script lang="ts">
    import {_fetch} from '$lib/client/util'
    
    async function loadData() {
        const res = await _fetch("/api/thread")
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
<a class="!no-underline btn-primary" href="./startThread"> Start a Thread</a>
{#await loadData()}
    <p>Loading post</p>
{:then res}
    <div class="m-8">
        {#each res.threads as thread}
            <div class="w-full p-4 border-t border-x last:border-b border-primary">
                <p>{thread.user}</p>
                <a href="/post/{thread.id}">{thread.title}</a>
                <p>{timeSince(thread.createdAt)}</p>
            </div>
        {/each}
    </div>
    
{/await}