<script>
    import { _fetch } from '$lib/client/util'
	import { onMount } from 'svelte';
    import { user } from '$lib/client/stores'
    import { goto } from '$app/navigation'


    let title = ""
    let error = ""
    
    function submit() {
        if (!title) return
        _fetch("/api/thread", {title}, "POST")
        .then(async res=>{
            let json = await res.json()
            if (!json.err) {
                goto("/thread/" + json.thread.id)
            } else {
                error = json.err
            }
        })
    }

    onMount(()=>{
        if (!$user.name) goto("/")
    })
</script>


<div class="flex flex-col items-center gap-4 p-10">
    <label>Title: <input bind:value={title} type="text"></label>
    <button class="btn-primary" on:click={submit}>Create Thread</button>
    <p>{error}</p>
</div>
