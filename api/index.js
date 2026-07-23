import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as db from './database.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()

// Initialize express
const app = express()
const salt = 10
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('MyJourney Fitness API')
})

app.post('/login', login)
app.post('/signup', signUp)
app.post('/add', addWorkout)
app.post('/chat', chat)
app.post('/chat/ai', chatWithAI)

app.get('/workout/:userId/:date', getWorkoutByUserAndDate)
app.get('/profile/:userId', getProfileDetails)

app.put('/edit/:id', editWorkoutById)
app.put('/update-email', updateEmail)
app.put('/update-password', updatePassword)
app.put('/profile', addProfile)
app.put('/workout/status/:id', editWorkoutStatusById)

app.delete('/delete/:id', deleteWorkoutById)
app.delete('/delete-account', deleteAccount)

async function login(req, res) {
    try {
        const userInfo = req.body
        db.getUserByEmail(userInfo.email, async (err, user) => {
            if (err) {
                console.log('Error: ', err)
                res.status(500).json({ message: 'Internal server error' })
            } else if (user) {
                const validPass = await bcrypt.compare(
                    userInfo.password,
                    user.password_hash
                )
                if (validPass) {
                    res.status(200).json({
                        message: 'Success',
                        user_id: user.user_id,
                        email: user.email,
                    })
                } else {
                    res.status(400).json({
                        message: 'Invalid email or password',
                    })
                }
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        })
    } catch (err) {
        console.log('Error: ', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

async function signUp(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res
            .status(400)
            .json({ error: 'Username and password are required' })
    }

    const password_hash = await bcrypt.hash(password, salt)

    db.getUserByEmail(email, async (err, user) => {
        if (err) {
            console.log('Error: ', err)
            return res.status(500).json({ message: 'Internal server error' })
        }
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        // db.signUp sends the response ('Success' or the DB error).
        await db.signUp(res, email, password_hash)
    })
}

function addWorkout(req, res) {
    let workout = req.body
    console.log('Workout: ', JSON.stringify(workout))
    if (
        workout.title &&
        workout.video_url &&
        workout.duration_min &&
        workout.user_id
    ) {
        db.addWorkout(res, workout)
            .then(() => console.log('added workout'))
            .catch((err) => {
                console.log(err)
                res.status(500).json({ error: 'Internal server error' })
            })
    } else {
        res.status(400).json({
            error: 'user_id, video_url, title and duration_min are required',
        })
    }
}

function editWorkoutById(req, res) {
    let workout = req.body
    if (workout) {
        db.editWorkoutById(res, workout)
    } else {
        res.status(400).json({
            error: 'user_id, video_url, title and duration_min are required',
        })
    }
}

function editWorkoutStatusById(req, res) {
    const workoutId = req.params.id
    const { is_completed } = req.body

    if (is_completed !== undefined && workoutId !== undefined) {
        db.editWorkoutStatusById(res, is_completed, workoutId)
    } else res.status(400).json({ error: 'is_completed and id are required' })
}

function deleteWorkoutById(req, res) {
    let id = req.params.id
    db.deleteWorkoutById(res, id)
}

function getWorkoutByUserAndDate(req, res) {
    let userId = req.params.userId
    let date = req.params.date
    db.getWorkoutByUserAndDate(res, userId, date)
}

function updateEmail(req, res) {
    try {
        let userId = req.body.userId
        let newEmail = req.body.newEmail
        let password = req.body.password
        db.getUserById(userId, async (err, user) => {
            if (err) {
                console.log('Error: ', err)
                res.status(500).json({ message: 'Internal server error' })
            } else if (user) {
                const validPass = await bcrypt.compare(
                    password,
                    user.password_hash
                )
                if (validPass) {
                    db.updateEmail(res, userId, newEmail)
                } else {
                    res.status(400).json({ message: 'Invalid password' })
                }
            }
        })
    } catch (err) {
        console.log('Error: ', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

function updatePassword(req, res) {
    try {
        let userId = req.body.userId
        let password = req.body.password
        let newPassword = req.body.newPassword
        db.getUserById(userId, async (err, user) => {
            if (err) {
                console.log('Error: ', err)
                res.status(500).json({ message: 'Internal server error' })
            } else if (user) {
                const validPass = await bcrypt.compare(
                    password,
                    user.password_hash
                )
                if (validPass) {
                    const new_password_hash = await bcrypt.hash(
                        newPassword,
                        salt
                    )
                    db.updatePassword(res, userId, new_password_hash)
                } else {
                    res.status(400).json({ message: 'Invalid password' })
                }
            }
        })
    } catch (err) {
        console.log('Error: ', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

function deleteAccount(req, res) {
    try {
        let details = req.body

        db.getUserById(details.userId, async (err, user) => {
            if (err) {
                console.log('Error: ', err)
                res.status(500).json({ message: 'Internal server error' })
            } else if (user) {
                const validPass = await bcrypt.compare(
                    details.password,
                    user.password_hash
                )
                if (validPass) {
                    db.deleteAccount(res, details.userId)
                } else {
                    res.status(400).json({ message: 'Invalid password' })
                }
            }
        })
    } catch (err) {
        console.log('Error: ', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

function chat(req, res) {
    try {
        const user_id = req.body.user_id
        const message = req.body.user_message
        let response = ''
        const lowerCaseMessage = message.toLowerCase()

        if (
            lowerCaseMessage.includes('hi') ||
            lowerCaseMessage.includes('hello') ||
            lowerCaseMessage.includes('hey') ||
            lowerCaseMessage.includes('good morning') ||
            lowerCaseMessage.includes('good afternoon') ||
            lowerCaseMessage.includes('good evening') ||
            lowerCaseMessage.includes('hello there')
        ) {
            response = 'Hello! Let me know how I can help you today.'
            res.json(response)
        } else if (
            lowerCaseMessage === 'ok' ||
            lowerCaseMessage === 'okay' ||
            lowerCaseMessage === 'thanks' ||
            lowerCaseMessage === 'thank you'
        ) {
            response = 'Great! Let me know if you have any other questions.'
            res.json(response)
        } else if (
            lowerCaseMessage.includes(
                'how many minutes have i spent working out since i started my journey?'
            )
        ) {
            db.getWorkoutMinutesCount(res, user_id)
        } else if (
            lowerCaseMessage.includes(
                'how many workout programs have i completed so far?'
            )
        ) {
            db.getWorkoutProgramsCount(res, user_id)
        } else if (
            lowerCaseMessage.includes(
                'how many days have i worked out since i started my journey?'
            )
        ) {
            db.getWorkoutDaysCount(res, user_id)
        } else if (
            lowerCaseMessage === 'bye' ||
            lowerCaseMessage === 'goodbye' ||
            lowerCaseMessage === 'see you later' ||
            lowerCaseMessage === 'see you' ||
            lowerCaseMessage === 'talk to you later'
        ) {
            response = 'Goodbye! Have a great day!'
            res.json(response)
        } else {
            response = 'Please choose one of the options provided.'
            res.json(response)
        }
    } catch (err) {
        console.log('Error: ', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

function addProfile(req, res) {
    let user_id = req.body.user_id
    let profileData = req.body.profileDataValue || {}
    // saveProfile whitelists the allowed columns and binds every value as a
    // parameter, so the raw request object can be passed straight through.
    db.saveProfile(res, user_id, profileData)
}

function getProfileDetails(req, res) {
    let userId = req.params.userId
    db.getProfileDetails(res, userId)
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
})

async function chatWithAI(req, res) {
    try {
        const chat = model.startChat({
            history: req.body.history,
        })
        const msg = req.body.message
        const result = await chat.sendMessage(msg)
        res.send(result.response.text())
    } catch (error) {
        console.error('Error in chatWithAI:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

// Start the server on port 8080
app.listen(8080, () => {
    console.log('Server is running on port 8080')
})

export default app
