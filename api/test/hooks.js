import pool from '../db.js'

after(async () => {
    await pool.end()
})
