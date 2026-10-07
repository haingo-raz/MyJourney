import { expect } from 'chai'
import request from 'supertest'
import app from '../app.js'

describe('GET /profile/:userId', () => {
    it('returns profile for an existing user', async () => {
        const res = await request(app).get('/profile/1')
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('user_id', 1)
        expect(res.body).to.have.property('age', 22)
    })

    it('returns null for a non-existent user', async () => {
        const res = await request(app).get('/profile/99999')
        expect(res.status).to.equal(200)
        expect(res.body).to.be.null
    })
})

describe('PUT /profile', () => {
    it('updates profile fields and returns Success', async () => {
        const res = await request(app)
            .put('/profile')
            .send({ user_id: 1, profileDataValue: { age: 22 } })
        expect(res.status).to.equal(200)
        expect(res.body).to.equal('Success')
    })
})
