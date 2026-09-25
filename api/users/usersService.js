import bcrypt from 'bcrypt'
import * as userModel from './userModel.js'

const SALT_ROUNDS = 10

export async function login(email, password) {
    const user = await userModel.findByEmail(email)
    if (!user) throw new Error('USER_NOT_FOUND')
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) throw new Error('INVALID_PASSWORD')
    return { user_id: user.user_id, email: user.email }
}

export async function register(email, password) {
    if (!email || !password) throw new Error('MISSING_FIELDS')
    const existing = await userModel.findByEmail(email)
    if (existing) throw new Error('USER_EXISTS')
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    return userModel.create(email, passwordHash)
}

export async function changeEmail(userId, password, newEmail) {
    const user = await userModel.findById(userId)
    if (!user) throw new Error('USER_NOT_FOUND')
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) throw new Error('INVALID_PASSWORD')
    await userModel.updateEmail(userId, newEmail)
}

export async function changePassword(userId, password, newPassword) {
    const user = await userModel.findById(userId)
    if (!user) throw new Error('USER_NOT_FOUND')
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) throw new Error('INVALID_PASSWORD')
    const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS)
    await userModel.updatePassword(userId, newHash)
}

export async function removeAccount(userId, password) {
    const user = await userModel.findById(userId)
    if (!user) throw new Error('USER_NOT_FOUND')
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) throw new Error('INVALID_PASSWORD')
    await userModel.deleteById(userId)
}

export async function getProfile(userId) {
    return userModel.getProfile(userId)
}

export async function updateProfile(userId, profileData) {
    await userModel.saveProfile(userId, profileData)
}
