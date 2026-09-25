import { Router } from 'express'
import * as chatService from './chatService.js'
import { logger } from '../utils/logger.js'

const router = Router()

router.post('/chat', async (req, res) => {
    try {
        const response = await chatService.handleKeywordChat(
            req.body.user_id,
            req.body.user_message
        )
        res.json(response)
    } catch (err) {
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/chat/ai', async (req, res) => {
    try {
        const text = await chatService.handleAIChat(req.body.history, req.body.message)
        res.send(text)
    } catch (err) {
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

export default router
