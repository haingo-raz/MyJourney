import axios from 'axios';

function dateFormatter(date: Date) {
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
}

const urlPattern = new RegExp(
  '^(https?\\:\\/\\/)?((www\\.)?youtube\\.com|youtu\\.?be)\\/.+$',
  'i',
);

const getVideoYoutubeDetails = async (url: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/youtube/metadata`,
    { params: { url } },
  );
  return {
    title: response.data.title,
    duration: response.data.duration,
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
