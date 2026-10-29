import { config } from '../utils/config.js'

// Accepts both youtube.com/watch?v=ID and youtu.be/ID forms.
function extractVideoId(url) {
    try {
        const parsed = new URL(url)
        if (parsed.hostname.includes('youtu.be')) {
            return parsed.pathname.slice(1) || null
        }
        return parsed.searchParams.get('v')
    } catch {
        return null
    }
}

// Looks up a video's title and ISO 8601 duration from the YouTube Data API.
export async function getVideoMetadata(url) {
    if (!config.YOUTUBE_API_KEY) throw new Error('YOUTUBE_NOT_CONFIGURED')

    const videoId = extractVideoId(url)
    if (!videoId) throw new Error('INVALID_YOUTUBE_URL')

    const endpoint =
        `https://www.googleapis.com/youtube/v3/videos` +
        `?part=snippet,contentDetails&id=${videoId}&key=${config.YOUTUBE_API_KEY}`

    const response = await fetch(endpoint)
    if (!response.ok) throw new Error('YOUTUBE_REQUEST_FAILED')

    const data = await response.json()
    const item = data.items?.[0]
    if (!item) throw new Error('VIDEO_NOT_FOUND')

    return {
        title: item.snippet.title,
        duration: item.contentDetails.duration,
    }
}
