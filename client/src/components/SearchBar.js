import { useState } from 'react';

import axios from 'axios';

const SearchBar = () => {
  const [videos, setVideos] = useState([]);
  const [keywords, setKeywords] = useState('');

  const API = process.env.REACT_APP_YOUTUBE_API_KEY;

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            key: API,
            part: 'snippet',
            q: keywords,
            maxResults: 20,
            type: 'video',
            videoEmbeddable: true,
            videoCategoryId: 10,
            order: 'viewCount',
            videoLicense: 'youtube',
          },
        }
      );
      setVideos(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='search'>
      <input
        type='text'
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {videos.map((video) => (
        <div key={video.id.videoId}>
          <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <h3>{video.snippet.title}</h3>
            <p>{video.snippet.description}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default SearchBar;
