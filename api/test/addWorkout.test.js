import { expect } from 'chai'
import request from 'supertest'
import app from '../app.js'

describe('Workout Tests', () => {
    it('should create a new workout instance with the appropriate properties', (done) => {
        const newWorkout = {
            title: 'Test Workout',
            video_url: 'https://www.youtube.com/watch?v=kuH-RRf6WP0',
            duration_min: 21,
            user_id: 1,
            is_completed: false,
        }

        request(app)
            .post('/add')
            .send(newWorkout)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).to.equal('Success')
                done()
            })
    })

    it('should return 400 when not all required properties are provided', (done) => {
        const newWorkout = {
            title: 'Test Workout',
            video_url: '',
            duration_min: 21,
            user_id: 1,
            is_completed: false,
        }

        request(app)
            .post('/add')
            .send(newWorkout)
            .expect(400)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body)
                    .to.have.property('error')
                    .to.equal(
                        'user_id, video_url, title and duration_min are required'
                    )
                done()
            })
    })
})
