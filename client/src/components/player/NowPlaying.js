import styled from 'styled-components';
import PlayBox from './PlayBox';
import Player from './Player';
import { useState, useEffect } from 'react';
import PlayList from './PlayList';
import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { setCurrentSongURL } from '../../actions';
const PlayWarp = styled.div``;
const NowPlayingWrap = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 80px;
  background-color: var(--color11);
  display: flex;
  padding-left: 18vw;
  border-top: 0.5px solid rgb(85, 85, 85);
`;
// Modal
const PlayListBox = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 80px;
  left: 0;
  z-index: 2;
  transform: translateY(${(props) => (props.isOpen ? '0' : '120%')});
  transition: transform 0.2s ease-in-out;
`;
const PlayListCover = styled.div`
  background-color: var(--color11);
  position: absolute;
  top: 0;
  right: 470px;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const PlayListImg = styled.img`
  width: 55vh;
  height: 55vh;
  background-color: white;
  vertical-align: middle;
`;

function NowPlaying() {
  const [isOpen, setIsOpen] = useState(false);

  const handlePlayList = () => {
    setIsOpen(!isOpen);
    // console.log(isOpen);
  };
  // const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState([]);

  // useEffect(() => {
  //   const fetchVideoData = async () => {
  //     const videoId = 'sVTy_wmn5SU';
  //     const API_KEY = 'AIzaSyCApUdc9PuxJJYqjgNNNL2I2fkLuFIBasA';
  //     const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;

  //     try {
  //       const response = await axios.get(url);
  //       const video = response.data.items[0].snippet;
  //       setVideoData({
  //         title: video.title,
  //         thumbnail: video.thumbnails.high.url,
  //       });

  //       dispatch(
  //         setCurrentSongURL(`https://www.youtube.com/watch?v=${videoId}`)
  //       );
  //       console.log('video', video);
  //     } catch (error) {
  //       console.error(error);
  //       setVideoData(null);
  //     }
  //   };

  //   fetchVideoData();
  // }, [dispatch]);
  useEffect(() => {
    // const videoId = 'UC3IZKseVpdzPSBaWxBxundA';
    // const API_KEY = 'AIzaSyCApUdc9PuxJJYqjgNNNL2I2fkLuFIBasA';
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UC3IZKseVpdzPSBaWxBxundA&maxResults=50&key=AIzaSyCApUdc9PuxJJYqjgNNNL2I2fkLuFIBasA`
      )
      .then((res) => {
        // console.log(res);
        setPlaylist(res.data.items);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  // console.log(playlist);
  return (
    <PlayWarp>
      {/* NowPlaying */}
      <NowPlayingWrap onClick={handlePlayList}>
        <PlayBox />
        <Player />
      </NowPlayingWrap>
      {/* PlayList */}
      <PlayListBox isOpen={isOpen} onClick={handlePlayList}>
        <PlayListCover>
          <PlayListImg />
        </PlayListCover>
        <PlayList playlist={playlist} />
      </PlayListBox>
    </PlayWarp>
  );
}

export default NowPlaying;
