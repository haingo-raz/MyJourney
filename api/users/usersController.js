import { Router } from 'express'
import * as usersService from './usersService.js'
import { logger } from '../utils/logger.js'

const router = Router()

router.get('/profile/:userId', async (req, res) => {
    try {
        const profile = await usersService.getProfile(req.params.userId)
        res.json(profile)
    } catch (err) {
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.put('/update-email', async (req, res) => {
    try {
        const { userId, password, newEmail } = req.body
        await usersService.changeEmail(userId, password, newEmail)
        res.json('Success')
    } catch (err) {
        if (err.message === 'INVALID_PASSWORD')
            return res.status(400).json({ message: 'Invalid password' })
        if (err.message === 'USER_NOT_FOUND')
            return res.status(404).json({ message: 'User not found' })
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.put('/update-password', async (req, res) => {
    try {
        const { userId, password, newPassword } = req.body
        await usersService.changePassword(userId, password, newPassword)
        res.json('Success')
    } catch (err) {
        if (err.message === 'INVALID_PASSWORD')
            return res.status(400).json({ message: 'Invalid password' })
        if (err.message === 'USER_NOT_FOUND')
            return res.status(404).json({ message: 'User not found' })
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.put('/profile', async (req, res) => {
    try {
        const { user_id, profileDataValue } = req.body
        await usersService.updateProfile(user_id, profileDataValue || {})
        res.json('Success')
    } catch (err) {
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.delete('/delete-account', async (req, res) => {
    try {
        const { userId, password } = req.body
        await usersService.removeAccount(userId, password)
        res.json('Success')
    } catch (err) {
        if (err.message === 'INVALID_PASSWORD')
            return res.status(400).json({ message: 'Invalid password' })
        if (err.message === 'USER_NOT_FOUND')
            return res.status(404).json({ message: 'User not found' })
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

export default router
