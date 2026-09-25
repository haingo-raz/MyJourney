import { expect } from 'chai'
import request from 'supertest'
import app from '../app.js'

describe('Profile Tests', () => {
    it('should return the profile details of a user based on their user_id', (done) => {
        const user_id = 1

        request(app)
            .get(`/profile/${user_id}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('user_id').to.equal(user_id)
                done()
            })
    })
})
