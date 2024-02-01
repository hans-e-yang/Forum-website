import { Router } from "express";
import prisma from "../lib/prismaClient.js";
const router = Router()

// Based on Auth.js
function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
        return res.send({err: "Not logged in"})
    } else {
        next()
    }
}

router.get("/profile", isAuthenticated, (req, res) => {
    // prisma.user.findUnique({where: {username: req.session.username}})
    return res.send({username: req.session.username})
})

router.post("/thread", isAuthenticated, (req, res) => {
    const {title} = req.body
    if (!title) return res.send({err: "Please supply all fields"})

    prisma.thread.create({
        data: {
            userId: req.session.userId,
            title,
            createdAt: new Date()
        },
        include: { //May be useful in the future?
            author: true,
            posts: true
        }
    })
     // Thread.user as well? perhaps only 
     // end the username for now, or user profile or some shit
     // Perhaps just send OK, success object or smth instead of the thread
    .then(thread=>res.send({thread}))
})

router.post("/post", isAuthenticated, (req, res)=>{
    const {body, threadId: threadIdStr} = req.body
    const threadId = parseInt(threadIdStr)
    if (!body || isNaN(threadId)) return res.status(422).send({err: "Please supply all fields"})
    
    prisma.post.create({
        data: {
            userId: req.session.userId,
            body,
            createdAt: new Date(),
            threadId
        }
    })
    // Perhaps just send ok or smth
    .then(post=>res.send({post}))
})

router.get("/thread", (req, res) => {
    // Parse the queries
    const threadId = parseInt(req.query.threadId)

    if (isNaN(threadId)) {
        const amount = parseInt(req.query.amount)
        prisma.thread.findMany({
            take: amount || 10, 
            select: {
                id: true,
                title: true,
                createdAt: true,
                author: true
            }
        })
        .then(threads=> res.send({threads}))
    } else {
        prisma.thread.findUnique({
            where: {id: threadId},
            include: {
                posts: {
                    include: {
                        author: true
                    }
                },
                author: true,
            }
        })
        .then(thread=>res.send({thread}))
    }

    
})

export default router