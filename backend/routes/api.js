import { Router } from "express";

const router = Router()

router.get('/test', (req, res) => {
    console.log("HI")
    const user = req.session.user
    console.log(user)
    if (req.session.thing) {
        res.send(`${req.session.thing}`)
    } else {
        res.sendStatus(200)
    }
})

export default router