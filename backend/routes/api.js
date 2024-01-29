import { Router } from "express";
import prisma from "../lib/prismaClient";
const router = Router()

router.get("/profile", (req, res) => {
    if (req.session.username) {
        // prisma.user.findUnique({where: {username: req.session.username}})
        return res.send({username: req.session.username})
    }
    return res.send({err: "Not logged in"})
})

export default router