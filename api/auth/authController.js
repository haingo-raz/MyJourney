import { Router } from 'express'
import * as usersService from '../users/usersService.js'
import { logger } from '../utils/logger.js'

const router = Router()

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await usersService.login(email, password)
        res.status(200).json({ message: 'Success', ...user })
    } catch (err) {
        if (err.message === 'USER_NOT_FOUND')
            return res.status(404).json({ message: 'User not found' })
        if (err.message === 'INVALID_PASSWORD')
            return res.status(400).json({ message: 'Invalid email or password' })
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body
        await usersService.register(email, password)
        res.json('Success')
    } catch (err) {
        if (err.message === 'MISSING_FIELDS')
            return res.status(400).json({ error: 'Username and password are required' })
        if (err.message === 'USER_EXISTS')
            return res.status(400).json({ message: 'User already exists' })
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

export default router
