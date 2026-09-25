import 'dotenv/config'

const required = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_NAME', 'GEMINI_API_KEY']

for (const key of required) {
    if (!process.env[key]) throw new Error(`Missing required env var: ${key}`)
}

export const config = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_MODEL: process.env.GEMINI_MODEL,
    PORT: Number(process.env.PORT) || 8080,
}
