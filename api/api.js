import { Router } from 'express'
import authRouter from './auth/authController.js'
import usersRouter from './users/usersController.js'
import workoutsRouter from './workouts/workoutsController.js'
import chatRouter from './chat/chatController.js'

const router = Router()

router.use('/', authRouter)
router.use('/', usersRouter)
router.use('/', workoutsRouter)
router.use('/', chatRouter)

export default router
