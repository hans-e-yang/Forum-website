import { Router } from "express"
import prisma from "../lib/prismaClient"
import bcrypt from 'bcrypt'

// Rounds of bcrypt salting
const saltRounds = 2
const router = Router()

router.post('/login', async (req, res) => {
    let {username, password} = req.body
    if (!username || !password) {
        return res.status(422).send({
            err: "Please supply an email address and password"
        })
    }
    prisma.user.findUnique({where:{username}})
        .then((user)=>{
            bcrypt.compare(password, user.password, (err, result)=> {
                if (!result) return res.status(401).send({err: 'The username and/or password is invalid.'})

                req.session.username = user.name
                req.session.userID = user.id
                return res.status(200).send({}) // important.......
            })
        })
        .catch((err)=>{
            // Should check the type of err, but otherwise
            return res.status(401).send({err: 'The username and/or password is invalid.'})
        })
})

router.post('/register', async (req, res) => {
    let {username, password} = req.body

    // Check if form parameters are fulfilled
    if (!username || !password) {
        return res.status(422).send({
            err: 'Please supply an email address and password'
        })
    }

    // Checks if another user with the same username exists
    const user = await prisma.user.findUnique({where: {username}})
    if (user) {
        // Possibly a security issue, have read that should return 200 either way but oh well
        return res.status(409).send({
            err: "The username has been taken, please choose another"
        })
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return res.status(500).send({err: "Internal server error"})
        
        prisma.user.create({
            data: {
                // password should be hashed
                username, password: hash
            }
        }).then((user)=> {
            // Registered
            // Set session cookie
            req.session.username = user.name
            req.session.userID = user.id
            
            return res.status(200).send({})
        }).catch(()=>{
            // Send error
            return res.status(500).send({err: "Internal server error"})
        })
    })

    
})

export default router