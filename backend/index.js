import express from "express";
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'
import session from "express-session";
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import apiRoutes from './routes/api.js'

const app = express()
const port = 3000
const server = createServer(app)
const io = new Server(server, {
    path: "/chat",
    cors: {
        origin: "http://localhost:5173"
    }
})

dotenv.config()
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/"
    }
}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}), express.json())

app.use(authRoutes)
app.use("/api", apiRoutes)


// Query for all posts with basic info, maybe add a cap, 5 or 10 perhaps
app.get("/posts", (req, res) => {
    res.send([{
        user: "Untitled potato",
        id: "aaaaa",
        time: new Date(2023, 10, 11),
        title: "Hello guys"
    }, {
        user: "old potato",
        id: "bbbbb",
        time: new Date(2024, 0, 1),
        title: "My Crypto recommendations"
    }, {
        user: "couch potato",
        id: "ccccc",
        time: new Date(2023, 3, 11),
        title: "Phone fell on my face. now my nose is broken"
    }])
})

// Quert for specific posts and threads
app.get("/post", (req, res)=> {
    if (req.query.id == 'aaaaa') {
        res.send([{
            user: "young potato",
            time: new Date(2023, 10, 12),
            text: "Hello to you too"
        }])
    } else {
        res.sendStatus(404)
    }
})


server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})

io.on('connection', (socket) => {
    socket.join("global")
    socket.on('chat', (data, callback)=> {
        socket
            .broadcast
            .to(data.room)
            .emit("chat", data.msg)
        callback({
            status: "ok"
        })
    })
    socket.on("join", (data, callback) => {
        if (data.currentRoom == data.room) return
        socket.leave(data.currentRoom)
        socket.join(data.room)
        callback({
            status: "ok"
        })
    })
})