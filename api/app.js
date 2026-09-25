import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import apiRouter from './api.js'
import { logErrors, requestLogger } from './utils/middleware.js'

const app = express()

app.use(requestLogger)
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('MyJourney Fitness API'))

app.use('/', apiRouter)

app.use(logErrors)

export default app
