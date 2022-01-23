import express from 'express'
import { authenticateUser } from '../middlewares/authentication.js'
const router = express.Router()

import {
    login,
    register,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword
} from '../controllers/authController.js'

router.post('/register', register)
router.post('/login', login)
router.delete('/logout', authenticateUser, logout)
router.post('/verify-email', verifyEmail)
router.post('/reset-password', resetPassword)
router.post('/forgot-password', forgotPassword)

export default router