import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import apiRouter from './api.js'
import { logErrors, requestLogger } from './utils/middleware.js'

const app = express()

const rateLimitResponse = { error: 'Too many requests, please slow down.' }

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: rateLimitResponse,
})

const chatLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: rateLimitResponse,
})

app.use(requestLogger)
app.use(cors())
app.use(bodyParser.json())
app.use('/', generalLimiter)
app.use('/chat', chatLimiter)

app.get('/', (req, res) => res.send('MyJourney Fitness API'))

app.use('/', apiRouter)

app.use(logErrors)

export default app
