import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';

import { setCurrentSongURL } from '../../actions/actions';
import {
  PlayBoxWarp,
  PlayBoxImg,
  PlayBoxInfo,
  PlayBoxTitle,
  PlayBoxContent,
} from '../../styles/player/playbox';
function PlayBox() {
  const [videoDate, setVideoData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchVideoData = async () => {
      const videoId = 'sVTy_wmn5SU';
      const API_KEY = 'AIzaSyCApUdc9PuxJJYqjgNNNL2I2fkLuFIBasA';
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;

      try {
        const response = await axios.get(url);
        const video = response?.data?.items?.[0]?.snippet;
        setVideoData({
          title: video?.title,
          thumbnail: video?.thumbnails.high.url,
        });

        dispatch(
          setCurrentSongURL(`https://www.youtube.com/watch?v=${videoId}`)
        );
        console.log('video', video);
      } catch (e) {
        console.log(e);
        setVideoData({});
      }
    };

    fetchVideoData();
  }, [dispatch]);
  return (
    <PlayBoxWarp>
      <PlayBoxImg src={videoDate?.thumbnail} />
      <PlayBoxInfo>
        <PlayBoxTitle>{videoDate?.title}</PlayBoxTitle>
        <PlayBoxContent>가수제목</PlayBoxContent>
      </PlayBoxInfo>
    </PlayBoxWarp>
  );
}

export default PlayBox;
