import { Router } from 'express'
import * as youtubeService from './youtubeService.js'
import { logger } from '../utils/logger.js'

const router = Router()

router.get('/youtube/metadata', async (req, res) => {
    try {
        const metadata = await youtubeService.getVideoMetadata(req.query.url)
        res.json(metadata)
    } catch (err) {
        if (err.message === 'INVALID_YOUTUBE_URL') {
            return res.status(400).json({ error: 'Invalid YouTube URL' })
        }
        if (err.message === 'VIDEO_NOT_FOUND') {
            return res.status(404).json({ error: 'Video not found' })
        }
        if (err.message === 'YOUTUBE_NOT_CONFIGURED') {
            return res
                .status(503)
                .json({ error: 'YouTube lookup is not configured' })
        }
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

export default router
