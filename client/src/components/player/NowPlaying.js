import { useState, useEffect } from 'react';

import axios from 'axios';

import PlayBox from './PlayBox';
import Player from './Player';
import PlayList from './PlayList';
import Volume from './Volume ';

import {
  PlayWarp,
  NowPlayingWrap,
  PlayListBox,
  PlayListCover,
  PlayListImg,
} from '../../styles/player/nowplaying';

function NowPlaying() {
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(1);
  //볼륨 컴포넌트에 전달
  const handleVolumeChange = (VolumeValue) => {
    setVolume(VolumeValue);
  };

  const handlePlayList = () => {
    setIsOpen((pre) => !pre);
  };
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    const videoId = 'UC3IZKseVpdzPSBaWxBxundA';
    const API_KEY = 'AIzaSyCApUdc9PuxJJYqjgNNNL2I2fkLuFIBasA';
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
      )
      .then((res) => {
        setPlaylist(res?.data?.items);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <PlayWarp>
      {/* NowPlaying */}
      <NowPlayingWrap onClick={handlePlayList}>
        <PlayBox />
        <Player volume={volume} />
        <Volume volume={volume} onVolumeChange={handleVolumeChange} />
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
