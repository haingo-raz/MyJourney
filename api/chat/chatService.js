import { GoogleGenerativeAI } from '@google/generative-ai'
import { config } from '../utils/config.js'
import * as workoutsService from '../workouts/workoutsService.js'

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: config.GEMINI_MODEL })

export async function handleKeywordChat(userId, message) {
    const msg = message.toLowerCase()

    if (
        msg.includes('hi') ||
        msg.includes('hello') ||
        msg.includes('hey') ||
        msg.includes('good morning') ||
        msg.includes('good afternoon') ||
        msg.includes('good evening') ||
        msg.includes('hello there')
    ) {
        return 'Hello! Let me know how I can help you today.'
    }

    if (msg === 'ok' || msg === 'okay' || msg === 'thanks' || msg === 'thank you') {
        return 'Great! Let me know if you have any other questions.'
    }

    if (
        msg.includes('how many minutes have i spent working out since i started my journey?')
    ) {
        const total = await workoutsService.getMinutesTotal(userId)
        return `You have trained for a total of ${total} minutes.`
    }

    if (msg.includes('how many workout programs have i completed so far?')) {
        const total = await workoutsService.getProgramsTotal(userId)
        return `You have completed a total of ${total} workout programs.`
    }

    if (
        msg.includes('how many days have i worked out since i started my journey?')
    ) {
        const total = await workoutsService.getDaysTotal(userId)
        return `You have trained for a total of ${total} days.`
    }

    if (
        msg === 'bye' ||
        msg === 'goodbye' ||
        msg === 'see you later' ||
        msg === 'see you' ||
        msg === 'talk to you later'
    ) {
        return 'Goodbye! Have a great day!'
    }

    return 'Please choose one of the options provided.'
}

export async function handleAIChat(history, message) {
    const chat = model.startChat({ history })
    const result = await chat.sendMessage(message)
    return result.response.text()
}
