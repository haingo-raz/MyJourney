import pool from '../db.js'

export async function findByUserAndDate(userId, date) {
    const aggregateSql = `
        SELECT COUNT(*) AS workoutCount, SUM(duration_min) AS totalDuration
        FROM workout
        WHERE user_id = ? AND DATE(created_at) = ?
    `
    const detailsSql = `
        SELECT * FROM workout
        WHERE user_id = ? AND DATE(created_at) = ?
    `
    const [[aggregate], [details]] = await Promise.all([
        pool.query(aggregateSql, [userId, date]),
        pool.query(detailsSql, [userId, date]),
    ])
    return {
        count: aggregate[0].workoutCount,
        totalDuration: aggregate[0].totalDuration,
        workouts: details,
    }
}

export async function create(data) {
    const sql = `INSERT INTO workout (title, video_url, duration_min, user_id, is_completed) VALUES (?, ?, ?, ?, ?)`
    const [result] = await pool.query(sql, [
        data.title,
        data.video_url,
        data.duration_min,
        data.user_id,
        data.is_completed ? 1 : 0,
    ])
    return result.insertId
}

export async function updateById(id, data) {
    const sql = `UPDATE workout SET title = ?, video_url = ?, duration_min = ? WHERE workout_id = ?`
    await pool.query(sql, [data.title, data.video_url, data.duration_min, id])
}

export async function updateStatusById(id, isCompleted) {
    const sql = `UPDATE workout SET is_completed = ? WHERE workout_id = ?`
    await pool.query(sql, [isCompleted ? 1 : 0, id])
}

export async function deleteById(id) {
    const sql = `DELETE FROM workout WHERE workout_id = ?`
    await pool.query(sql, [id])
}

export async function sumMinutesByUser(userId) {
    const sql = `SELECT SUM(duration_min) AS totalDuration FROM workout WHERE user_id = ? AND is_completed = 1`
    const [rows] = await pool.query(sql, [userId])
    return rows[0].totalDuration
}

export async function countCompletedByUser(userId) {
    const sql = `SELECT COUNT(*) AS totalWorkouts FROM workout WHERE user_id = ? AND is_completed = 1`
    const [rows] = await pool.query(sql, [userId])
    return rows[0].totalWorkouts
}

export async function countDaysByUser(userId) {
    const sql = `SELECT COUNT(DISTINCT DATE(created_at)) AS totalDays FROM workout WHERE user_id = ? AND is_completed = 1`
    const [rows] = await pool.query(sql, [userId])
    return rows[0].totalDays
}
