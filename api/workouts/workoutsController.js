import { Router } from 'express'
import * as workoutsService from './workoutsService.js'
import { logger } from '../utils/logger.js'

const router = Router()

router.post('/add', async (req, res) => {
    try {
        await workoutsService.addWorkout(req.body)
        res.json('Success')
    } catch (err) {
        if (err.message === 'MISSING_FIELDS') {
            return res.status(400).json({ error: err.fields })
        }
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/workout/:userId/:date', async (req, res) => {
    try {
        const result = await workoutsService.getWorkoutsForDate(
            req.params.userId,
            req.params.date
        )
        res.json(result)
    } catch (err) {
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        await workoutsService.editWorkout(req.params.id, req.body)
        res.json('Success')
    } catch (err) {
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.put('/workout/status/:id', async (req, res) => {
    try {
        await workoutsService.updateWorkoutStatus(req.params.id, req.body.is_completed)
        res.json('Success')
    } catch (err) {
        if (err.message === 'MISSING_FIELDS') {
            return res.status(400).json({ error: 'is_completed and id are required' })
        }
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        await workoutsService.deleteWorkout(req.params.id)
        res.json('Success')
    } catch (err) {
        logger.error(`${req.method} ${req.originalUrl} failed:`, err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

export default router
