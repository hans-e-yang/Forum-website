import express from "express";
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()
const port = 3000
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

app.get('/', (req, res)=> {
    res.send("Hello World!")
})

io.on('connection', (socket) => {
    console.log("a user connected")

    socket.on('chat message', (msg)=> {
        io.emit("chat message", msg)
    }) 
})

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})