import axios from 'axios';

function dateFormatter(date: Date) {
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
}

const urlPattern = new RegExp(
  '^(https?\\:\\/\\/)?((www\\.)?youtube\\.com|youtu\\.?be)\\/.+$',
  'i',
);

const getVideoYoutubeDetails = async (url: string) => {
  const videoId = url.split('v=')[1];
  const getTitle = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
  );
  const getDuration = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
  );
  const videoTitle = getTitle.data.items[0];
  const videoDuration = getDuration.data.items[0];
  return {
    title: videoTitle.snippet.title,
    duration: videoDuration.contentDetails.duration,
  };
};

function convertISO8601DurationToMinutes(duration: string) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) {
    return 0;
  }
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  return hours * 60 + minutes + Math.round(seconds / 60);
}

function getWorkoutImageSrc(title: string) {
  if (
    title.toLowerCase().includes('stretching') ||
    title.toLowerCase().includes('yoga') ||
    title.toLowerCase().includes('stretch')
  ) {
    return './assets/stretching.png';
  } else if (
    title.toLowerCase().includes('train') ||
    title.toLowerCase().includes('weight')
  ) {
    return './assets/weight.png';
  } else if (
    title.toLowerCase().includes('cardio') ||
    title.toLowerCase().includes('hiit')
  ) {
    return './assets/cardio.png';
  } else {
    return './assets/workout.png';
  }
}

export {
  dateFormatter,
  urlPattern,
  getVideoYoutubeDetails,
  convertISO8601DurationToMinutes,
  getWorkoutImageSrc,
};
