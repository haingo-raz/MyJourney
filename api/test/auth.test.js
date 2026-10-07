import { expect } from 'chai'
import request from 'supertest'
import app from '../app.js'
import pool from '../db.js'

describe('POST /login', () => {
    it('returns 200 with user data for valid credentials', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: 'admin@mj.com', password: 'admin' })
        expect(res.status).to.equal(200)
        expect(res.body).to.have.property('message', 'Success')
        expect(res.body).to.have.property('email', 'admin@mj.com')
    })

    it('returns 400 for wrong password', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: 'admin@mj.com', password: 'wrongpassword' })
        expect(res.status).to.equal(400)
        expect(res.body).to.have.property('message', 'Invalid email or password')
    })

    it('returns 404 for unknown email', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: 'nobody@example.com', password: 'anypassword' })
        expect(res.status).to.equal(404)
        expect(res.body).to.have.property('message', 'User not found')
    })
})

describe('POST /signup', () => {
    const testEmail = `mocha-signup-${Date.now()}@test.com`

    after(async () => {
        await pool.query('DELETE FROM user WHERE email = ?', [testEmail])
    })

    it('creates a new user and returns Success', async () => {
        const res = await request(app)
            .post('/signup')
            .send({ email: testEmail, password: 'testpassword' })
        expect(res.status).to.equal(200)
        expect(res.body).to.equal('Success')
    })

    it('returns 400 for a duplicate email', async () => {
        const res = await request(app)
            .post('/signup')
            .send({ email: 'admin@mj.com', password: 'somepassword' })
        expect(res.status).to.equal(400)
        expect(res.body).to.have.property('message', 'User already exists')
    })

    it('returns 400 when email is missing', async () => {
        const res = await request(app).post('/signup').send({ password: 'somepassword' })
        expect(res.status).to.equal(400)
        expect(res.body).to.have.property('error', 'Username and password are required')
    })

    it('returns 400 when password is missing', async () => {
        const res = await request(app).post('/signup').send({ email: 'new@example.com' })
        expect(res.status).to.equal(400)
        expect(res.body).to.have.property('error', 'Username and password are required')
    })
})
