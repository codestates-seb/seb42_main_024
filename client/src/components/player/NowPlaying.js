import { useState } from 'react';
import { useSelector } from 'react-redux';

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
  const playIdx = useSelector((state) => state?.currentSongIdx);
  const dataUrl = useSelector((state) => state?.songList?.[playIdx]?.thumbnail);
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(1);
  //볼륨 컴포넌트에 전달
  const handleVolumeChange = (VolumeValue) => {
    setVolume(VolumeValue);
  };
  const handlePlayList = () => {
    setIsOpen((pre) => !pre);
  };
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
          <PlayListImg src={dataUrl} />
        </PlayListCover>
        <PlayList />
      </PlayListBox>
    </PlayWarp>
  );
}

export default NowPlaying;
