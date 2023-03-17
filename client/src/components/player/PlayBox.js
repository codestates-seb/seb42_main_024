import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCurrentSongURL } from '../../actions/actions';
const PlayBoxWarp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color9);
`;
const PlayBoxImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-right: 11px;
`;
const PlayBoxInfo = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  width: 150px;
`;
const PlayBoxTitle = styled.span`
  font-size: 15px;
  font-family: var(--ft-pretendardBold);
`;
const PlayBoxContent = styled.span`
  font-family: var(--ft-pretendardRegular);
  font-size: 12px;
`;

function PlayBox() {
  const [videoDate, setVideoData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchVideoData = async () => {
      const videoId = 'sVTy_wmn5SU';
      const API_KEY = 'AIzaSyCApUdc9PuxJJYqjgNNNL2I2fkLuFIBasA';
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;

      try {
        const response = await axios.get(url);
        const video = response.data.items[0].snippet;
        setVideoData({
          title: video.title,
          thumbnail: video.thumbnails.high.url,
        });

        dispatch(
          setCurrentSongURL(`https://www.youtube.com/watch?v=${videoId}`)
        );
        console.log('video', video);
      } catch (error) {
        console.error(error);
        setVideoData(null);
      }
    };

    fetchVideoData();
  }, [dispatch]);
  return (
    <PlayBoxWarp>
      <PlayBoxImg src={videoDate.thumbnail} />
      <PlayBoxInfo>
        <PlayBoxTitle>{videoDate.title}</PlayBoxTitle>
        <PlayBoxContent>가수제목</PlayBoxContent>
      </PlayBoxInfo>
    </PlayBoxWarp>
  );
}

export default PlayBox;
