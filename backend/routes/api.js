import { Router } from "express";
import prisma from "../lib/prismaClient.js";
const router = Router()

router.get("/profile", (req, res) => {
    if (req.session.username) {
        // prisma.user.findUnique({where: {username: req.session.username}})
        return res.send({username: req.session.username})
    }
    return res.send({err: "Not logged in"})
})

router.post("/thread", (req, res) => {
    // Guard clause
    if (!req.session.userId) return res.send({err: "Not logged in"})

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
    .then(thread=>res.send({thread}))
})

router.post("/post", (req, res)=>{
    if (!req.session.userId) return res.send({err: "Not logged in"})

    const {body, threadId} = req.body
    if (!body || !threadId) return res.status(422).send({err: "Please supply all fields"})
    
    prisma.post.create({
        data: {
            userId: req.session.userId,
            body,
            createdAt: new Date(),
            threadId
        }
    })
    .then(post=>res.send({post}))
})

router.get("/thread", (req, res) => {
    prisma.thread.findMany({take: 10})
    .then(threads=> res.send({threads}))
})
export default router