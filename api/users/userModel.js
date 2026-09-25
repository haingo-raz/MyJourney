import pool from '../db.js'

const PROFILE_COLUMNS = [
    'age',
    'gender',
    'height_cm',
    'weight_kg',
    'daily_calorie_target',
    'fitness_goals',
    'weight_goal_kg',
]

export async function findByEmail(email) {
    const [rows] = await pool.query(
        'SELECT user_id, email, password_hash FROM user WHERE email = ?',
        [email]
    )
    return rows[0] ?? null
}

export async function findById(userId) {
    const [rows] = await pool.query(
        'SELECT user_id, email, password_hash FROM user WHERE user_id = ?',
        [userId]
    )
    return rows[0] ?? null
}

export async function create(email, passwordHash) {
    const conn = await pool.getConnection()
    try {
        await conn.beginTransaction()
        const [result] = await conn.query(
            'INSERT INTO user (email, password_hash) VALUES (?, ?)',
            [email, passwordHash]
        )
        await conn.query('INSERT INTO profile (user_id) VALUES (?)', [result.insertId])
        await conn.commit()
        return result.insertId
    } catch (err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}

export async function updateEmail(userId, newEmail) {
    await pool.query('UPDATE user SET email = ? WHERE user_id = ?', [newEmail, userId])
}

export async function updatePassword(userId, passwordHash) {
    await pool.query('UPDATE user SET password_hash = ? WHERE user_id = ?', [
        passwordHash,
        userId,
    ])
}

export async function deleteById(userId) {
    await pool.query('DELETE FROM user WHERE user_id = ?', [userId])
}

export async function getProfile(userId) {
    const [rows] = await pool.query('SELECT * FROM profile WHERE user_id = ?', [userId])
    return rows[0] ?? null
}

export async function saveProfile(userId, profile) {
    const columns = PROFILE_COLUMNS.filter(
        (col) => profile[col] !== undefined && profile[col] !== null
    )
    if (columns.length === 0) return
    const setClause = columns.map((col) => `${col} = ?`).join(', ')
    const values = [...columns.map((col) => profile[col]), userId]
    await pool.query(`UPDATE profile SET ${setClause} WHERE user_id = ?`, values)
}
