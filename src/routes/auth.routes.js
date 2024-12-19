import { Router } from "express";
import { authenticateToken, login, logout, register } from "../controller/auth.controller.js";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', authenticateToken, logout)

router.get('/check_session', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Session is valid', user: req.user })
})

export default router