<script lang="ts">
    import { PUBLIC_API_ADDRESS } from "$env/static/public"
    import { io } from 'socket.io-client'
    
    let messagesList: Element
    let messages: Array<string> = []
    let messageToSend: string = ""

    function send() {
        if (!messageToSend) return
        socket.emit("chat message", messageToSend)
        messageToSend = ""
    }

    const socket = io(PUBLIC_API_ADDRESS)
    socket.on("chat message", (msg) => {
        messages = [...messages, msg]
    })
</script>

<ul bind:this={messagesList}>
    {#if messages.length == 0}
        <li>No Messages</li>
    {/if}
    {#each messages as message}
        <li>{message}</li>
    {/each}
</ul>
<input bind:value={messageToSend} type="text" class="max-w-sm h-4" autocomplete="off"/>
<button on:click={send} class="btn bg-bg-300">Send</button>