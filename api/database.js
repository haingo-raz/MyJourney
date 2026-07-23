import mysql from 'mysql2'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

// Aiven for MySQL requires an SSL connection. Provide the CA certificate that
// Aiven gives you in the service overview (download it, e.g. as ca.pem, and
// point DB_CA_CERT_PATH at it).
const ssl = process.env.DB_CA_CERT_PATH
    ? {
          ca: fs.readFileSync(process.env.DB_CA_CERT_PATH),
          rejectUnauthorized: true,
      }
    : { rejectUnauthorized: true }

// Configuration for the Aiven MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl,
})

console.log('Starting...')

// Columns a client is allowed to write on the profile. Anything else in the
// request body is ignored, and every value is bound as a parameter.
const PROFILE_COLUMNS = [
    'age',
    'gender',
    'height_cm',
    'weight_kg',
    'daily_calorie_target',
    'fitness_goals',
    'weight_goal_kg',
]

async function getUserByEmail(email, callback) {
    let sql = `SELECT user_id, email, password_hash FROM user WHERE email = ?`
    db.query(sql, [email], (err, result) => {
        if (err) return callback(err)
        return callback(null, result[0])
    })
}

async function getUserById(userId, callback) {
    let sql = `SELECT user_id, email, password_hash FROM user WHERE user_id = ?`
    db.query(sql, [userId], (err, result) => {
        if (err) return callback(err)
        return callback(null, result[0])
    })
}

async function signUp(res, email, password_hash) {
    db.beginTransaction(async (err) => {
        if (err) {
            return res.json(err)
        }

        try {
            let sql = `INSERT INTO user (email, password_hash) VALUES (?, ?)`
            let sql2 = `INSERT INTO profile (user_id) VALUES (?)`

            db.query(sql, [email, password_hash], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        return res.json(err)
                    })
                }

                const userId = result.insertId

                db.query(sql2, [userId], (err) => {
                    if (err) {
                        return db.rollback(() => {
                            return res.json(err)
                        })
                    }

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                return res.json(err)
                            })
                        }
                        return res.json('Success')
                    })
                })
            })
        } catch (err) {
            db.rollback(() => {
                return res.json(err)
            })
        }
    })
}

async function addWorkout(res, workout) {
    try {
        let sql = `INSERT INTO workout (title, video_url, duration_min, user_id, is_completed) VALUES (?, ?, ?, ?, ?)`
        db.query(
            sql,
            [
                workout.title,
                workout.video_url,
                workout.duration_min,
                workout.user_id,
                workout.is_completed ? 1 : 0,
            ],
            (err, result) => {
                if (err) return res.json(err)
                return res.json('Success')
            }
        )
    } catch (err) {
        return res.json(err)
    }
}

async function editWorkoutById(res, workout) {
    try {
        let sql = `UPDATE workout SET title = ?, video_url = ?, duration_min = ? WHERE workout_id = ?`
        db.query(
            sql,
            [
                workout.title,
                workout.video_url,
                workout.duration_min,
                workout.workout_id,
            ],
            (err, result) => {
                if (err) return res.json(err)
                return res.json('Success')
            }
        )
    } catch (err) {
        return res.json(err)
    }
}

function editWorkoutStatusById(res, isCompleted, workoutId) {
    try {
        let sql = `UPDATE workout SET is_completed = ? WHERE workout_id = ?`
        db.query(sql, [isCompleted ? 1 : 0, workoutId], (err, result) => {
            if (err) return res.json(err)
            return res.json('Success')
        })
    } catch (err) {
        return res.json(err)
    }
}

async function deleteWorkoutById(res, id) {
    try {
        let sql = `DELETE FROM workout WHERE workout_id = ?`
        db.query(sql, [id], (err, result) => {
            if (err) return res.json(err)
            return res.json('Success')
        })
    } catch (err) {
        return res.json(err)
    }
}

async function getWorkoutByUserAndDate(res, userId, date) {
    const aggregateSql = `
        SELECT
            COUNT(*) AS workoutCount,
            SUM(duration_min) AS totalDuration
        FROM workout
        WHERE user_id = ?
          AND DATE(created_at) = ?
    `

    const detailsSql = `
        SELECT *
        FROM workout
        WHERE user_id = ?
          AND DATE(created_at) = ?
    `

    db.query(aggregateSql, [userId, date], (err, aggregateResult) => {
        if (err) return res.json(err)

        db.query(detailsSql, [userId, date], (err, detailsResult) => {
            if (err) return res.json(err)

            const response = {
                count: aggregateResult[0].workoutCount,
                totalDuration: aggregateResult[0].totalDuration,
                workouts: detailsResult,
            }

            return res.json(response)
        })
    })
}

async function updateEmail(res, userId, newEmail) {
    let sql = `UPDATE user SET email = ? WHERE user_id = ?`
    db.query(sql, [newEmail, userId], (err, result) => {
        if (err) return res.json(err)
        return res.json('Success')
    })
}

async function updatePassword(res, userId, password_hash) {
    try {
        let sql = `UPDATE user SET password_hash = ? WHERE user_id = ?`
        db.query(sql, [password_hash, userId], (err, result) => {
            if (err) return res.json(err)
            return res.json('Success')
        })
    } catch (err) {
        return res.json(err)
    }
}

async function deleteAccount(res, userId) {
    // ON DELETE CASCADE removes the matching profile and workout rows.
    let sql = `DELETE FROM user WHERE user_id = ?`
    db.query(sql, [userId], (err, result) => {
        if (err) return res.json(err)
        return res.json('Success')
    })
}

async function saveProfile(res, userId, profile) {
    try {
        const columns = PROFILE_COLUMNS.filter(
            (col) => profile[col] !== undefined && profile[col] !== null
        )

        if (columns.length === 0) {
            return res.json('No fields to update')
        }

        const setClause = columns.map((col) => `${col} = ?`).join(', ')
        const values = columns.map((col) => profile[col])
        values.push(userId)

        let sql = `UPDATE profile SET ${setClause} WHERE user_id = ?`
        db.query(sql, values, (err, result) => {
            if (err) return res.json(err)
            return res.json('Success')
        })
    } catch (err) {
        return res.json(err)
    }
}

async function getProfileDetails(res, userId) {
    let sql = `SELECT * FROM profile WHERE user_id = ?`
    db.query(sql, [userId], (err, result) => {
        if (err) return res.json(err)
        return res.json(result[0])
    })
}

async function getWorkoutMinutesCount(res, userId) {
    try {
        let sql = `SELECT SUM(duration_min) AS totalDuration FROM workout WHERE user_id = ? AND is_completed = 1`
        db.query(sql, [userId], (err, result) => {
            if (err) return res.json(err)
            let response = `You have trained for a total of ${result[0].totalDuration} minutes.`
            return res.json(response)
        })
    } catch (err) {
        return res.json(err)
    }
}

async function getWorkoutProgramsCount(res, userId) {
    try {
        let sql = `SELECT COUNT(*) AS totalWorkouts FROM workout WHERE user_id = ? AND is_completed = 1`
        db.query(sql, [userId], (err, result) => {
            if (err) return res.json(err)
            let response = `You have completed a total of ${result[0].totalWorkouts} workout programs.`
            return res.json(response)
        })
    } catch (err) {
        return res.json(err)
    }
}

async function getWorkoutDaysCount(res, userId) {
    try {
        let sql = `SELECT COUNT(DISTINCT DATE(created_at)) AS totalDays FROM workout WHERE user_id = ? AND is_completed = 1`
        db.query(sql, [userId], (err, result) => {
            if (err) return res.json(err)
            let response = `You have trained for a total of ${result[0].totalDays} days.`
            return res.json(response)
        })
    } catch (err) {
        return res.json(err)
    }
}

export {
    getUserByEmail,
    getUserById,
    signUp,
    addWorkout,
    editWorkoutById,
    editWorkoutStatusById,
    deleteWorkoutById,
    getWorkoutByUserAndDate,
    updateEmail,
    updatePassword,
    deleteAccount,
    saveProfile,
    getProfileDetails,
    getWorkoutMinutesCount,
    getWorkoutProgramsCount,
    getWorkoutDaysCount,
}
