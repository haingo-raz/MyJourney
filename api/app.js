import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import apiRouter from './api.js'
import { logErrors, requestLogger } from './utils/middleware.js'

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const staticDir = path.join(__dirname, 'public')
const indexHtml = path.join(staticDir, 'index.html')
const hasFrontendBuild = fs.existsSync(indexHtml)

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

if (hasFrontendBuild) {
    app.use(express.static(staticDir))
}

app.use(bodyParser.json())
app.use('/', generalLimiter)
app.use('/chat', chatLimiter)

app.get('/healthz', (req, res) => res.json({ status: 'ok' }))

app.use('/', apiRouter)

if (hasFrontendBuild) {
    app.get('*', (req, res) => res.sendFile(indexHtml))
} else {
    app.get('/', (req, res) => res.send('MyJourney Fitness API'))
}

app.use(logErrors)

export default app
