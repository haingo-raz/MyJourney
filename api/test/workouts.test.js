import { expect } from 'chai'
import request from 'supertest'
import app from '../app.js'
import pool from '../db.js'

const TEST_TITLE = 'Mocha Test Workout'
const TEST_VIDEO_URL = 'https://www.youtube.com/watch?v=kuH-RRf6WP0'
const TEST_USER_ID = 1

describe('POST /add', () => {
    after(async () => {
        await pool.query('DELETE FROM workout WHERE title = ? AND user_id = ?', [
            TEST_TITLE,
            TEST_USER_ID,
        ])
    })

    it('returns Success for a valid workout', async () => {
        const res = await request(app).post('/add').send({
            title: TEST_TITLE,
            video_url: TEST_VIDEO_URL,
            duration_min: 21,
            user_id: TEST_USER_ID,
            is_completed: false,
        })
        expect(res.status).to.equal(200)
        expect(res.body).to.equal('Success')
    })

    it('returns 400 when video_url is empty', async () => {
        const res = await request(app).post('/add').send({
            title: TEST_TITLE,
            video_url: '',
            duration_min: 21,
            user_id: TEST_USER_ID,
        })
        expect(res.status).to.equal(400)
        expect(res.body)
            .to.have.property('error')
            .to.equal('user_id, video_url, title and duration_min are required')
    })

    it('returns 400 when user_id is missing', async () => {
        const res = await request(app).post('/add').send({
            title: TEST_TITLE,
            video_url: TEST_VIDEO_URL,
            duration_min: 21,
        })
        expect(res.status).to.equal(400)
        expect(res.body)
            .to.have.property('error')
            .to.equal('user_id, video_url, title and duration_min are required')
    })
})

describe('GET /workout/:userId/:date', () => {
    it('returns the correct shape for a valid user and date', async () => {
        const res = await request(app).get(`/workout/${TEST_USER_ID}/2024-09-18`)
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('object').with.all.keys('count', 'totalDuration', 'workouts')
        expect(res.body.workouts).to.be.an('array')
        expect(res.body.count).to.be.at.least(1)
    })

    it('returns zero count for a date with no workouts', async () => {
        const res = await request(app).get(`/workout/${TEST_USER_ID}/2000-01-01`)
        expect(res.status).to.equal(200)
        expect(res.body).to.have.property('count', 0)
        expect(res.body.workouts).to.be.an('array').with.lengthOf(0)
    })
})

describe('PUT /workout/status/:id', () => {
    let workoutId

    before(async () => {
        const [result] = await pool.query(
            'INSERT INTO workout (user_id, title, video_url, duration_min, is_completed) VALUES (?, ?, ?, ?, ?)',
            [TEST_USER_ID, TEST_TITLE + ' Status', TEST_VIDEO_URL, 10, 0]
        )
        workoutId = result.insertId
    })

    after(async () => {
        await pool.query('DELETE FROM workout WHERE workout_id = ?', [workoutId])
    })

    it('returns 400 when is_completed is missing', async () => {
        const res = await request(app).put(`/workout/status/${workoutId}`).send({})
        expect(res.status).to.equal(400)
        expect(res.body).to.have.property('error', 'is_completed and id are required')
    })

    it('updates workout status and returns Success', async () => {
        const res = await request(app)
            .put(`/workout/status/${workoutId}`)
            .send({ is_completed: true })
        expect(res.status).to.equal(200)
        expect(res.body).to.equal('Success')
    })
})

describe('DELETE /delete/:id', () => {
    let workoutId

    before(async () => {
        const [result] = await pool.query(
            'INSERT INTO workout (user_id, title, video_url, duration_min, is_completed) VALUES (?, ?, ?, ?, ?)',
            [TEST_USER_ID, TEST_TITLE + ' Delete', TEST_VIDEO_URL, 10, 0]
        )
        workoutId = result.insertId
    })

    after(async () => {
        await pool.query('DELETE FROM workout WHERE workout_id = ?', [workoutId])
    })

    it('deletes a workout and returns Success', async () => {
        const res = await request(app).delete(`/delete/${workoutId}`)
        expect(res.status).to.equal(200)
        expect(res.body).to.equal('Success')
    })
})
