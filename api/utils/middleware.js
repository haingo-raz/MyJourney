import { logger } from './logger.js'

export function requestLogger(req, res, next) {
    const start = Date.now()
    res.on('finish', () => {
        const ms = Date.now() - start
        logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`)
    })
    next()
}

export function logErrors(err, req, res, next) {
    logger.error(err)
    res.status(500).json({ message: 'Internal server error' })
}
