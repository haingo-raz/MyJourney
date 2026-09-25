import * as workoutModel from './workoutModel.js'

export async function getWorkoutsForDate(userId, date) {
    return workoutModel.findByUserAndDate(userId, date)
}

export async function addWorkout(data) {
    const { title, video_url, duration_min, user_id } = data
    if (!title || !video_url || !duration_min || !user_id) {
        const err = new Error('MISSING_FIELDS')
        err.fields = 'user_id, video_url, title and duration_min are required'
        throw err
    }
    return workoutModel.create(data)
}

export async function editWorkout(id, data) {
    await workoutModel.updateById(id, data)
}

export async function updateWorkoutStatus(id, isCompleted) {
    if (isCompleted === undefined) throw new Error('MISSING_FIELDS')
    await workoutModel.updateStatusById(id, isCompleted)
}

export async function deleteWorkout(id) {
    await workoutModel.deleteById(id)
}

export async function getMinutesTotal(userId) {
    return workoutModel.sumMinutesByUser(userId)
}

export async function getProgramsTotal(userId) {
    return workoutModel.countCompletedByUser(userId)
}

export async function getDaysTotal(userId) {
    return workoutModel.countDaysByUser(userId)
}
