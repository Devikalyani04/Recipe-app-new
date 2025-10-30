const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

/*export const fetchYoutubeVideoId = async (recipeTitle) => {
  try {
    const query = encodeURIComponent(`${recipeTitle} recipe`);
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}&maxResults=1&type=video`
    );

    const data = await response.json();
    return data.items[0]?.id.videoId || null;
  } catch (error) {
    console.error("Error fetching YouTube video:", error);
    return null;
  }
};*/

const fetchYoutubeVideo = async (query) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&key=${API_KEY}&maxResults=1&type=video`
  );

  const data = await response.json();
  if (data.items && data.items.length > 0) {
    return `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
  } else {
    return null;
  }
};

export default fetchYoutubeVideo;
