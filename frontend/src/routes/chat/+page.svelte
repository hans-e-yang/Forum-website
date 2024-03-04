<script lang="ts">
    // Experimental Chatting with websockets, unfinished
    import { PUBLIC_API_ADDRESS } from "$env/static/public"
    import { io } from 'socket.io-client'
    
    let messagesList: Element
    let messages: Array<string> = []
    let messageToSend: string = ""

    let currentRoom = "global"
    let room = "global"
    let roomChangeText = ""

    // Send a message to current room
    function send() {
        if (!messageToSend) return
        messages = [...messages, messageToSend]
        socket
            .timeout(5000)
            .emitWithAck("chat", {
                msg: messageToSend,
                room
            })
            .then(_=> {
                messageToSend = ""
            })
    }
    
    // Join a new chat room
    function join() {
        if (currentRoom == room) {
            roomChangeText = "It is the room you are currently in"
            return
        }
        socket
            .timeout(5000)
            .emitWithAck("join", {currentRoom, room})
            .then(_=> {
                roomChangeText =`Changed room from ${currentRoom} to ${room}` 
                currentRoom = room
                messages = []
            })
    }

    const socket = io(PUBLIC_API_ADDRESS, {
        path: "/chat"
    })
    socket.on("chat", (msg) => {
        messages = [...messages, msg]
    })

    function keydown(event: KeyboardEvent) {
        if (event.shiftKey && event.key == "Enter") {
            send()
        } 
    }
</script>

<svelte:window on:keydown={keydown} />

<p>Current Room: {currentRoom}</p>
<input bind:value={room} type="text">
<button on:click={join} class="btn-primary">Change room</button>
<p class="text-red-500">{roomChangeText}</p>

<hr class="w-full h-px my-8 border-0 bg-primary">  

<ul bind:this={messagesList}>
    {#if messages.length == 0}
        <li>No Messages</li>
    {/if}
    {#each messages as message}
        <li>{message}</li>
    {/each}
</ul>
<input bind:value={messageToSend} type="text" autocomplete="off"/>
<button on:click={send} class="btn-primary">Send</button>